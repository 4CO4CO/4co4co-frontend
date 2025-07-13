import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton } from './components/CloseButton/CloseButton';
import { createMockData } from './constants/mockData';
import { useCloseGesture } from './hooks/useCloseGesture';
import * as styles from './LanternDetail.css';
import { Toast } from '@/components/common/Toast';
import { LanternData } from '@/components/lantern/constants';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const [lanternData, setLanternData] = useState<LanternData>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(1);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const { handCenter } = useHandMark();
  useCloseGesture(closeButtonRef);

  useEffect(() => {
    if (!lanternId) {
      navigate('/');
      return;
    }

    // 임시용 목 데이터 사용
    const fetchDetail = async () => {
      try {
        const mockData = createMockData(lanternId);
        setLanternData(mockData);
      } catch (error) {
        console.error(error);
        setToast({ message: '풍등 데이터를 불러오는데 실패했습니다.', type: 'error' });
        navigate(-1);
      }
    };

    fetchDetail();
  }, [lanternId, navigate]);

  // 가운데 이미지로 스크롤 위치 고정
  useEffect(() => {
    if (lanternData && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = window.innerWidth;
    }
  }, [lanternData]);

  // 음악 재생을 위한 사용자 상호작용 감지
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

  // 음악 재생
  useEffect(() => {
    if (!lanternData?.background_sounds) return;

    const handleAudioEnded = () => {
      const nextIndex = (currentMusicIndex + 1) % lanternData.background_sounds.length;
      setCurrentMusicIndex(nextIndex);
    };

    const playMusic = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleAudioEnded);
          audioRef.current.src = '';
          audioRef.current = null;
        }

        const audio = new Audio(lanternData.background_sounds[currentMusicIndex]);
        audioRef.current = audio;

        audio.addEventListener('ended', handleAudioEnded);
        console.log('음악 재생:', currentMusicIndex);
        await audio.play();
      } catch (error) {
        console.error('오디오 재생 실패:', error);
        setToast({ message: '음악 재생에 실패했습니다.', type: 'error' });
        if (!isUserInteracted) {
          setShowInteractionMessage(true);

          timeoutRef.current = setTimeout(() => {
            if (isUserInteracted) {
              playMusic();
            }
          }, 3000);
        }
      }
    };

    if (isUserInteracted) {
      playMusic();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.src = '';
        audioRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [currentMusicIndex, lanternData?.background_sounds, isUserInteracted]);

  const handleCloseClick = () => {
    navigate(-1);
  };

  if (!lanternData) return null;

  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />

      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        <div className={styles.panoramaWrapper}>
          {lanternData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={styles.panoramaImage}
              alt={`풍등 이미지 ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {handCenter && (
        <div
          className={styles.handPointer}
          style={{ top: handCenter.y, left: handCenter.x }}
        />
      )}

      {showInteractionMessage && (
        <div className={styles.interactionMessage}>
          화면을 클릭하면 음악이 재생됩니다
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default LanternDetail;
