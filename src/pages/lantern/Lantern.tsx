import { useEffect, useMemo, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from './Lantern.css';
import { generateNonOverlappingPositions, seededRandom } from './utils';
import { CloseButton } from '../lanternDetail/components/CloseButton/CloseButton';
import { VideoFeed } from '../../components/common/lantern/VideoFeed';
import { useCloseGesture } from '../../hooks/useCloseGesture';
import { LanternListResponse } from '@/apis/lantern';
import { MusicStatusData } from '@/apis/lantern/subscribeStatus';
import hand from '@/assets/hand.png';
import LanternImg1 from '@/assets/Lantern.svg?react';
import LanternImg2 from '@/assets/RoundLantern.svg?react';
import { Alert } from '@/components/common/alert';
import { LanternWithRect } from '@/components/common/lantern/constants';
import { HandMarkProvider, useHandMarkContext } from '@/context/HandMarkContext';
import { useRtc } from '@/context/RtcProvider';
import { useLanternHit } from '@/hooks/useLanternHit';
import { lanternsDetail, lanternsList } from '@/mocks';
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

const LanternContent = () => {
  const { handCenter } = useHandMarkContext();
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');
  // const { data } = useLanternList(currentLanternId);
  const data: LanternListResponse | undefined = queryClient.getQueryData(lanternKeys.list(currentLanternId ?? ''));
  const navigate = useNavigate();
  const [isMyLanternCompleted, setIsMyLanternCompleted] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [closeButtonRect, setCloseButtonRect] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    qrUrl,
    state,
    // reconnect
  } = useRtc();

  // 풍등 정보 없을 경우 리다이렉트
  useEffect(() => {
    if (!currentLanternId) {
      setShowAlert(true);
    }
  }, [currentLanternId]);

  useEffect(() => {
    const SEEN_KEY = 'lantern_show_info_seen';
    try {
      const seen = localStorage.getItem(SEEN_KEY);
      if (!seen) {
        setShowInfo(true);
        localStorage.setItem(SEEN_KEY, '1');
      }
    } catch {
      setShowInfo(true);
    }
  }, []);

  useEffect(() => {
    const updateCloseButtonRect = () => {
      if (closeButtonRef.current) {
        setCloseButtonRect(closeButtonRef.current.getBoundingClientRect());
      }
    };

    // 컴포넌트 마운트 후 즉시 실행
    updateCloseButtonRect();
    window.addEventListener('resize', updateCloseButtonRect);

      lanternsList.push(  { lantern_id: currentLanternId as string, owner_name: (currentLanternId as string).slice(0, -5), emotion: '', is_current_lantern: false });
  const S3_BASE_URL = import.meta.env.VITE_S3_BASE_URL;

    const storedImageUrls = localStorage.getItem('visit_image');

    const imagesFromStorage = storedImageUrls ? JSON.parse(storedImageUrls) : [];

    lanternsDetail.push({
      lantern_id: currentLanternId as string,
      owner_name: (currentLanternId as string).slice(0, -5),
      images: imagesFromStorage,
      background_sounds: [
        `${S3_BASE_URL}/mock/wav/visit1.wav`,
        `${S3_BASE_URL}/mock/wav/visit2.wav`,
        `${S3_BASE_URL}/mock/wav/visit3.wav`,
      ],
    });
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
  }, [currentLanternId]);

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
  }, [hitLanternId, navigate, currentLanternId]);

  const lanternsWithoutMine = lanterns.filter((l) => l.lantern_id !== currentLanternId);
  const myLantern = lanterns.find((l) => l.lantern_id === currentLanternId);

  useCloseGesture(closeButtonRef);
  const handleCloseClick = () => {
    navigate('/');
    localStorage.removeItem('lantern_show_info_seen')
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
      {handCenter && (
        <img className={styles.handPointer} style={{ top: handCenter.y, left: handCenter.x }} src={hand} />
      )}
      <Alert
        isOpen={showAlert}
        title="입장 코드 없음"
        message={`풍등 생성 후에 입장하실 수 있어요.`}
        confirmText="전시 업로드 하러 가기"
        onConfirm={handleAlertConfirm}
      />
      <Alert
        isOpen={showInfo}
        title="워치 연결 안내"
        message={state === 'connected' ? '워치와 연결되었습니다.' : 'QR 코드를 스캔하세요.'}
        confirmText="닫기"
        onConfirm={() => {
          setShowInfo(false);
        }}
      >
        {qrUrl && <QRCode value={qrUrl} />}
      </Alert>
    </div>
  );
};

const Lantern = () => {
  const [searchParams] = useSearchParams();
  const currentLanternId = searchParams.get('currentLanternId');

  return (
    <HandMarkProvider enabled={!!currentLanternId}>
      <LanternContent />
    </HandMarkProvider>
  );
};

export default Lantern;
