import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions, seededRandom } from './utils';
import { CloseButton } from '../lanternDetail/components/CloseButton/CloseButton';
import { useCloseGesture } from '../lanternDetail/hooks/useCloseGesture';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import { MusicStatusData } from '@/apis/lantern/subscribeStatus';
import LanternImg1 from '@/assets/Lantern.svg?react';
import LanternImg2 from '@/assets/RoundLantern.svg?react';
import { Alert } from '@/components/common/alert';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { useLanternHit } from '@/components/common/lantern/hooks/useLanternHit';
import { useLanternList } from '@/queries/lantern/getLanternList';
import { queryClient } from '@/queries/queryClient';
import { lanternKeys } from '@/queries/queryKey';
import { MOBILE_MIN_WIDTH } from '@/styles/mediaQuery';

const LanternItem = ({
  lantern,
  isDelayed = false,
  onClick,
}: {
  lantern: LanternWithRect;
  isDelayed?: boolean;
  onClick: () => void;
}) => {
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
        animation: isDelayed
          ? `${styles.fadeInUp} 1s ease-out forwards, ${styles.neonBlink} 1.5s infinite forwards`
          : undefined,
        animationDelay: isDelayed ? '1s' : undefined,
      }}
      onClick={onClick}
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
  const [isMyLanternCompleted, setIsMyLanternCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 풍등 정보 없을 경우 리다이렉트
  useEffect(() => {
    if (!currentLanternId) {
      setShowAlert(true);
    }
  }, [currentLanternId]);

  const handleAlertConfirm = () => {
    navigate('/upload');
  };

  const lanterns = useMemo(() => {
    const ids = (data?.data ?? []).map((l) => l.lantern_id);
    const positionMap = generateNonOverlappingPositions(
      ids,
      window.innerWidth <= MOBILE_MIN_WIDTH ? 60 : 100,
      window.innerWidth <= MOBILE_MIN_WIDTH ? window.innerHeight : window.innerWidth,
      window.innerWidth <= MOBILE_MIN_WIDTH ? window.innerWidth : window.innerHeight,
    );
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
  }, [data, window.innerWidth]);

  // 내 풍등 완료 여부 확인
  useEffect(() => {
    if (!currentLanternId) return;

    const cachedProgress = queryClient.getQueryData<MusicStatusData | MusicStatusData[]>(
      lanternKeys.progress(currentLanternId),
    );
    const successLanterns = JSON.parse(localStorage.getItem('successLanterns') || '[]');
    const isCompleted =
      Array.isArray(cachedProgress) ||
      (cachedProgress && (cachedProgress as MusicStatusData)?.status === 'success') ||
      successLanterns.includes(currentLanternId);

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

  useCloseGesture(closeButtonRef);
  const handleCloseClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <CloseButton ref={closeButtonRef} onClick={handleCloseClick} />
      <VideoFeed />
      {lanternsWithoutMine.map((lantern) => (
        <LanternItem
          key={lantern.lantern_id}
          lantern={lantern}
          onClick={() => navigate(`/lanterns/${lantern.lantern_id}?currentLanternId=${currentLanternId}`)}
        />
      ))}
      {isMyLanternCompleted && myLantern && (
        <LanternItem
          key={myLantern.lantern_id}
          lantern={myLantern}
          isDelayed
          onClick={() => navigate(`/lanterns/${myLantern.lantern_id}?currentLanternId=${currentLanternId}`)}
        />
      )}
      {handCenter && <div className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} />}
      <Alert
        isOpen={showAlert}
        title="입장 코드 없음"
        message={`풍등 생성 후에 입장하실 수 있어요.`}
        confirmText="전시 업로드 하러 가기"
        onConfirm={handleAlertConfirm}
      />
    </div>
  );
};

export default Lantern;
