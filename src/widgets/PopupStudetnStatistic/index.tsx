import { FC } from 'react';
import styles from './styles.module.scss';

const dataStatistic: {param: string; quantity: number }[] = [
    {
        param: 'Общее количество задач',
        quantity: 147,
    },
    {
        param: 'Активные задачи',
        quantity: 2,
    },
    {
        param: 'Завершенные задачи',
        quantity: 37,
    },
    {
        param: 'Невыполненные задачи',
        quantity: 15,
    },
];

export const PopupStudentStatistic: FC = () => {
    return (
        <ul className={styles.popup}>
            {dataStatistic.map(({ param, quantity }) => (
                <li key={param} className={styles.statisticsItem}>
                    <div className={styles.statisticsItem__param}>{param}</div>
                    <div className={styles.statisticsItem__quantity}>{quantity}</div>
                </li>
            ))}
        </ul>
    );
};