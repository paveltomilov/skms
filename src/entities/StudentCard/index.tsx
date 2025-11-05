import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { setStudentId } from '@/store/trainingSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { User } from '@/shared/types/users';

interface Props {
	className?: string;
	data: User;
}

const UserCard: FC<Props> = ({ className, data }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const textDeleteRole =
		data.role === 'student'
			? 'студента'
			: data.role === 'teacher'
			? 'преподават.'
			: 'пользователя';

	return (
		<div className={cn(styles.card, className)}>
			<div className={styles.card__profile}>
				<img
					className={styles.card__profile__photo}
					src="/images/user_icon.png"
					alt="Фото пользователя"
				></img>
				<div className={styles.card__profile__name}>
					{data.first_name} {data.last_name}
				</div>
			</div>
			<div className={styles.card__buttons}>
				{data.role === 'student' ? (
					<>
						<Button
							width={239}
							height={32}
							text="Задать симуляцию"
							className={styles.card__buttons__button}
							onClick={() => {
								dispatch(setStudentId(data.id));
								router.push('/ptk');
							}}
						/>
						<Button
							width={239}
							height={32}
							text="Статистика"
							className={styles.card__buttons__button}
							onClick={() =>
								dispatch(openModal('studentStatistics'))
							}
						/>
					</>
				) : null}

				<Button
					width={239}
					height={32}
					text={`Удалить ${textDeleteRole}`}
					className={styles.card__buttons__button}
					onClick={() => dispatch(openModal('studentDelete'))}
				/>
			</div>
		</div>
	);
};

export default UserCard;
