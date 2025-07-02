import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseButton } from './components/CloseButton/CloseButton';
import { createMockData } from './constants/mockData';
import * as styles from './LanternDetail.css';
// import { get } from '@/apis';
import { LanternData } from '@/components/lantern/constants';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { isFist } from '@/components/lantern/utils';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lanternData, setLanternData] = useState<LanternData>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasNavigatedRef = useRef(false);

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

  // 배경음 재생 (첫 번째 음성 재생)
  useEffect(() => {
    if (lanternData?.background_sounds && lanternData.background_sounds.length > 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(lanternData.background_sounds[0]);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.error('오디오 재생 실패:', err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [lanternData?.background_sounds]);

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

      <CloseButton
        ref={closeButtonRef}
        onClick={handleCloseClick}
      />

      {/* 첫 번째 이미지 표시 */}
      {lanternData.images && lanternData.images.length > 0 && (
        <img
          src={lanternData.images[0]}
          className={styles.fullImage}
          alt="랜턴 이미지"
        />
      )}

      {handCenter && (
        <div
          className={styles.handPointer}
          style={{ top: handCenter.y, left: handCenter.x }}
        />
      )}
    </div>
  );
};

export default LanternDetail;
