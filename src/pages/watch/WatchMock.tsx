import * as styles from './Watch.css';

const WatchPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>연결 완료</p>
      <div className={styles.visualizerCircle} />
    </div>
  );
};

export default WatchPage;
