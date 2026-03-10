import { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { setCurrentStudent } from '@/store/trainingSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { User } from '@/shared/types/users';

interface Props {
	className?: string;
	data: User;
	hasActiveSimulation?: boolean;
	onDeleteSimulation?: () => Promise<void>;
}

const UserCard: FC<Props> = ({
	className,
	data,
	hasActiveSimulation = false,
	onDeleteSimulation,
}) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const textDeleteBtn =
		data.role === 'student' ? 'УДАЛИТЬ УЧЕНИКА' : 'УДАЛИТЬ ПРЕПОДАВАТЕЛЯ';

	return (
		<div className={cn(styles.card, className)}>
			<div className={styles.card__profile}>
				<Image
					className={styles.card__profile__photo}
					src="/images/user_icon.png"
					alt="Фото пользователя"
					width={80}
					height={80}
				/>
				<div className={styles.card__profile__name}>
					{data.first_name} {data.last_name}
				</div>
			</div>
			<div className={styles.card__buttons}>
				{data.role === 'student' ? (
					<>
						{hasActiveSimulation ? (
							<Button
								width={273}
								height={27}
								text="Удалить симуляцию"
								className={styles.card__buttons__button}
								onClick={() => onDeleteSimulation?.()}
							/>
						) : (
							<Button
								width={273}
								height={27}
								text="Задать симуляцию"
								className={styles.card__buttons__button}
								onClick={() => {
									dispatch(setCurrentStudent(data));
									router.push('/ptk');
								}}
							/>
						)}
						<Button
							width={273}
							height={27}
							text="Статистика"
							className={styles.card__buttons__button}
							onClick={() => {
								dispatch(setCurrentStudent(data));
								dispatch(openModal('studentStatistics'));
							}}
						/>
					</>
				) : null}

				<Button
					width={273}
					height={27}
					text={textDeleteBtn}
					className={styles.card__buttons__button}
					onClick={() => {
						dispatch(setCurrentStudent(data));
						dispatch(openModal('studentDelete'));
					}}
				/>
			</div>
		</div>
	);
};

export default UserCard;
