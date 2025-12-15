import { FC } from 'react';
import styles from './styles.module.scss';


const Timer:FC = () => {

    const hh:number = 1;
    const mm:number = 24;
    const ss:number = 60;

    return (
        <div className={styles.timer}>
            {hh} ч:{mm} м:{ss} с
        </div>
    );
};

export default Timer;