import { forwardRef } from 'react';
import * as styles from './CloseButton.css';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={styles.closeButton}
        onClick={onClick}
      >
        닫기
      </button>
    );
  }
);

CloseButton.displayName = 'CloseButton';