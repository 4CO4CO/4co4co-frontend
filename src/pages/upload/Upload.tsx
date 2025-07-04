import * as styles from './Upload.css';

const Upload = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{`2025\n당신의\nTOP 3 사진은?`}</h1>
      <p className={styles.description}>2025년은 당신에게 어떤 한 해였나요? 기억하고 싶은 순간을 알려주세요.</p>
    </div>
  );
};

export default Upload;
