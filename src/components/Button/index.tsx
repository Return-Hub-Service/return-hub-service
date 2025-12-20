'use client';

import { ButtonProps } from '@/src/interfaces/common';
import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
}: ButtonProps) {
  const variantClass = styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`];
  const sizeClass = styles[`btn${size.toUpperCase()}`];
  const fullWidthClass = fullWidth ? styles.btnFull : '';

  return (
    <button
      type={type}
      className={`${styles.btn} ${variantClass} ${sizeClass} ${fullWidthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
}
