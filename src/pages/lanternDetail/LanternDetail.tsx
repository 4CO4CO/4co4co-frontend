import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AudioVisualizer } from './components/AudioVisualizer/AudioVisualizer';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useCloseGesture } from './hooks/useCloseGesture';
import { useLanternDetail } from './hooks/useLanternDetail';
import * as styles from './LanternDetail.css';
import { Toast } from '@/components/common/Toast/Toast';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // API 데이터 가져오기
  const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);

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
  useEffect(() => {
    if (!lanternId) {
      navigate('/');
      return;
    }

    if (error) {
      setToast({ message: error, type: 'error' });
    }
  }, [error, lanternId, navigate]);

  // 가운데 이미지로 스크롤 위치 고정
  useEffect(() => {
    if (lanternData && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = window.innerWidth;
    }
  }, [lanternData]);

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
  useEffect(() => {
    if (isLoading) {
      setToast({ message: '풍등을 불러오는 중입니다.', type: 'info' });
    } else {
      if (!error) {
        setToast(null);
        if (lanternData && !isUserInteracted) {
          setShowInteractionMessage(true);
        }
      }
    }
  }, [isLoading, error, lanternData, isUserInteracted]);

  const handleCloseClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />

      {!isLoading && lanternData && (
        <>
          <div ref={scrollContainerRef} className={styles.scrollContainer}>
            <div className={styles.panoramaWrapper}>
              {lanternData.images.map((image, index) => (
                <img key={index} src={image} className={styles.panoramaImage} alt={`풍등 이미지 ${index + 1}`} />
              ))}
            </div>
          </div>

          {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}

          {showInteractionMessage && <div className={styles.interactionMessage}>화면을 클릭하면 음악이 재생됩니다</div>}

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
  );
};

export default LanternDetail;
