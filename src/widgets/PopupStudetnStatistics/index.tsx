import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { useStudentStatistics } from '@/shared/hooks/useStudentStatistics';
import { getStudentStatisticsArray } from '@/shared/utils/getStudentStatisticsArray/getStudentStatisticsArray';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { closeAllModal, openModal } from '@/store/modalSlice';

export const PopupStudentStatistics: FC = () => {

    const dispatch = useDispatch();

    const studentId = useAppSelector(state => state.training.currentStudent?.id);
    const { statistics, isLoading, error, refetch } = useStudentStatistics(studentId!);

    useEffect(() => {
        if (!studentId) {
            dispatch(closeAllModal());
            dispatch(openModal('note'));
        }
    }, [dispatch, studentId]);

    if (!studentId) {
        return null;
    };

    const dataStatistics = statistics ? getStudentStatisticsArray(statistics) : [];

    return (
        <div className={styles.popup}>
            {isLoading
                ? (<p>Loading...</p>)
                : (<ul className={styles.statistics}>
                    {dataStatistics.map(({ param, quantity }) => (
                        <li key={param} className={styles.statisticsItem}>
                            <div className={styles.statisticsItem__param}>{param}</div>
                            <div className={styles.statisticsItem__quantity}>{quantity}</div>
                        </li>
                    ))}
                </ul>)}
            {error && <ErrorMessage message={error} refetch={refetch} />}
        </div>
    );
};