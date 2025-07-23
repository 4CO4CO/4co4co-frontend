import * as styles from './index.css';

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const Toggle = ({ isOn, onToggle }: ToggleProps) => {
  return (
    <div className={`${styles.toggleContainer} ${isOn ? styles.toggleContainerOn : ''}`} onClick={onToggle}>
      <div className={`${styles.toggleCircle} ${isOn ? styles.toggleCircleOn : ''}`} />
    </div>
  );
};

export default Toggle;
