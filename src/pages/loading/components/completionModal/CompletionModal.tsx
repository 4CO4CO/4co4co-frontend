import React from 'react';
import * as styles from './CompletionModal.css';

interface CompletionModalProps {
  isOpen: boolean;
  onEnter: () => void;
  onCancel: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onEnter,
  onCancel
}) => {
  if (!isOpen) return null;

  // 오버레이 클릭 시 모달 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>생성 완료!</h2>

        <p className={styles.message}>
          기다려주셔서 감사합니다.{'\n'}지금 바로 입장이 가능합니다.
        </p>

        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={onCancel}
            type="button"
          >
            취소
          </button>

          <button
            className={styles.enterButton}
            onClick={onEnter}
            type="button"
          >
            입장할래요
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;