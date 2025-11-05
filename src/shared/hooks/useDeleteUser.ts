// hooks/useDeleteUser.ts
import { useState } from 'react';
import { useAppSelector } from './store';
import { useUserCookies } from './useUserCookies';
import { deleteUser } from '../utils/deleteUser/deleteUser';

export const useDeleteUser = () => {
	const studentId = useAppSelector(
		state => state.training.currentStudent?.id,
	);
	const { role } = useUserCookies();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleDeleteUser = async () => {
		if (role === 'student') {
			setError('Студенты не могут удалять пользователей');
			return;
		}

		if (!studentId) {
			setError('ID студента не найден');
			return;
		}

		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await deleteUser(studentId); // deleteUser уже возвращает данные или выбрасывает ошибку
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
		} finally {
			setIsLoading(false);
		}
	};

	return {
		deleteUser: handleDeleteUser,
		isLoading,
		error,
		success,
	};
};
