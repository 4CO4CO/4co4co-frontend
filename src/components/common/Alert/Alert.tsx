import React, { useEffect, useCallback } from 'react';
import * as styles from './Alert.css';
import { Button } from '../Button/Button';

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  size?: 'lg' | 'sm';
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  title,
  message,
  size = 'lg',
  confirmText = '확인했어요',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && onCancel) {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onCancel) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles.modalSize[size]}`}>
        <h2 className={styles.titleSize[size]}>{title}</h2>

        <pre className={styles.messageSize[size]}>{message}</pre>

        <div className={styles.buttonContainer[size]}>
          <Button
            variant="secondary"
            size={size}
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant="primary"
            size={size}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
