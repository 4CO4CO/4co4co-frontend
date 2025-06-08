import * as styles from './LanternDetail.css';

interface Props {
  imageSrc: string;
  onClose: () => void;
}

const LanternDetail = ({ imageSrc, onClose }: Props) => {
  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={onClose}>닫기</button>
      <img src={imageSrc} className={styles.fullImage} />
    </div>
  );
};

export default LanternDetail;
