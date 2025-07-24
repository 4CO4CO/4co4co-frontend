import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions } from './utils';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
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
    const positionMap = generateNonOverlappingPositions(ids);

    return (data?.data ?? []).map((lantern) => ({
      ...lantern,
      rect: {
        ...positionMap[lantern.lantern_id],
        width: 100,
        height: 100,
      },
    })) as LanternWithRect[];
  }, [data]);

  const { hitLanternId } = useLanternHit(lanterns);

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
