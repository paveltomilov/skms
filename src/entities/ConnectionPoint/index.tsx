'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './ConnectionPoint.module.scss';

interface ConnectionPointProps {
  id: string;
  label?: string;
  style?: React.CSSProperties;
}

export const ConnectionPoint: React.FC<ConnectionPointProps> = ({
  id, 
  label,
  style,
}) => {
  const { setNodeRef, isOver } = useDroppable({
      id: id,
      data: { 
          type: 'node',     
          nodeId: id,        
          accepts: ['probe'], 
          label: label 
      },
  });

  const htmlId = `point-${id}`;

  return (
    <div
      ref={setNodeRef}
      id={htmlId}     
      className={`${styles.connectionPoint} ${isOver ? styles.over : ''}`} 
      style={style}
      title={label || `Point ID: ${id}`} 
      suppressHydrationWarning={true}
    >
      <div className={styles.connectionDot}></div>
      {label && <span className={styles.connectionLabel}>{label}</span>}
    </div>
  );
};