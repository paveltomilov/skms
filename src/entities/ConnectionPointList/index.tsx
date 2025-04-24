'use client';

import React from 'react';
import { ConnectionPoint } from '@/entities/ConnectionPoint';
import styles from './ConnectionPointList.module.scss';

import { PointData } from '@/shared/types/multimeter';
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
          style={point.position}
        />
      ))}
    </div>
  );
};

export default ConnectionPointList;