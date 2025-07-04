import React from 'react';
import * as styles from './index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'dangerous';
}

const Button = ({ className, size = 'lg', variant = 'primary', disabled, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.sizeStyles[size]} ${styles.variantStyles[variant]} ${className ?? ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
