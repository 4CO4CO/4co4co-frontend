import React from 'react';
import * as styles from './TextField.css';

export const TextField: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  const inputClasses = className ? `${styles.textField} ${className}` : styles.textField;

  return <input className={inputClasses} {...props} />;
};