import React, { useState, useEffect } from 'react';
import CompletionModal from './components/completionModal/CompletionModal';
import LoadingAnimation from './components/loadingAnimation/LoadingAnimation';
import { LOADING_TEXTS } from './constants/loadingTexts';
import * as styles from './Loading.css';
import { useSubscribeStatus } from '@/queries/lantern/useSubscribeStatus';

interface LoadingProps {
  entryCode: string;
}

const Loading: React.FC<LoadingProps> = ({ entryCode = '홍길동1234' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  useSubscribeStatus({
    lanternId: entryCode,
    onDone: () => {
      setShowCompletionModal(true);
    },
  });

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

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(entryCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  const handleEnterLanternFestival = () => {
    console.log('풍등 축제 미리 입장하기 클릭');
  };

  const handleEnterExhibition = () => {
    console.log('전시 입장하기 클릭');
    setShowCompletionModal(false);
  };

  const handleCancelModal = () => {
    setShowCompletionModal(false);
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

          <button className={styles.enterButton} onClick={handleEnterLanternFestival} type="button">
            미리 풍등 축제 입장하기
          </button>
        </div>
      </div>

      <CompletionModal isOpen={showCompletionModal} onEnter={handleEnterExhibition} onCancel={handleCancelModal} />
    </>
  );
};

export default Loading;
