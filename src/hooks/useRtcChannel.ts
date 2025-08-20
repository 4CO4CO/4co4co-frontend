import { doc, setDoc, getDoc, onSnapshot, updateDoc, collection, addDoc, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';

type Role = 'sender' | 'receiver';

export const useRtcChannel = (role: 'sender' | 'receiver', roomId?: string | null) => {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed'>('new');
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const onMessageRef = useRef<((d: unknown) => void) | null>(null);

  const send = useCallback((data: unknown) => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify(data));
    }
  }, []);

  const setOnMessage = useCallback((cb: (d: unknown) => void) => {
    onMessageRef.current = cb;
  }, []);

  useEffect(() => {
    if (!roomId) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcRef.current = pc;

    pc.onconnectionstatechange = () => setState(pc.connectionState);

    const writeLocalIce = async (candidate: RTCIceCandidate, who: Role) => {
      const candCol = collection(db, 'rooms', roomId, 'candidates');
      await addDoc(candCol, { who, candidate: candidate.toJSON(), ts: Date.now() });
    };
    pc.onicecandidate = (e) => {
      if (e.candidate) writeLocalIce(e.candidate, role).catch(console.error);
    };

    if (role === 'sender') {
      // DataChannel 생성
      const dc = pc.createDataChannel('vibration', {
        // 지연없도록
        ordered: false, // 순서 보장하지 않음
        maxRetransmits: 0, // 재전송 없음
      });
      dc.onopen = () => setReady(true);
      dc.onclose = () => setReady(false);

      (async () => {
        // Offer 생성 + rooms/{roomId} 문서 생성
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const roomDoc = doc(db, 'rooms', roomId);
        await setDoc(roomDoc, {
          // 규칙 통과용 만료시간
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          offer: offer,
          createdAt: Date.now(),
          status: 'waiting',
        });

        // 상대 Answer 구독
        const unsubRoom = onSnapshot(roomDoc, async (snap) => {
          const data = snap.data();
          if (!data) return;
          if (data.answer && !pc.currentRemoteDescription) {
            await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          }
          if (data.status === 'connected') {
            // 연결 후 정리
          }
        });

        // 상대 ICE(candidate) 구독
        const candCol = collection(db, 'rooms', roomId, 'candidates');
        const unsubCand = onSnapshot(query(candCol, where('who', '==', 'receiver')), async (qs) => {
          for (const d of qs.docChanges()) {
            const c = d.doc.data();
            if (c?.candidate) {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(c.candidate));
              } catch (e) {
                // remoteDescription 세팅 전 들어오면 잠깐 대기 후 재시도해도 됨
                console.warn('remoteDescription 세팅 전입니다.', e);
              }
            }
          }
        });

        // 클린업
        return () => {
          unsubRoom();
          unsubCand();
        };
      })().catch(console.error);
    } else {
      // receiver
      pc.ondatachannel = (e) => {
        const dc = e.channel;
        dcRef.current = dc;
        dc.onopen = () => setReady(true);
        dc.onclose = () => setReady(false);
        dc.onmessage = (ev) => {
          try {
            const data = JSON.parse(ev.data);
            onMessageRef.current?.(data);
          } catch (e) {
            console.error('parse fail', e);
          }
        };
      };

      (async () => {
        const roomDoc = doc(db, 'rooms', roomId);
        // Offer 가져오기
        const snap = await getDoc(roomDoc);
        const data = snap.data();
        if (!data?.offer) {
          // 워치가 먼저 열렸다면 onSnapshot으로 offer 등장까지 대기
          const unsub = onSnapshot(roomDoc, async (s) => {
            const d = s.data();
            if (d?.offer) {
              unsub();
              await pc.setRemoteDescription(new RTCSessionDescription(d.offer));
              const answer = await pc.createAnswer();
              await pc.setLocalDescription(answer);
              await updateDoc(roomDoc, { answer: answer, status: 'answered' });
            }
          });
        } else {
          // offer 바로 처리
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await updateDoc(roomDoc, { answer: answer, status: 'answered' });
        }

        // 내 ICE 기록
        const candCol = collection(db, 'rooms', roomId, 'candidates');
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            addDoc(candCol, { who: 'receiver', candidate: e.candidate.toJSON(), ts: Date.now() }).catch(console.error);
          }
        };

        // 발신자 ICE 구독
        const unsubCand = onSnapshot(query(candCol, where('who', '==', 'sender')), async (qs) => {
          for (const d of qs.docChanges()) {
            const c = d.doc.data();
            if (c?.candidate) {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(c.candidate));
              } catch (e) {
                console.warn('addIceCandidate fail', e);
              }
            }
          }
        });

        // 연결 완료되면 상태 업데이트
        pc.onconnectionstatechange = () => {
          setState(pc.connectionState);
          if (pc.connectionState === 'connected') {
            updateDoc(roomDoc, { status: 'connected' }).catch(() => {});
          }
        };

        return () => {
          unsubCand();
        };
      })().catch(console.error);
    }

    return () => {
      dcRef.current?.close();
      pcRef.current?.close();
    };
  }, [roomId, role]);

  return { ready, state, send, setOnMessage };
};
