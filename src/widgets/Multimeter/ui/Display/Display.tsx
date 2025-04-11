import React from 'react';
import styles from './Display.module.scss';

interface DisplayProps {

  value: string | number | null | undefined;
}


export const Display: React.FC<DisplayProps> = ({ value }) => {

  const displayContent = () => {
    if (value === null || value === undefined || value === '') {
      return <span className={styles.value}>---</span>;
    }

    if (typeof value === 'string' && (value.toUpperCase() === 'ERR' || value.toUpperCase() === 'ERROR')) {
        return <span className={`${styles.value} ${styles.error}`}>{value.toUpperCase()}</span>;
    }

     if (typeof value === 'string' && value.toUpperCase() === 'OL') {
        return <span className={`${styles.value} ${styles.overload}`}>{value.toUpperCase()}</span>;
    }

    return <span className={styles.value}>{String(value)}</span>;
  };

  return (
    <div className={styles.display} title={`Показание дисплея: ${value ?? '---'}`}>
      {displayContent()}
    </div>
  );
};