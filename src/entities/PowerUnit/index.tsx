import { getReadings } from '@/shared/utils/getPowerUnitReadings/getPowerUnitReadings';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PowerUnitReadings } from '@/shared/types/powerunit';
import { FC } from 'react';

const PowerUnit:FC = () => {

    const { isWork } = useAppSelector(
        state => state.powerUnit,
    );

    const readings: PowerUnitReadings = isWork ? getReadings() : {
        frequency: '0',
        power: '0'
    };

    return (
        <>
            <div className={styles.powerUnit}>
                {readings.frequency} Гц {readings.power} МВт
            </div>
        </>
    );
};

export default PowerUnit;
