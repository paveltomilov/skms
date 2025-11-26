'use client';

import styles from './styles.module.scss';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import Loader from '@/shared/UI/Loader';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { useGetUsers } from '@/shared/hooks/useGetUsers';
import UserCard from '@/entities/UserCard';
import { useAppSelector } from '@/shared/hooks/store';
import { useEffect } from 'react';

const Training = () => {
	const updateListNumber = useAppSelector(store => store.updateList);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const nameList = isAdmin ? 'Список преподавателей' : 'Список студентов';

	const { users, isLoading, error, refetch } = useGetUsers(role);

	useEffect(() => {
		refetch();
	}, [updateListNumber]);

	return (
		<>
			{role === 'student' ? (
				<section className={styles.training}>
					Недоступно для студента
				</section>
			) : (
				<section className={styles.training}>
					<div className={styles.training__title}>{nameList}</div>
					<div className={styles.training__cards}>
						{users.map(user => (
							<UserCard
								key={user.id}
								data={user}
								className={styles.training__cards__card}
							/>
						))}
					</div>
				</section>
			)}

			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} refetch={refetch} />}
		</>
	);
};

export default Training;
