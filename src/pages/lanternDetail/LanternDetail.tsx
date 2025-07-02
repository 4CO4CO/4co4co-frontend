import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as styles from './LanternDetail.css';
import { get } from '@/apis';
import { LanternData } from '@/components/lantern/constants';
import { useHandMark } from '@/components/lantern/hooks/useHandMark';
import { isFist } from '@/components/lantern/utils';
import { VideoFeed } from '@/components/lantern/VideoFeed';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lanternData, setLanternData] = useState<LanternData>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hasNavigatedRef = useRef(false);

  const { handCenter, marks, handedness } = useHandMark();

  useEffect(() => {
    if (!lanternId || !currentLanternId) {
      navigate('/');
      return;
    }

    const fetchDetail = async () => {
      try {
        const response = await get<{ status: string; message: string; data: LanternData }>(
          `/lanterns/${lanternId}?current_lantern_id=${currentLanternId}`
        );
        setLanternData(response.data);
      } catch (error) {
        console.error(error);
        navigate(-1);
      }
    };

    fetchDetail();
  }, [lanternId, currentLanternId]);

  useEffect(() => {
    if (lanternData?.background_sound) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(lanternData.background_sound);
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
  }, [lanternData?.background_sound]);

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
      navigate(`/lanterns?currentLanternId=${currentLanternId}`);
    }
  }, [marks, handedness]);

  if (!lanternData) return null;

  return (
    <div className={styles.overlay}>
      <VideoFeed />
      <button
        ref={closeButtonRef}
        className={styles.closeButton}
        onClick={() => navigate(`/lanterns?currentLanternId=${currentLanternId}`)}
      >
        닫기
      </button>
      <img src={lanternData.panorama} className={styles.fullImage} alt="랜턴 이미지" />

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
