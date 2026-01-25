import { FC } from 'react';
import styles from './styles.module.scss';
import { useTimer } from '@/shared/hooks/useTimer';


const Timer:FC = () => {

    const { hh, mm, ss } = useTimer();

    return (
        <div className={styles.timer}>
            {hh} ч:{mm} м:{ss} с
        </div>
    );
};

export default Timer;