'use client';

import React from 'react';
import { ConnectionPoint } from '@/entities/ConnectionPoint'; 
import styles from './ConnectionPointList.module.scss';

export interface PointData {
  id: string; 
  label: string;
  position: { top: number | string; left: number | string };
}

interface ConnectionPointListProps {
  points: PointData[]; 
}

export const ConnectionPointList: React.FC<ConnectionPointListProps> = ({ points }) => {
  if (!points || points.length === 0) {
    return <div className={styles.loadingMessage}>Нет точек для отображения</div>;
  }

  return (
    <div className={styles.connectionListContainer}>
      {points.map((point) => (
        <ConnectionPoint
          key={point.id}
          id={point.id} 
          label={point.label}
          style={{ position: 'absolute', ...point.position }}
        />
      ))}
    </div>
  );
};