import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions, seededRandom } from './utils';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import LanternImg1 from '@/assets/Lantern.svg?react';
import LanternImg2 from '@/assets/RoundLantern.svg?react';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { useLanternHit } from '@/components/common/lantern/hooks/useLanternHit';
import { useLanternList } from '@/queries/lantern/getLanternList';

const Lantern = () => {
  const { handCenter } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const { data } = useLanternList(currentLanternId);
  const navigate = useNavigate();

  const lanterns = useMemo(() => {
    const ids = (data?.data ?? []).map((l) => l.lantern_id);
    const positionMap = generateNonOverlappingPositions(ids, 100, window.innerWidth, window.innerHeight);
    const lanternImages = [LanternImg1, LanternImg2];

    return (data?.data ?? []).map((lantern) => ({
      ...lantern,
      rect: {
        ...positionMap[lantern.lantern_id],
      },
      ImageComponent:
        lanternImages[Math.floor(seededRandom((lantern as { lantern_id: string }).lantern_id) * lanternImages.length)],
      rotation: seededRandom((lantern as { lantern_id: string }).lantern_id + 'rotation') * 20 - 10, // -10도에서 +10도 사이의 각도
      isFlipped: seededRandom((lantern as { lantern_id: string }).lantern_id + 'flip') > 0.5,
    })) as LanternWithRect[];
  }, [data]);

  const { hitLanternId } = useLanternHit(lanterns);

  useEffect(() => {
    if (hitLanternId) {
      navigate(`/lanterns/${hitLanternId}?currentLanternId=${currentLanternId}`);
    }
  }, [hitLanternId]);

  return (
    <div className={styles.container}>
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
            transform: `rotate(${lantern.rotation}deg)`,
          }}
        >
          {lantern.ImageComponent && (
            <lantern.ImageComponent
              className={styles.lanternImg}
              style={{
                transform: `scaleX(${lantern.isFlipped ? -1 : 1})`,
              }}
            />
          )}
          <span className={styles.lanternName}>{lantern.owner_name}</span>
        </div>
      ))}
      {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}
    </div>
  );
};

export default Lantern;
