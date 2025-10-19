import { FC } from 'react';
import styles from './styles.module.scss';

const dataStatiscit = [
    {
        param: 'Общее количество задач',
        quantity: 147
    },
    {
        param: 'Активные задачи',
        quantity: 2
    },
    {
        param: 'Завершенные задачи',
        quantity: 37
    },
    {
        param: 'Невыполненные задачи',
        quantity: 15
    },
];

export const PopupStudentStatistic: FC = () => {
    return (
        <div className={styles.popup}>
            {dataStatiscit.map(({ param, quantity }) =>
                <div key={param} className={styles.statisticsItem}>
                    <div className={styles.statisticsItem__param}>{param}</div>
                    <div className={styles.statisticsItem__quantity}>{quantity}</div>
                </div>
            )}
        </div>
    );
};