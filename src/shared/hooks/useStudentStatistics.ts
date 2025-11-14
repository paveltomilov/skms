import { useCallback, useEffect, useState } from 'react';
import { getStudentStatistics, StudentStatistics } from '../utils/getStatistics/getStatistics';
import { useUserCookies } from './useUserCookies';

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
            console.log(statisticsData);
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