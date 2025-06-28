import React, { useState } from 'react';
import * as styles from './Entry.css';
import Lantern from '@/assets/Lantern.svg?react';
import RoundLantern from '@/assets/RoundLantern.svg?react';

const Entry = () => {
  const [entryCode, setEntryCode] = useState('');

  const handleSubmit = () => {
    if (entryCode.trim()) {
      console.log('입장 코드:', entryCode);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      {/* 왼쪽 섹션 (2개) */}
      <div className={styles.backgroundLanternContainer}>
        <Lantern className={styles.leftLantern1} role="img" aria-label="Left Big Lantern 1" />
        <RoundLantern className={styles.leftLantern2} role="img" aria-label="Left Big Lantern 2" />

        {/* 오른쪽 섹션 (10개) */}
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
        <h1 className={styles.mainTitle}>
          {`당신을 위한,\n추억의 시간을\n찾아왔어요!`}
        </h1>

        <p className={styles.subTitle}>
          {`추억에 젖을 준비가 끝났다면\n아래에 입장코드를 작성해주세요.`}
        </p>

        <input
          type="text"
          className={styles.inputField}
          placeholder="받으신 입장코드를 입력해주세요."
          value={entryCode}
          onChange={(e) => setEntryCode(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          className={styles.enterButton}
          onClick={handleSubmit}
          type="button"
        >
          지금 바로 입장하기
        </button>
      </div>

      {/* 배경 그라데이션 */}
      <div className={styles.backgroundGradient}>
        {/* 블러 섹션 (6개) */}
        <div className={styles.lanternContainer}>
          <Lantern className={styles.blurLantern1} role="img" aria-label="Blur Lantern 1" />
          <Lantern className={styles.blurLantern2} role="img" aria-label="Blur Lantern 2" />
          <Lantern className={styles.blurLantern3} role="img" aria-label="Blur Lantern 3" />
          <Lantern className={styles.blurLantern4} role="img" aria-label="Blur Lantern 4" />
          <Lantern className={styles.blurLantern5} role="img" aria-label="Blur Lantern 5" />
          <Lantern className={styles.blurLantern6} role="img" aria-label="Blur Lantern 6" />
        </div>
      </div>
    </div>
  );
};

export default Entry;