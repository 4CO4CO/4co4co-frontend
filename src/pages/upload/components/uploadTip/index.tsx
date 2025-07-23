import * as styles from './index.css';
import { UPLOAD_TIPS } from '../../constants';
import Chip from '@/components/common/chip';
import Spacing from '@/components/common/spacing';

interface UploadTipProps {
  className?: string;
}

const UploadTip = ({ className }: UploadTipProps) => {
  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <h2 className={styles.title}>{`혹시!\n무슨 사진을\n올려야 할지 고민 중이라면!`}</h2>
      <Spacing size={1.1} />
      <section className={styles.tip_wrapper}>
        {UPLOAD_TIPS.map((text, index) => (
          <div key={index} className={styles.tip_item}>
            <Chip>{`TIP ${String(index + 1).padStart(2, '0')}`}</Chip>
            <p>{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UploadTip;
