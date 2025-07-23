import * as styles from './index.css';

interface ChipProps {
  children: string;
}

const Chip = ({ children }: ChipProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Chip;
