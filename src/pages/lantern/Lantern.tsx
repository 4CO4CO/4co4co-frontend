import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { useHandMark } from '../../components/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/lantern/VideoFeed';
import { get } from '@/apis';
import { LanternData, LanternWithRect } from '@/components/lantern/constants';
import { useLanternHit } from '@/components/lantern/hooks/useLanternHit';

const Lantern = () => {
  const { handCenter } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const [lanterns, setLanterns] = useState<LanternWithRect[]>([]);
  const { hitLanternId } = useLanternHit(lanterns);
  const navigate = useNavigate();
  const [hitLanternData, setHitLanternData] = useState<LanternData>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentLanternId) {
      navigate('/');
      return;
    }

    const fetchLanterns = async () => {
      try {
        const response = await get<{
          status: string;
          message: string;
          data: {
            lantern_id: string;
            owner_name: string;
            emotion: string;
            is_current_lantern: boolean;
          }[];
        }>(`/lanterns?current_lantern_id=${currentLanternId}`);

        const lanternsWithRect = response.data.map((lantern) => ({
          ...lantern,
          rect: {
            x: Math.random() * 600,
            y: Math.random() * 400,
            width: 100,
            height: 100,
          },
        }));
        setLanterns(lanternsWithRect);
      } catch (error) {
        console.error(error);
        alert('다시 시도해주세요');
      }
    };

    fetchLanterns();
  }, [currentLanternId]);

  const fetchLanternDetail = async (lantern_id: string) => {
    try {
      const response = await get<{
        status: string;
        message: string;
        data: {
          lantern_id: string;
          owner_name: string;
          panorama: string;
          background_sound: string;
          is_current_lantern: boolean;
        };
      }>(`/lanterns/${lantern_id}?current_lantern_id=${currentLanternId}`);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!hitLanternId) return;

    const fetch = async () => {
      const response = await fetchLanternDetail(hitLanternId);
      if (response) setHitLanternData(response);
    };
    fetch();
  }, [hitLanternId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (hitLanternData?.background_sound) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(hitLanternData.background_sound);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.error('Audio playback failed:', err);
      });
    }
  }, [hitLanternData?.background_sound]);

  return (
    <>
      <VideoFeed />
      {lanterns.length > 0 &&
        lanterns.map((lantern) => {
          const isHit = hitLanternId === lantern.lantern_id;
          return isHit ? (
            <img key={lantern.lantern_id} className={styles.lanternImg} src={hitLanternData?.panorama} />
          ) : (
            <div
              key={lantern.lantern_id}
              className={styles.lanternBox}
              style={{
                top: lantern.rect.y,
                left: lantern.rect.x,
                width: lantern.rect.width,
                height: lantern.rect.height,
              }}
            >
              {lantern.owner_name}
            </div>
          );
        })}

      {handCenter && (
        <div
          className={styles.handPointer}
          style={{
            top: handCenter.y,
            left: handCenter.x,
          }}
        />
      )}
    </>
  );
};

export default Lantern;
