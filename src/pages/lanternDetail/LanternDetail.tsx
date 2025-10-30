import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AudioVisualizer from './components/AudioVisualizer/AudioVisualizer';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useAudioFeatures } from './hooks/useAudioFeature';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useCarousel } from './hooks/useCarousel';
import * as styles from './LanternDetail.css';
import { packetFrom } from './utils';
import { useCloseGesture } from '../../hooks/useCloseGesture';
// import { useLanternDetail } from './hooks/useLanternDetail';
import hand from '@/assets/hand.png';
import { VideoFeed } from '@/components/common/lantern/VideoFeed';
import { Toast } from '@/components/common/toast';
import { HandMarkProvider, useHandMarkContext } from '@/context/HandMarkContext';
import { useRtcChannel } from '@/hooks/useRtcChannel';
import { useHandGestureScroll } from '@/hooks/useScrollGesture';
import { useZoomGesture } from '@/hooks/useZoomGesture';
import { lanternType } from '@/mocks';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';

const LanternDetailContent = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // API 데이터 가져오기
  // const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);
  const { handCenter } = useHandMarkContext();

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

  // 분석용 Analyser로 특징 추출 (30Hz)
  const { ready: rtcReady, send: rtcSend } = useRtcChannel({ role: 'sender', roomId: lanternId ?? '' });
  const feat = useAudioFeatures(audioPlayer.analyserFeatures, 30);

  useEffect(() => {
    if (!feat || !rtcReady) {
      return;
    }
    const hapticPacket = packetFrom(feat.ts, feat.rms, feat.bass, feat.onset);
    rtcSend(hapticPacket);
  }, [feat, rtcReady, rtcSend]);

  // 캐러셀
  const { scrollContainerRef, carouselImages, moveCarousel, activeImageIndex } = useCarousel({
    audioPlayer,
    images: lanternData?.images ?? [],
  });

  // 손동작 인식
  useZoomGesture(
    async () => {
      setIsUserInteracted(true);
      setShowInteractionMessage(false);
    },
    {
      enabled: !isUserInteracted,
      maxMovePx: 100,
      minHoldMs: 0,
      maxHoldMs: 1500,
      cooldownMs: 800,
    },
  );

  useHandGestureScroll({ moveCarousel });
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
  const activeImageUrl = carouselImages[activeImageIndex];
  return (
    <>
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
                    className={`${styles.panoramaImage} ${audioPlayer.isPlaying && styles.isNotActive}`}
                    alt={`풍등 이미지 ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {handCenter && (
              <img
                className={styles.handPointer}
                style={{ top: handCenter.y, left: handCenter.x }}
                src={hand}
                alt="손 포인터"
              />
            )}

            {showInteractionMessage && (
              <div className={styles.interactionMessage}>화면을 클릭하면 음악이 재생됩니다</div>
            )}

            <AudioVisualizer
              currentIndex={audioPlayer.currentIndex}
              totalTracks={audioPlayer.totalTracks}
              isPlaying={audioPlayer.isPlaying}
              analyser={audioPlayer.analyserViz}
            />
          </>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>

      {audioPlayer.isPlaying && (
        <img src={activeImageUrl} className={styles.isActive} alt={`풍등 이미지 ${activeImageIndex + 1}`} />
      )}
    </>
  );
};

const LanternDetail = () => {
  const { lanternId } = useParams();
  const lanternData: lanternType | undefined = queryClient.getQueryData(lanternKeys.detail(lanternId ?? ''));

  return (
    <HandMarkProvider enabled={!!lanternData}>
      <LanternDetailContent />
    </HandMarkProvider>
  );
};

export default LanternDetail;
