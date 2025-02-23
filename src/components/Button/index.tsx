'use client';

import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

interface ButtonProps {
  text?: string;
  width: number;
  height: number;
  image?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ 
  text, 
  width, 
  height, 
  image, 
  isActive = false, 
  disabled = false, 
  onClick 
}: ButtonProps) => {
  return (
    <button 
      className={`${styles.button} ${isActive ? styles.active : ''}`} 
      style={{ width: `${width}px`, height: `${height}px` }}
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