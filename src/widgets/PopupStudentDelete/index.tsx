import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppSelector } from '@/shared/hooks/store';
import { useDeleteUser } from '@/shared/hooks/useDeleteUser';
import { useDispatch } from 'react-redux';
import { clearCurrentStudent } from '@/store/trainingSlice';

export const PopupStudentDelete: FC = () => {
	const data = useAppSelector(store => store.training.currentStudent);
	const dispatch = useDispatch();
	const { deleteUser, isLoading, error, success } = useDeleteUser();
	function handleDelete() {
		deleteUser();
		if (success) {
			dispatch(clearCurrentStudent());
		}
	}
	if (data) {
		const role =
			data.role === 'student'
				? 'Ученик'
				: data.role === 'teacher'
				? 'Преподаватель'
				: 'Администратор';
		const fullName = `${data.first_name} ${data.last_name}`;

		return (
			<div className={styles.popup}>
				<div className={styles.info}>
					{success ? (
						<span>Пользователь удален</span>
					) : (
						<span>
							{role} <b>{fullName}</b> будет удален
						</span>
					)}
				</div>
				{!success && (
					<Button
						disabled={isLoading}
						className={styles.button}
						width={278}
						height={55}
						text={isLoading ? 'Удаление...' : 'Подтвердить'}
						onClick={handleDelete}
					/>
				)}
				{error && <span className={styles.error}>{error}</span>}
			</div>
		);
	}
};
