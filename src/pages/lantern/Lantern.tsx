import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions, seededRandom } from './utils';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import { MusicStatusData } from '@/apis/lantern/subscribeStatus';
import LanternImg1 from '@/assets/Lantern.svg?react';
import LanternImg2 from '@/assets/RoundLantern.svg?react';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { useLanternHit } from '@/components/common/lantern/hooks/useLanternHit';
import { useLanternList } from '@/queries/lantern/getLanternList';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';

const LanternItem = ({ lantern, isDelayed = false }: { lantern: LanternWithRect; isDelayed?: boolean }) => {
  return (
    <div
      className={styles.lanternBox}
      style={{
        top: lantern.rect.y,
        left: lantern.rect.x,
        width: lantern.rect.width,
        height: lantern.rect.height,
        transform: `rotate(${lantern.rotation}deg)`,
        opacity: isDelayed ? 0 : 1,
        animation: isDelayed ? `${styles.fadeInUp} 1s ease-out forwards` : undefined,
        animationDelay: isDelayed ? '1s' : undefined,
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
  );
};

const Lantern = () => {
  const { handCenter } = useHandMark();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  const { data } = useLanternList(currentLanternId);
  const navigate = useNavigate();
  const [isMyLanternCompleted, setIsMyLanternCompleted] = useState(true);

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

  // 내 풍등 완료 여부 확인
  useEffect(() => {
    if (!currentLanternId) return;

    const cachedProgress = queryClient.getQueryData<MusicStatusData | MusicStatusData[]>(
      lanternKeys.progress(currentLanternId),
    );

    const isCompleted =
      Array.isArray(cachedProgress) || (cachedProgress && (cachedProgress as MusicStatusData)?.status === 'success');

    if (isCompleted) {
      setTimeout(() => {
        setIsMyLanternCompleted(true);
      }, 1000);
    }
  }, [currentLanternId, queryClient]);

  const { hitLanternId } = useLanternHit(lanterns);

  useEffect(() => {
    if (hitLanternId) {
      navigate(`/lanterns/${hitLanternId}?currentLanternId=${currentLanternId}`);
    }
  }, [hitLanternId]);

  const lanternsWithoutMine = lanterns.filter((l) => l.lantern_id !== currentLanternId);
  const myLantern = lanterns.find((l) => l.lantern_id === currentLanternId);

  return (
    <div className={styles.container}>
      <VideoFeed />
      {lanternsWithoutMine.map((lantern) => (
        <LanternItem key={lantern.lantern_id} lantern={lantern} />
      ))}
      {isMyLanternCompleted && myLantern && <LanternItem key={myLantern.lantern_id} lantern={myLantern} isDelayed />}
      {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}
    </div>
  );
};

export default Lantern;
