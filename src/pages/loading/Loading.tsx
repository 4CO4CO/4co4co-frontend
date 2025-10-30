import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingAnimation from './components/loadingAnimation/LoadingAnimation';
import { LOADING_TEXTS } from './constants/loadingTexts';
import * as styles from './Loading.css';
import { Alert } from '@/components/common/alert';
import Button from '@/components/common/button';

interface LocationState {
  lantern_id: string;
}

const Loading = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [showCompletionAlert, setShowCompletionAlert] = useState(false);
  const navigate = useNavigate();

  // ... 추가 애니메이션
  useEffect(() => {
    let dotCount = 0;
    let textIndex = 0;

    const interval = setInterval(() => {
      dotCount++;

      if (dotCount > 3) {
        textIndex = (textIndex + 1) % LOADING_TEXTS.length;
        dotCount = 0;
        setCurrentTextIndex(textIndex);
      }

      setDots('.'.repeat(dotCount));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const location = useLocation();
  const entryCode = (location.state as LocationState)?.lantern_id;
  // const entryCode = '방문자-5897'
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!entryCode && !hasRedirected.current) {
      alert('잘못된 접근입니다.');
      hasRedirected.current = true;
      navigate(-1);
    }
  }, [entryCode, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCompletionAlert(true);
    }, 80000); // 2초 (2000ms)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!entryCode) {
    return null;
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(entryCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleEnterLanternFestival = async () => {
    await navigator.clipboard.writeText(entryCode);
    navigate(`/lanterns?currentLanternId=${entryCode}`);
  };

  const handleEnterExhibition = async () => {
    await navigator.clipboard.writeText(entryCode);
    setShowCompletionAlert(false);
    navigate(`/lanterns?currentLanternId=${entryCode}`);
  };

  const handleCancelAlert = () => {
    setShowCompletionAlert(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.mainTitle}>
            {LOADING_TEXTS[currentTextIndex]}
            {dots}
          </h1>

          <div className={styles.loadingIconContainer}>
            <LoadingAnimation />
          </div>

          <div className={styles.registrationBox}>
            <div className={styles.registrationMessage}>전시가 등록되었어요!</div>

            <div className={styles.entryCodeSection}>
              <div className={styles.entryCodeLine}>
                <span className={styles.entryCodeBadge}>입장코드</span>
                <span className={styles.entryCodeValue}>{entryCode}</span>
                <button className={styles.copyLink} onClick={handleCopyCode} type="button">
                  {isCopied ? '복사됨!' : '복사'}
                </button>
              </div>
            </div>

            <div className={styles.warningMessage}>
              꼭! 입장코드를 저장해주세요.{'\n'}이 화면을 나간 후에는{' '}
              <span className={styles.warningEmphasis}>입장코드가 없으면 풍등 전시를 볼 수 없어요.</span>
            </div>
          </div>

          <div className={styles.waitingMessage}>
            혹시 기다리기 지루하신가요?{'\n'}다른 사람들의 풍등을 구경하면서 기다릴 수 있어요!
          </div>
          <Button
            variant="primary"
            size="lg"
            className={styles.enterButton}
            onClick={handleEnterLanternFestival}
            type="button"
          >
            미리 풍등 축제 입장하기
          </Button>
        </div>
      </div>
      <Alert
        isOpen={showCompletionAlert}
        title="생성 완료!"
        message={`기다려주셔서 감사합니다.\n지금 바로 입장이 가능합니다.`}
        confirmText="입장할래요"
        cancelText="취소"
        onConfirm={handleEnterExhibition}
        onCancel={handleCancelAlert}
      />
    </>
  );
};

export default Loading;
