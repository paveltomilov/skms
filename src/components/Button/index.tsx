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
  // Добавляем пропс для дополнительных стилей
  style?: React.CSSProperties;
  // Добавляем пропс для дополнительных классов
  className?: string;
}

const Button = ({ 
  text, 
  width, 
  height, 
  image, 
  disabled = false, 
  onClick,
  style, // Дополнительные стили
  className // Дополнительные классы
}: ButtonProps) => {
  return (
    <button 
      className={`${styles.button} ${className || ''}`} // Добавляем переданные классы
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        ...style // Добавляем переданные стили
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text && text}
      {!text && image && (
        <Image
          src={image.startsWith('/') ? image : `/` + image}
          alt="Button icon"
          width={0}
          height={0}
          className={styles.icon}
          priority 
        />
      )}
    </button>
  );
};

export default Button;
