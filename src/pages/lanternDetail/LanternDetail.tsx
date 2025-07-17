import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton } from './components/CloseButton/CloseButton';
import { useCloseGesture } from './hooks/useCloseGesture';
import { useLanternDetail } from './hooks/useLanternDetail';
import * as styles from './LanternDetail.css';
import { Toast } from '@/components/common/Toast';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { data: lanternData, isLoading, error } = useLanternDetail(lanternId);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(1);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const { handCenter } = useHandMark();
  useCloseGesture(closeButtonRef);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
      // setTimeout(() => navigate(-1), 2000);
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!lanternId) {
      navigate('/');
    }
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
        const handleAudioError = (e: Event) => {
          console.error('오디오 로드/재생 에러:', e);
          setToast({ message: '음악 파일을 불러올 수 없습니다.', type: 'error' });
        };

        // 기존 오디오 정리
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('ended', handleAudioEnded);
          audioRef.current.removeEventListener('error', handleAudioError);
          audioRef.current.removeEventListener('loadstart', () => {});
          audioRef.current.removeEventListener('canplay', () => {});
          audioRef.current.src = '';
          audioRef.current = null;
        }

        const audioUrl = lanternData.background_sounds[currentMusicIndex];

        const audio = new Audio();

        audio.addEventListener('loadstart', () => {});
        audio.addEventListener('canplay', () => {});
        audio.addEventListener('error', handleAudioError);
        audio.addEventListener('ended', handleAudioEnded);

        audioRef.current = audio;

        audio.src = audioUrl;
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
    } else {
      console.warn('사용자 상호작용이 필요합니다. 화면을 클릭해주세요.');
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnded);
        audioRef.current.removeEventListener('error', () => { });
        audioRef.current.removeEventListener('loadstart', () => { });
        audioRef.current.removeEventListener('canplay', () => { });
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


  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />

      {!isLoading && lanternData && (
        <>
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
        </>
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
