import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AudioVisualizer } from './components/AudioVisualizer/AudioVisualizer';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useCloseGesture } from './hooks/useCloseGesture';
// import { useLanternDetail } from './hooks/useLanternDetail';
import * as styles from './LanternDetail.css';
import { useHandMark } from '@/components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '@/components/common/lantern/VideoFeed';
import { Toast } from '@/components/common/toast';
import { lanternType } from '@/mocks';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isJumpingRef = useRef(false);
  const visualIndexRef = useRef<number | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // API 데이터 가져오기
  // const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);
  const lanternData: lanternType | undefined = queryClient.getQueryData(lanternKeys.detail(lanternId ?? ''));
  // 상태 관리
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 오디오 플레이어 (analyser 추가된 버전)
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
      document.removeEventListener('scroll', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
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

  const carouselImages = useMemo(() => {
    if (!lanternData?.images) return [];
    return [...lanternData.images, ...lanternData.images];
  }, [lanternData]);

  useEffect(() => {
    if (!scrollContainerRef.current || carouselImages.length === 0) return;

    const container = scrollContainerRef.current;
    const realCount = lanternData?.images?.length ?? 0;
    if (realCount === 0) return;

    const imageWidth = container.clientWidth / 3;
    const centerToLeft = (k: number) => (k - 1) * imageWidth - (container.clientWidth - imageWidth) / 2; // 음악 순서에 맞는 위치에 두고 가운데 정렬

    if (isFirstRender) {
      const initialScrollLeft = centerToLeft(audioPlayer.currentIndex + 1);
      container.scrollTo({ left: initialScrollLeft, behavior: 'auto' });
      visualIndexRef.current = audioPlayer.currentIndex;
      setIsFirstRender(false);
      return;
    }

    const nextVisualIndex = (visualIndexRef.current ?? 0) + 1;
    const targetScrollLeft = centerToLeft(nextVisualIndex);

    container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
    visualIndexRef.current = nextVisualIndex;

    const reachedBoundary = (visualIndexRef.current ?? 0) >= realCount * 2 - 1;
    if (reachedBoundary && !isJumpingRef.current) {
      isJumpingRef.current = true;

      let rafId: number;
      const waitUntilArrived = () => {
        if (Math.abs(container.scrollLeft - targetScrollLeft) < 1) {
          const curr = visualIndexRef.current;
          if (curr == null) {
            isJumpingRef.current = false;
            return;
          }
          const jumpedIndex = curr - realCount;

          requestAnimationFrame(() => {
            container.scrollTo({ left: centerToLeft(jumpedIndex), behavior: 'auto' });
            visualIndexRef.current = jumpedIndex;
            isJumpingRef.current = false;
          });
          return;
        }
        rafId = requestAnimationFrame(waitUntilArrived);
      };
      rafId = requestAnimationFrame(waitUntilArrived);

      return () => cancelAnimationFrame(rafId);
    }
  }, [audioPlayer.currentIndex, carouselImages, lanternData?.images?.length, isFirstRender]);

  const bgImg = sessionStorage.getItem('lanternListBg');

  return (
    <div
      style={
        bgImg
          ? {
              backgroundImage: `url(${bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
            }
          : {}
      }
    >
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

            {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}

            {showInteractionMessage && (
              <div className={styles.interactionMessage}>화면을 클릭하면 음악이 재생됩니다</div>
            )}

            {/* 간단한 오디오 시각화 추가 */}
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
    </div>
  );
};

export default LanternDetail;
