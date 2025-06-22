import { useEffect, useRef } from 'react';
import Intro from './components/Intro/Intro';
import Process from './components/Process/Process';
import * as styles from './Main.css';

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 5초 후 다음 섹션으로 자동 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.mainContainer} ref={containerRef}>
      <section className={styles.section}>
        <Intro />
      </section>
      <section className={styles.section}>
        <Process />
      </section>
    </div>
  );
};

export default Main;