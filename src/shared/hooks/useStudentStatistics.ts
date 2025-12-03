import { useCallback, useEffect, useState } from 'react';
import { getStudentStatistics } from '../utils/getStatistics/getStatistics';
import { useUserCookies } from './useUserCookies';
import { StudentStatistics } from '../types/statistics';

export const useStudentStatistics = (id: number) => {
    const [statistics, setStatistics] = useState<StudentStatistics | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { role } = useUserCookies();

    const fetchStatistics = useCallback(async () => {
        if (role === 'student') return;
        setIsLoading(true);
        setError(null);
        try {
            const statisticsData = await getStudentStatistics(id);
            setStatistics(statisticsData);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch students';
            setError(errorMessage);
            setStatistics(null);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);
    
    return { statistics, isLoading, error, refetch: fetchStatistics };
};