import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as styles from './LanternDetail.css';
import { get } from '@/apis';
import { LanternData } from '@/components/lantern/constants';

const LanternDetail = () => {
  const { lanternId } = useParams();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lanternData, setLanternData] = useState<LanternData>();

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

  if (!lanternData) return null;

  return (
    <div className={styles.overlay}>
      <button
        className={styles.closeButton}
        onClick={() => navigate(`/lanterns?currentLanternId=${currentLanternId}`)}
      >
        닫기
      </button>
      <img src={lanternData.panorama} className={styles.fullImage} />
    </div>
  );
};

export default LanternDetail;
