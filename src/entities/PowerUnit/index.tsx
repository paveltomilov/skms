import styles from './styles.module.scss';
import { PowerUnitReadings } from '@/shared/types/powerunit';
import { FC } from 'react';

const PowerUnit:FC<{readings:PowerUnitReadings}> = ({readings}) => {

    return (
        <>
            <div className={styles.powerUnit}>
                {readings.frequency} Гц {readings.power} МВт
            </div>
        </>
    );
};

export default PowerUnit;
