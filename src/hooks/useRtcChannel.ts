/* eslint-disable no-undef */
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  Unsubscribe,
  serverTimestamp,
} from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import { makeUUID } from '@/utils';

export type Role = 'sender' | 'receiver';

type SenderOptions = { role: 'sender'; roomId: string; sessionId?: string; ttlMs?: number };
type ReceiverOptions = { role: 'receiver'; roomId: string; sessionId: string };
type Options = SenderOptions | ReceiverOptions;

export function useRtcChannel(opts: Options) {
  const { role } = opts;
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<RTCPeerConnectionState>('new');
  const [sessionId, setSessionId] = useState(role === 'sender' ? opts.sessionId ?? makeUUID() : opts.sessionId);
  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const onMessageRef = useRef<((d: unknown) => void) | null>(null);
  const unsubsRef = useRef<Unsubscribe[]>([]);

  const send = useCallback((data: unknown) => {
    if (dcRef.current?.readyState === 'open') {
      dcRef.current.send(JSON.stringify(data));
    }
  }, []);

  const setOnMessage = useCallback((cb: (d: unknown) => void) => {
    onMessageRef.current = cb;
  }, []);

  // 클린업 함수
  const teardown = useCallback(() => {
    unsubsRef.current.forEach((u) => u());
    unsubsRef.current = [];
    dcRef.current?.close();
    pcRef.current?.close();
    dcRef.current = null;
    pcRef.current = null;
    setReady(false);
  }, []);

  // 재연결 함수
  // sender의 경우 세션을 새로 생성하고, receiver의 경우 기존 세션을 재사용
  const reconnect = useCallback(() => {
    if (role !== 'sender') return;
    teardown();
    setSessionId(makeUUID());
  }, [role, teardown]);

  // 초기화
  useEffect(() => {
    if ((role === 'sender' && !opts.roomId) || (role === 'receiver' && (!opts.roomId || !sessionId))) return;

    // 이미 연결된 경우 클린업
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }],
    });
    pcRef.current = pc;
    pc.onconnectionstatechange = () => setState(pc.connectionState);

    const roomId = opts.roomId;
    const ttlMs = role === 'sender' ? opts.ttlMs ?? 5 * 60 * 1000 : undefined; // 기본 TTL 5분
    const sessionRef = doc(db, 'rooms', roomId, 'sessions', sessionId); // 세션 문서 참조

    if (role === 'sender') {
      const dc = pc.createDataChannel('vibration', {
        ordered: false, // 순서 보장 안함
        maxRetransmits: 0, // 재전송 안함
      });
      dcRef.current = dc;
      dc.onopen = () => setReady(true);
      dc.onclose = () => setReady(false);

      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        // ICE 후보를 Firestore에 저장
        const col = collection(db, 'rooms', roomId, 'sessions', sessionId, 'callerCandidates');
        addDoc(col, { candidate: e.candidate.toJSON(), ts: Date.now() }).catch(console.error);
      };

      // 세션 문서 생성
      (async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        await setDoc(sessionRef, {
          createdAt: serverTimestamp(),
          expiresAt: new Date(Date.now() + ttlMs!),
          status: 'waiting',
          offer,
        });

        const url = `${import.meta.env.VITE_CLIENT_BASE_URL}/watch?roomId=${encodeURIComponent(
          roomId,
        )}&sessionId=${encodeURIComponent(sessionId)}`;
        setQrUrl(url);

        unsubsRef.current.push(
          // 세션 문서의 상태 변경을 감지
          onSnapshot(sessionRef, async (snap) => {
            const data = snap.data();
            if (data?.answer && !pc.currentRemoteDescription) {
              await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
            }
          }),
        );

        // 후보 감지
        const calleeCol = collection(db, 'rooms', roomId, 'sessions', sessionId, 'calleeCandidates');
        unsubsRef.current.push(
          onSnapshot(calleeCol, (qs) => {
            qs.docChanges().forEach(async (ch) => {
              const c = ch.doc.data() as { candidate: RTCIceCandidateInit; ts: number };
              if (c?.candidate) {
                try {
                  await pc.addIceCandidate(new RTCIceCandidate(c.candidate));
                } catch (e) {
                  console.warn('addIceCandidate fail (sender):', e);
                }
              }
            });
          }),
        );
      })().catch(console.error);
    } else {
      // receiver
      // 세션 문서에서 offer 가져와서 연결
      pc.ondatachannel = (e) => {
        const dc = e.channel;
        dcRef.current = dc;
        dc.onopen = () => setReady(true);
        dc.onclose = () => setReady(false);
        dc.onmessage = (ev) => {
          try {
            onMessageRef.current?.(JSON.parse(ev.data));
          } catch (e) {
            console.error('parse fail', e);
          }
        };
      };

      // ICE 후보 Firestore에 저장
      pc.onicecandidate = (e) => {
        if (!e.candidate) return;
        const col = collection(db, 'rooms', roomId, 'sessions', sessionId, 'calleeCandidates');
        addDoc(col, { candidate: e.candidate.toJSON(), ts: Date.now() }).catch(console.error);
      };

      // 세션 문서에서 offer 가져와서 연결
      (async () => {
        const snap = await getDoc(sessionRef);
        const answerFlow = async (offer: RTCSessionDescriptionInit) => {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          await updateDoc(sessionRef, { answer, status: 'answered' });
        };

        if (snap.exists() && snap.data()?.offer) {
          await answerFlow(snap.data().offer);
        } else {
          unsubsRef.current.push(
            onSnapshot(sessionRef, async (s) => {
              const d = s.data();
              if (d?.offer && !pc.currentRemoteDescription) {
                await answerFlow(d.offer);
              }
            }),
          );
        }

        // ICE 후보 감지
        const callerCol = collection(db, 'rooms', roomId, 'sessions', sessionId, 'callerCandidates');
        unsubsRef.current.push(
          onSnapshot(callerCol, (qs) => {
            qs.docChanges().forEach(async (ch) => {
              const c = ch.doc.data();
              if (c?.candidate) {
                try {
                  await pc.addIceCandidate(new RTCIceCandidate(c.candidate));
                } catch (e) {
                  console.warn('addIceCandidate fail (receiver):', e);
                }
              }
            });
          }),
        );

        // 세션 상태 변경 감지
        pc.onconnectionstatechange = () => {
          setState(pc.connectionState);
          if (pc.connectionState === 'connected') {
            updateDoc(sessionRef, { status: 'connected' }).catch(() => {});
          }
        };
      })().catch(console.error);
    }

    return () => {
      teardown(); // 컴포넌트 언마운트 시 클린업
    };
  }, [role, opts.roomId, sessionId]);

  return { ready, state, send, setOnMessage, qrUrl, sessionId, reconnect };
}
