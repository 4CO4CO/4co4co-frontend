import React from 'react';
import * as styles from './index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'lg' | 'sm';
  variant?: 'primary' | 'secondary' | 'dangerous';
}

const Button = ({ className, size = 'lg', variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.sizeStyles[size]} ${styles.variantStyles[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
