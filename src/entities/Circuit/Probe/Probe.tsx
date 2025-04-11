'use client'; 

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './Probe.module.scss';

interface ProbeProps {
  id: string; 
  color: 'red' | 'black';
}

export const Probe: React.FC<ProbeProps> = ({ id, color }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: { 
        type: 'probe',
        color: color,
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : 1, 
    cursor: isDragging ? 'grabbing' : 'grab', 
  };

  return (
    <div
      ref={setNodeRef} 
      style={style}
      className={`${styles.probe} ${styles[color]}`}
      {...listeners}
      {...attributes}
    >
      <div className={styles.handle}></div> 
      <div className={styles.cable}></div> 
      <div className={styles.tip}></div> 
    </div>
  );
};