import html2canvas from 'html2canvas';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions, seededRandom } from './utils';
import { CloseButton } from '../lanternDetail/components/CloseButton/CloseButton';
import { useCloseGesture } from '../lanternDetail/hooks/useCloseGesture';
import { useHandMark } from '../../components/common/lantern/hooks/useHandMark';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import { LanternListResponse } from '@/apis/lantern';
import { MusicStatusData } from '@/apis/lantern/subscribeStatus';
import LanternImg1 from '@/assets/Lantern.svg?react';
import LanternImg2 from '@/assets/RoundLantern.svg?react';
import { Alert } from '@/components/common/alert';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { useLanternHit } from '@/components/common/lantern/hooks/useLanternHit';
import { lanternsDetail, lanternsList } from '@/mocks';
// import { useLanternList } from '@/queries/lantern/getLanternList';
import { useCachedLanternProgress } from '@/queries/lantern/useLanternProgress';
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
  // const { data } = useLanternList(currentLanternId);
  const data: LanternListResponse | undefined = queryClient.getQueryData(lanternKeys.list(currentLanternId ?? ''));
  const navigate = useNavigate();
  const [isMyLanternCompleted, setIsMyLanternCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [closeButtonRect, setCloseButtonRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 풍등 정보 없을 경우 리다이렉트
  useEffect(() => {
    if (!currentLanternId) {
      setShowAlert(true);
    }
  }, [currentLanternId]);

  useEffect(() => {
    const updateCloseButtonRect = () => {
      if (closeButtonRef.current) {
        setCloseButtonRect(closeButtonRef.current.getBoundingClientRect());
      }
    };

    // 컴포넌트 마운트 후 즉시 실행
    updateCloseButtonRect();

    window.addEventListener('resize', updateCloseButtonRect);
    return () => {
      window.removeEventListener('resize', updateCloseButtonRect);
    };
  }, []);

  useEffect(() => {
    queryClient.setQueryData(lanternKeys.list(currentLanternId ?? ''), {
      status: 'success',
      message: 'sucess',
      data: lanternsList,
    });
    lanternsDetail.forEach((detail) => {
      queryClient.setQueryData(lanternKeys.detail(detail.lantern_id), detail);
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    requestAnimationFrame(() => {
      const capture = async () => {
        const canvas = await html2canvas(containerRef.current!);
        const imgData = canvas.toDataURL('image/png');
        sessionStorage.setItem('lanternListBg', imgData);
      };
      capture();
    });
  }, [data]);

  const handleAlertConfirm = () => {
    navigate('/upload');
  };

  const lanterns = useMemo(() => {
    if (!closeButtonRect || !data) return [];

    const ids = (data?.data ?? []).map((l) => l.lantern_id);
    const positionMap = generateNonOverlappingPositions(
      ids,
      window.innerWidth <= MOBILE_MIN_WIDTH ? 60 : 100,
      window.innerWidth <= MOBILE_MIN_WIDTH ? window.innerHeight : window.innerWidth,
      window.innerWidth <= MOBILE_MIN_WIDTH ? window.innerWidth : window.innerHeight,
      closeButtonRect,
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
  }, [data, window.innerWidth, window.innerHeight, closeButtonRect]);

  // 내 풍등 완료 여부 확인
  const { data: progressData } = useCachedLanternProgress(currentLanternId);
  useEffect(() => {
    if (!currentLanternId) return;

    const isCompleted =
      Array.isArray(progressData) || (progressData && (progressData as MusicStatusData)?.status === 'success');

    if (isCompleted) {
      setTimeout(() => {
        setIsMyLanternCompleted(true);
      }, 1000);
    }
  }, [currentLanternId, progressData]);

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
    <div className={styles.container} ref={containerRef}>
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
