import React from 'react';
import type { MultimeterMode } from '@/shared/types/multimeter'; 
import styles from './InputJacks.module.scss';

interface JackProps {
  id: string;
  label: string;    
  className?: string;
  isDisabled?: boolean;
}

const Jack: React.FC<JackProps> = ({ id, label, className = '', isDisabled = false }) => {
  return (
    <div className={styles.jackWrapper}>
       <div
          id={id} 
          className={`
            ${styles.jack}
            ${className}
            ${isDisabled ? styles.disabled : ''}
          `}
          title={isDisabled ? `${label} (неактивен)` : `Разъем ${label}`}
          aria-disabled={isDisabled}
       />
    </div>
  );
};

interface InputJacksProps {
  currentMode: MultimeterMode; 
}

export const InputJacks: React.FC<InputJacksProps> = ({ currentMode }) => {
  const is10AmodeActive = currentMode === 'DCA_10A';

  return (
    <div className={styles.jacksContainer}>
      <Jack
        id="jack-10a"
        label="10A"
        className={styles.a10}
        isDisabled={!is10AmodeActive}
      />
      <Jack
        id="jack-com"
        label="COM"
        className={styles.com}
        isDisabled={false}
      />
      <Jack
        id="jack-vohm"
        label="VΩmA"
        className={styles.vOhmMa}
        isDisabled={is10AmodeActive}
      />
    </div>
  );
};