import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AudioVisualizer from './components/AudioVisualizer/AudioVisualizer';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useCarousel } from './hooks/useCarousel';
import * as styles from './LanternDetail.css';
import { useCloseGesture } from '../../hooks/useCloseGesture';
// import { useLanternDetail } from './hooks/useLanternDetail';
import hand from '@/assets/hand.png';
import { VideoFeed } from '@/components/common/lantern/VideoFeed';
import { Toast } from '@/components/common/toast';
import { useHandMark } from '@/hooks/useHandMark';
import { useHandGestureScroll } from '@/hooks/useScrollGesture';
import { lanternType } from '@/mocks';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // API 데이터 가져오기
  // const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);
  const lanternData: lanternType | undefined = queryClient.getQueryData(lanternKeys.detail(lanternId ?? ''));
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 오디오
  const audioPlayer = useAudioPlayer({
    audioUrls: lanternData?.background_sounds || [],
    isUserInteracted,
    startIndex: 1,
  });

  // 캐러셀
  const { scrollContainerRef, carouselImages, moveCarousel, activeImageIndex } = useCarousel({
    audioPlayer,
    images: lanternData?.images ?? [],
  });

  // 손동작 인식
  useHandGestureScroll({ moveCarousel });
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

  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />

      {lanternData && (
        <>
          <div ref={scrollContainerRef} className={styles.scrollContainer}>
            <div className={styles.panoramaWrapper}>
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`${styles.panoramaImage} ${
                    audioPlayer.isPlaying && index === activeImageIndex ? styles.isActive : ''
                  }`}
                  alt={`풍등 이미지 ${index + 1}`}
                />
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
