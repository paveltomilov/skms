import { FC } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { useStudentStatistics } from '@/shared/hooks/useStudentStatistics';
import { getStudentStatisticsArray } from '@/shared/utils/getStudentStatisticsArray/getStudentStatisticsArray';

export const PopupStudentStatistic: FC = () => {

    const studentId = useAppSelector(state => state.training.currentStudent?.id);
    const { statistics }  = useStudentStatistics(studentId!);
    const dataStatistics = statistics? getStudentStatisticsArray(statistics) : [];

    return (
        <ul className={styles.popup}>
            {dataStatistics.map(({ param, quantity }) => (
                <li key={param} className={styles.statisticsItem}>
                    <div className={styles.statisticsItem__param}>{param}</div>
                    <div className={styles.statisticsItem__quantity}>{quantity}</div>
                </li>
            ))}
        </ul>
    );
};