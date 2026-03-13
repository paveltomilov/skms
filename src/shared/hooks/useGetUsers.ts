import { useCallback, useState } from 'react';
import { getUsers } from '../api';
import { Role, User } from '../types/users';

export const useGetUsers = (role: Role) => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchUsers = useCallback(async () => {
		if (role === 'student') return;
		setIsLoading(true);
		setError(null);
		try {
			const users = await getUsers();
			const usersData =
				role === 'admin'
					? users.filter(user => user.role === 'teacher')
					: users.filter(user => user.role === 'student');
			setUsers(usersData);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Failed to fetch users';
			setError(errorMessage);
			setUsers([]);
		} finally {
			setIsLoading(false);
		}
	}, [role]);

	return { users, isLoading, error, refetch: fetchUsers };
};
