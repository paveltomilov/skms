import { useEffect, useState } from 'react';
import { useAppSelector } from './store';
import { getReadings } from '../utils/getPowerUnitReadings/getPowerUnitReadings';
import { PowerUnitReadings } from '../types/powerunit';

export const usePowerUnitReadings = () => {
    const [ readings, setReadings ] = useState<PowerUnitReadings>({frequency:'50.00', power:'208.0'});
    const { isWork } = useAppSelector(
        state => state.powerUnit,
    );

    useEffect(() => {
        if (!isWork) {
            setReadings({ frequency:'0', power: '0' });
            return;
        }
        const timeInterval = setInterval(() => {
            const currentReadings = getReadings();
            setReadings(currentReadings);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    
    }, [isWork]);

    return readings ;
};

