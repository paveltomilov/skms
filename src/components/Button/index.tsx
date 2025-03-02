'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

interface ButtonProps {
  text?: string;
  width: number;
  height: number;
  image?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode; // Добавляем children в интерфейс
}

const Button = ({ 
  text, 
  width, 
  height, 
  image, 
  disabled = false, 
  onClick,
  style,
  className,
  children // Добавляем children в деструктуризацию
}: ButtonProps) => {
  return (
    <button 
      className={`${styles.button} ${className || ''}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        ...style 
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={`${styles.content} ${!text && image ? styles.noPadding : ''}`}>
        {image && (
          <div className={styles.iconWrapper}>
            <Image
              src={image}
              alt="Button icon"
              fill
              className={styles.icon}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
        {text && <span className={styles.text}>{text}</span>}
        {children} {/* Рендерим children */}
      </div>
    </button>
  );
};

export default Button;