import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import { get } from '@/apis';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { useLanternHit } from '@/components/common/lantern/hooks/useLanternHit';

const Lantern = () => {
  const { handCenter } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const [lanterns, setLanterns] = useState<LanternWithRect[]>([]);
  const { hitLanternId } = useLanternHit(lanterns);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (hitLanternId) {
      navigate(`/lanterns/${hitLanternId}?currentLanternId=${currentLanternId}`);
    }
  }, [hitLanternId]);

  return (
    <>
      <VideoFeed />
      {lanterns.map((lantern) => (
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
      ))}
      {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}
    </>
  );
};

export default Lantern;
