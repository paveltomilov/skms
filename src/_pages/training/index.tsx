'use client';

import styles from './styles.module.scss';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import Button from '@/shared/UI/Button';
import { postMalfunctions } from '@/shared/utils/postMalfunctions/postMalfunctions';
import { useRequestData } from '@/shared/hooks/useRequestData';
import Loader from '@/shared/UI/Loader';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { useUsers } from '@/shared/hooks/useUsers';
import UserCard from '@/entities/StudentCard';

const Training = () => {
	const { urlBase, access, elements } = useRequestData();

	const { role } = useUserCookies();

	const { users, isLoading, error, refetch } = useUsers(role);

	const handleCreateMalfunctions = () => {
		postMalfunctions(urlBase, access, elements);
	};

	return (
		<>
			{role === 'student' ? (
				<section className={styles.training}>
					Недоступно для студента
				</section>
			) : (
				<>
					<section className={styles.training}>
						<div className={styles.training__title}>Обучение</div>
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
					<Button
						width={300}
						height={40}
						text="создать неисправности"
						onClick={() => handleCreateMalfunctions()}
					/>
				</>
			)}

			{isLoading && <Loader />}
			{error && <ErrorMessage message={error} refetch={refetch} />}
		</>
	);
};

export default Training;
