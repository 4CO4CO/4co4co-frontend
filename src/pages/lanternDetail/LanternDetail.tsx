import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AudioVisualizer from './components/AudioVisualizer/AudioVisualizer';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useCloseGesture } from './hooks/useCloseGesture';
// import { useLanternDetail } from './hooks/useLanternDetail';
import * as styles from './LanternDetail.css';
import hand from '@/assets/hand.png';
import { useHandMark } from '@/components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '@/components/common/lantern/VideoFeed';
import { Toast } from '@/components/common/toast';
import { lanternType } from '@/mocks';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';

const COPIES = 3;
const MIDDLE_BLOCK = Math.floor(COPIES / 2);
const COOLDOWN_MS = 650;
const DELTA_TRIGGER = 40;

const clampMod = (i: number, L: number) => {
  return ((i % L) + L) % L;
};

export const waitUntilSettled = (getter: () => number, target: number, eps = 1, stableFrames = 3) => {
  return new Promise<void>((resolve) => {
    let ok = 0;
    const loop = () => {
      const d = Math.abs(getter() - target);
      ok = d < eps ? ok + 1 : 0;
      if (ok >= stableFrames) return resolve();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });
};

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isProgrammaticRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const skipCooldownRef = useRef(false);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lastDirectionRef] = useState<{ dir: 1 | -1 | 0 }>({ dir: 0 }); // 최근 사용자 방향(보이는 이동에 사용)

  // API 데이터 가져오기
  // const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);
  const lanternData: lanternType | undefined = queryClient.getQueryData(lanternKeys.detail(lanternId ?? ''));

  // 상태
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 오디오
  const audioPlayer = useAudioPlayer({
    audioUrls: lanternData?.background_sounds || [],
    isUserInteracted,
    startIndex: 1,
  });

  // 손동작 인식
  const { handCenter } = useHandMark();
  useCloseGesture(closeButtonRef);

  // 에러 처리 및 유효성 검사
  // useEffect(() => {
  //   if (!lanternId) {
  //     navigate('/');
  //     return;
  //   }

  //   if (error) {
  //     setToast({ message: error, type: 'error' });
  //   }
  // }, [error, lanternId, navigate]);

  // 사용자 상호작용 감지
  useEffect(() => {
    const handleUserInteraction = () => {
      setIsUserInteracted(true);
      setShowInteractionMessage(false);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => document.removeEventListener('click', handleUserInteraction);
  }, []);

  // 로딩 상태 Toast로 표시
  // useEffect(() => {
  //   if (isLoading) {
  //     setToast({ message: '풍등을 불러오는 중입니다.', type: 'info' });
  //   } else {
  //     if (!error) {
  //       setToast(null);
  //       if (lanternData && !isUserInteracted) {
  //         setShowInteractionMessage(true);
  //       }
  //     }
  //   }
  // }, [isLoading, error, lanternData, isUserInteracted]);

  const handleCloseClick = () => {
    navigate(-1);
  };

  const realImages = lanternData?.images ?? [];
  const L = realImages.length;

  const carouselImages = useMemo(() => {
    if (!L) return [];
    return Array.from({ length: COPIES }).flatMap(() => realImages);
  }, [realImages, L]);

  const centerToLeft = (container: HTMLDivElement, k: number) => {
    const imageWidth = container.clientWidth / 3;
    return (k - 1) * imageWidth - (container.clientWidth - imageWidth) / 2;
  };

  const kMiddle = (idx: number) => idx + 1 + L * MIDDLE_BLOCK;

  // 현재 스크롤 위치 기준, 같은 idx에 대한 가장 가까운 슬롯
  const nearestDirectionalSlot = (container: HTMLDivElement, idx: number, dir: 1 | -1) => {
    const k1 = idx + 1; // 블록 0
    const k2 = idx + 1 + L; // 블록 1
    const k3 = idx + 1 + 2 * L; // 블록 2
    const kArr = [k1, k2, k3];
    const x = container.scrollLeft;
    const candidates = kArr
      .map((k) => ({ k, left: centerToLeft(container, k) }))
      .filter(({ left }) => (dir === 1 ? left > x + 1 : left < x - 1))
      .sort((a, b) => (dir === 1 ? a.left - b.left : b.left - a.left));
    if (!candidates.length) {
      return kArr
        .map((k) => ({ k, left: centerToLeft(container, k), d: Math.abs(centerToLeft(container, k) - x) }))
        .sort((a, b) => a.d - b.d)[0].k;
    }
    return candidates[0].k;
  };

  // 사용자 스크롤
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !L) return;

    const onScroll = () => {
      if (isProgrammaticRef.current) return;
      const prev = lastScrollLeftRef.current;
      const curr = container.scrollLeft;
      const delta = curr - prev;
      lastScrollLeftRef.current = curr;

      if (skipCooldownRef.current) return;
      if (Math.abs(delta) < DELTA_TRIGGER) return;

      // 방향 결정
      const dir: 1 | -1 = delta > 0 ? 1 : -1;
      lastDirectionRef.dir = dir;

      // 사용자 스크롤 시 오디오 즉시 전환
      if (dir === 1) {
        audioPlayer.nextNow();
      } else {
        audioPlayer.prevNow();
      }

      skipCooldownRef.current = true;
      window.setTimeout(() => (skipCooldownRef.current = false), COOLDOWN_MS);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [L, audioPlayer, COOLDOWN_MS, DELTA_TRIGGER, lastDirectionRef]);

  // currentIndex 변경
  // 이동(smooth) → 정착 → 가운데 블록으로 이동(auto)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !L) return;

    const idx = clampMod(audioPlayer.currentIndex, L);

    // 최초 진입
    if (isFirstRender) {
      const left = centerToLeft(container, kMiddle(idx));
      isProgrammaticRef.current = true;
      container.scrollTo({ left, behavior: 'auto' });
      setTimeout(() => {
        isProgrammaticRef.current = false;
        lastScrollLeftRef.current = container.scrollLeft;
      }, 0);
      setIsFirstRender(false);
      return;
    }

    // 사용자 방향이 있으면 그 방향의 가장 가까운 슬롯으로 이동
    const dir = lastDirectionRef.dir;
    let visibleK: number;
    if (dir === 1 || dir === -1) {
      visibleK = nearestDirectionalSlot(container, idx, dir);
    } else {
      visibleK = kMiddle(idx);
    }
    const visibleLeft = centerToLeft(container, visibleK);

    isProgrammaticRef.current = true;
    container.scrollTo({ left: visibleLeft, behavior: 'smooth' });

    // 정착 감지 후 가운데 블록으로 이동
    (async () => {
      await waitUntilSettled(() => container.scrollLeft, visibleLeft, 1, 3);
      const middleLeft = centerToLeft(container, kMiddle(idx));
      container.scrollTo({ left: middleLeft, behavior: 'auto' });
      const finalize = () => {
        isProgrammaticRef.current = false;
        lastScrollLeftRef.current = container.scrollLeft;
        lastDirectionRef.dir = 0;
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(finalize);
      });
    })();
  }, [audioPlayer.currentIndex, L, isFirstRender, lastDirectionRef]);

  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />

      {lanternData && (
        <>
          <div ref={scrollContainerRef} className={styles.scrollContainer}>
            <div className={styles.panoramaWrapper}>
              {carouselImages.map((image, index) => (
                <img key={index} src={image} className={styles.panoramaImage} alt={`풍등 이미지 ${index + 1}`} />
              ))}
            </div>
          </div>

          {handCenter && (
            <img className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} src={hand} />
          )}

          {showInteractionMessage && <div className={styles.interactionMessage}>화면을 클릭하면 음악이 재생됩니다</div>}

          <AudioVisualizer
            currentIndex={audioPlayer.currentIndex}
            totalTracks={audioPlayer.totalTracks}
            isPlaying={audioPlayer.isPlaying}
            analyser={audioPlayer.analyser}
          />
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default LanternDetail;
