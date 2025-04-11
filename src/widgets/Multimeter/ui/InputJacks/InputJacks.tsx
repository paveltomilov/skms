import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import type { MultimeterMode } from '@/shared/types/multimeter.d';
import styles from './InputJacks.module.scss';

interface JackProps {
  id: string;  
  label: string;
  className?: string;  
  isDisabled?: boolean; 
}

const Jack: React.FC<JackProps> = ({ id, label, className = '', isDisabled = false }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: { type: 'jack', accepts: ['probe'] }, 
    disabled: isDisabled, 
  });

  return (
    <div className={styles.jackWrapper}>
       <div
          ref={setNodeRef}
          className={`
            ${styles.jack}
            ${className}
            ${isOver && !isDisabled ? styles.over : ''}
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

