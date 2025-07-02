import { useState, useEffect, useCallback } from 'react';
import { PROCESS_DATA } from './constants/processData';
import * as styles from './Process.css';
import ProcessItem from '../ProcessItem/ProcessItem';

const Process = () => {
  const [cardList, setCardList] = useState([...PROCESS_DATA, ...PROCESS_DATA]);
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slideCards = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setPosition((prev) => prev - 175);

    setTimeout(() => {
      setCardList((prevList) => {
        const updatedList = [...prevList];
        const firstItem = prevList[0];
        if (firstItem) {
          updatedList.push(firstItem);
          updatedList.shift();
        }
        return updatedList;
      });
      setPosition(0);
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      slideCards();
    }, 4000);

    return () => clearInterval(interval);
  }, [slideCards]);

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>
          기억의 차원,<br />
          어떻게 넘나요?
        </h2>

        {/* 데스크톱용 그리드 */}
        <div className={`${styles.processGrid} ${styles.desktopGrid}`}>
          {PROCESS_DATA.map((item, index) => (
            <ProcessItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {/* 모바일용 슬라이딩 컨테이너 */}
        <div className={styles.mobileContainer}>
          <div
            className={styles.mobileSlider}
            style={{
              transform: `translateX(${position}px)`,
              transition: position === 0 ? 'none' : 'transform 0.6s ease-in-out'
            }}
          >
            {cardList.map((item, index) => (
              <ProcessItem
                key={`card-${index}`}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;