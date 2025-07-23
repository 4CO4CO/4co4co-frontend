import React from 'react';
import * as styles from './TextArea.css';

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => {
  const textAreaClasses = className ? `${styles.textArea} ${className}` : styles.textArea;

  return <textarea className={textAreaClasses} {...props} />;
};