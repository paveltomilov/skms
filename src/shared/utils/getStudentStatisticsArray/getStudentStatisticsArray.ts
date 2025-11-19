import { StudentStatistics } from '@/shared/types/statistics';

export const getStudentStatisticsArray = (statistics: StudentStatistics) => {
    return [
                {
            param: 'Общее количество задач',
            quantity: statistics.total_simulations,
        },
        {
            param: 'Активные задачи',
            quantity: statistics.active_simulations,
        },
        {
            param: 'Завершенные задачи',
            quantity: statistics.finished_simulations,
        },
        {
            param: 'Невыполненные задачи',
            quantity: statistics.failed_simulations,
        },

    ];
};