'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

interface ButtonProps {
  id: string; // Добавляем обязательный идентификатор
  text?: string;
  width: number;
  height: number;
  image?: string;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const Button = ({ 
  text, 
  width, 
  height, 
  image, 
  disabled = false, 
  onClick,
  style,
  className
}: ButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick?.();
    }
  };

  return (
    <button 
      className={`${styles.button} ${className || ''}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        ...style 
      }}
      onClick={handleClick}
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
      </div>
    </button>
  );
};

export default Button;
