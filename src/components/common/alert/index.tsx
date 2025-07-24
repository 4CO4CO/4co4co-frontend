import React, { useEffect, useCallback, useState } from 'react';
import * as styles from './index.css';
import Button from '@/components/common/button';
import { MOBILE_MAX_WIDTH } from '@/styles/mediaQuery';

interface AlertProps {
  isOpen: boolean;
  title: string;
  message: string;
  size?: 'lg' | 'sm';
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export const Alert = ({
  isOpen,
  title,
  message,
  size,
  confirmText = '확인했어요',
  cancelText,
  onConfirm,
  onCancel,
  disabled = false,
}: AlertProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    },
    [onCancel],
  );

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

  const [alertSize, setAlertSize] = useState<'sm' | 'lg'>(() => {
    if (size) return size;
    return window.innerWidth <= MOBILE_MAX_WIDTH ? 'sm' : 'lg';
  });

  useEffect(() => {
    if (size) {
      setAlertSize(size);
      return;
    }

    const checkMobile = () => {
      setAlertSize(window.innerWidth <= MOBILE_MAX_WIDTH ? 'sm' : 'lg');
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [size]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={`${styles.modal} ${styles.modalSize[alertSize]}`}>
        <h2 className={styles.titleSize[alertSize]}>{title}</h2>

        <pre className={styles.messageSize[alertSize]}>{message}</pre>

        <div className={styles.buttonContainer[alertSize]}>
          {cancelText && (
            <Button variant="secondary" size={alertSize} onClick={onCancel}>
              {cancelText}
            </Button>
          )}

          <Button variant="primary" size={alertSize} onClick={onConfirm} disabled={disabled}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
