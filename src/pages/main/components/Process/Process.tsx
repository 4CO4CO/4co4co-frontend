import { useState, useEffect, useCallback } from 'react';
import * as styles from './Process.css';
import ProcessItem from '../ProcessItem/ProcessItem';
import HourglassIcon from '@/assets/HourglassIcon.svg';
import LanternIcon from '@/assets/LanternIcon.svg';
import UploadIcon from '@/assets/UploadIcon.svg';

const Process = () => {
  const processData = [
    {
      icon: UploadIcon,
      title: "올리고",
      description: "다시 추억하고 싶은\n시간의 풍경 사진을\n찾아서 업로드합니다."
    },
    {
      icon: LanternIcon,
      title: "띄우며",
      description: "생성된 영상을 보며\n마음껏 만지고 교감하며\n소리와 진동을 느껴보세요."
    },
    {
      icon: HourglassIcon,
      title: "넘어요",
      description: "나만의 전시를 체험하며\n추억이 되살아나는 경험으로\n기억의 차원을 넘어보세요!"
    }
  ];

  const [cardList, setCardList] = useState([...processData, ...processData]);
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 슬라이드 애니메이션 함수
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
          {processData.map((item, index) => (
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
              <div
                key={`card-${Math.random()}-${index}`}
                className={styles.cardWrapper}
              >
                <ProcessItem
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;