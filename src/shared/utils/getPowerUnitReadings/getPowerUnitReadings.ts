import { PowerUnitReadings } from '@/shared/types/powerunit';

// функция для генерации показаний энергоблока

export const getReadings = () => {

    const getRandom = (min: number, max: number, k: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return (Math.floor(Math.random() * (max - min + 1)) + min) * k;
    };

    const readings: PowerUnitReadings = {
        frequency: (49.98 + getRandom(0, 4, 0.01)).toFixed(2),
        power: (207.4 + getRandom(0, 12, 0.1)).toFixed(1)
    };

    return readings;
};