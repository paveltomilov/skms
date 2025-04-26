'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './ConnectionPoint.module.scss';
import { DndItemType, ACCEPTABLE_NODE_TYPES } from '@/shared/configs/simulator.constants';

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
          type: DndItemType.NODE,
          nodeId: id,
          accepts: ACCEPTABLE_NODE_TYPES,
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
    >
      <div className={styles.connectionDot}></div>
      {label && <span className={styles.connectionLabel}>{label}</span>}
    </div>
  );
};