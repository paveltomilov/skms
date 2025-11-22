import { usePowerUnitReadings } from '@/shared/hooks/usePowerUnitReadings';
import styles from './styles.module.scss';
import { FC } from 'react';
import React from 'react';

const PowerUnit:FC = () => {
    const readings = usePowerUnitReadings();
    return (
        <>
            <div className={styles.powerUnit}>
                {readings.frequency} Гц {readings.power} МВт
            </div>
        </>
    );
};

export default PowerUnit;
