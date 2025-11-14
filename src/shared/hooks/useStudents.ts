import { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../utils/getUsers/getUsers';
import { Role, User } from '../types/users';

export const useStudents = (role: Role) => {
    const [students, setStudents] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchStudents = useCallback(async () => {
        if (role === 'student') return;
        setIsLoading(true);
        setError(null);
        try {
            const users = await getUsers();
            const studentsData = users.filter(user => user.role === 'student');
            setStudents(studentsData);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch students';
            setError(errorMessage);
            setStudents([]);
        } finally {
            setIsLoading(false);
        }
    }, [role]);
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);
    
    return { students, isLoading, error, refetch: fetchStudents };
};