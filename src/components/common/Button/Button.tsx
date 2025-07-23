import React from 'react';
import * as styles from './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dangerous';
  size?: 'lg' | 'sm';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  children,
  className,
  ...props
}) => {
  const getButtonStyle = () => {
    if (variant === 'primary' && size === 'lg') return styles.primaryLg;
    if (variant === 'primary' && size === 'sm') return styles.primarySm;
    if (variant === 'secondary' && size === 'lg') return styles.secondaryLg;
    if (variant === 'secondary' && size === 'sm') return styles.secondarySm;
    if (variant === 'dangerous' && size === 'lg') return styles.dangerousLg;
    if (variant === 'dangerous' && size === 'sm') return styles.dangerousSm;

    return styles.primaryLg;
  };

  const buttonClasses = className
    ? `${getButtonStyle()} ${className}`
    : getButtonStyle();

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};