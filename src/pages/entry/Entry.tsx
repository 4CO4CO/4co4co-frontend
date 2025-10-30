import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './Entry.css';
import Lantern from '@/assets/Lantern.svg?react';
import RoundLantern from '@/assets/RoundLantern.svg?react';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/textfield';
import { validateEntryCode } from '@/utils/validation';

const Entry = () => {
  const [entryCode, setEntryCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 798);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = () => {
    const error = validateEntryCode(entryCode);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage('');
    navigate('/loading', { state: { lantern_id: entryCode } });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 입력 필드 변경 시 오류 메시지 삭제
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntryCode(value);

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundLanternContainer}>
        {/* 왼쪽 섹션 */}
        <Lantern className={styles.leftLantern1} role="img" aria-label="Left Big Lantern 1" />
        <RoundLantern className={styles.leftLantern2} role="img" aria-label="Left Big Lantern 2" />
        <Lantern className={styles.leftLantern3} role="img" aria-label="Left Big Lantern 3" />
        <RoundLantern className={styles.leftLantern4} role="img" aria-label="Left Big Lantern 4" />
        <Lantern className={styles.leftLantern5} role="img" aria-label="Left Big Lantern 5" />

        {/* 오른쪽 섹션 */}
        <Lantern className={styles.rightLantern1} role="img" aria-label="Right Lantern 1" />
        <Lantern className={styles.rightLantern2} role="img" aria-label="Right Lantern 2" />
        <Lantern className={styles.rightLantern3} role="img" aria-label="Right Lantern 3" />
        <RoundLantern className={styles.rightLantern4} role="img" aria-label="Right Lantern 4" />
        <Lantern className={styles.rightLantern5} role="img" aria-label="Right Lantern 5" />
        <Lantern className={styles.rightLantern6} role="img" aria-label="Right Lantern 6" />
        <Lantern className={styles.rightLantern7} role="img" aria-label="Right Lantern 7" />
        <Lantern className={styles.rightLantern8} role="img" aria-label="Right Lantern 8" />
        <Lantern className={styles.rightLantern9} role="img" aria-label="Right Lantern 9" />
        <Lantern className={styles.rightLantern10} role="img" aria-label="Right Lantern 10" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className={styles.contentWrapper}>
        <h1 className={styles.mainTitle}>{`당신을 위한,\n추억의 시간을\n찾아왔어요!`}</h1>

        <p className={styles.subTitle}>{`추억에 젖을 준비가 끝났다면\n아래에 입장코드를 작성해주세요.`}</p>

        <TextField
          className={styles.inputField}
          placeholder="받으신 입장코드를 입력해주세요."
          value={entryCode}
          onChange={handleInputChange}
        />

        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <div className={styles.buttonContainer}>
          {isMobile && (
            <Button variant="secondary" size="sm" className={styles.cancelButton} onClick={handleCancel} type="button">
              취소
            </Button>
          )}

          <Button
            variant="primary"
            size={isMobile ? 'sm' : 'lg'}
            className={styles.enterButton}
            onClick={handleSubmit}
            type="button"
          >
            지금 바로 입장하기
          </Button>
        </div>
      </div>

      {/* 배경 그라데이션 */}
      <div className={styles.backgroundGradient}>
        {/* 블러 섹션 */}
        <div className={styles.lanternContainer}>
          <Lantern className={styles.blurLantern1} role="img" aria-label="Blur Lantern 1" />
          <Lantern className={styles.blurLantern2} role="img" aria-label="Blur Lantern 2" />
          <Lantern className={styles.blurLantern3} role="img" aria-label="Blur Lantern 3" />
          <Lantern className={styles.blurLantern4} role="img" aria-label="Blur Lantern 4" />
          <Lantern className={styles.blurLantern5} role="img" aria-label="Blur Lantern 5" />
          <Lantern className={styles.blurLantern6} role="img" aria-label="Blur Lantern 6" />
          <Lantern className={styles.blurLantern7} role="img" aria-label="Mobile Blur Lantern 7" />
          <Lantern className={styles.blurLantern8} role="img" aria-label="Mobile Blur Lantern 8" />
          <Lantern className={styles.blurLantern9} role="img" aria-label="Mobile Blur Lantern 9" />
        </div>
      </div>
    </div>
  );
};

export default Entry;
