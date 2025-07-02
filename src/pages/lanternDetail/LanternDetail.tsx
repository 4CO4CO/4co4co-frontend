import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton } from './components/CloseButton/CloseButton';
import { createMockData } from './constants/mockData';
import * as styles from './LanternDetail.css';
import { LanternData } from '@/components/lantern/constants';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { isFist } from '@/components/lantern/utils';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lanternData, setLanternData] = useState<LanternData>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasNavigatedRef = useRef(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(1);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [showInteractionMessage, setShowInteractionMessage] = useState(false);

  const { handCenter, marks, handedness } = useHandMark();

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

    const playMusic = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = '';
          audioRef.current = null;
        }

        const audio = new Audio(lanternData.background_sounds[currentMusicIndex]);
        audioRef.current = audio;

        audio.addEventListener('ended', () => {
          const nextIndex = (currentMusicIndex + 1) % 3;
          setCurrentMusicIndex(nextIndex);
        });
        console.log('음악 재생:', currentMusicIndex);
        await audio.play();
      } catch (error) {
        console.error('오디오 재생 실패:', error);
        if (!isUserInteracted) {
          setShowInteractionMessage(true);
          setTimeout(() => {
            if (isUserInteracted) {
              playMusic();
            }
          }, 3000);
        }
      }
    };

    if (isUserInteracted || currentMusicIndex === 1) {
      playMusic();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentMusicIndex, lanternData?.background_sounds, isUserInteracted]);

  // 풍등 닫기 버튼 주먹 제스처 인식
  useEffect(() => {
    if (!marks || !handedness || !closeButtonRef.current) return;

    const rect = closeButtonRef.current.getBoundingClientRect();
    const indexTip = marks.find((k) => k.name === 'index_finger_tip');
    if (!indexTip) return;

    const isInCloseArea =
      indexTip.x >= rect.left &&
      indexTip.x <= rect.right &&
      indexTip.y >= rect.top &&
      indexTip.y <= rect.bottom;

    const fist = isFist(marks, handedness);

    if (fist && isInCloseArea && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate('/lanterns');
    }
  }, [marks, handedness, navigate]);

  const handleCloseClick = () => {
    navigate('/lanterns');
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
    </div>
  );
};

export default LanternDetail;
