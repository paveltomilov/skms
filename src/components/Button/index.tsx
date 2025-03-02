'use client';
import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { buttonClicked } from '@/store/buttonsSlice';

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
  id,
  text, 
  width, 
  height, 
  image, 
  disabled = false, 
  onClick,
  style,
  className
}: ButtonProps) => {
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => 
    state.buttonsReducer.activeButtons[id] || false
  );

  const handleClick = () => {
    if (!disabled) {
      onClick?.();
      dispatch(buttonClicked(id));
    }
  };

  return (
    <button 
      className={`${styles.button} ${className || ''} ${isActive ? styles.active : ''}`}
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
