import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { setCurrentStudent } from '@/store/trainingSlice';
import { useAppDispatch } from '@/shared/hooks/store';
import { User } from '@/shared/types/users';
import { useSimulationByIdStudent } from '@/shared/hooks/useSimulationByIdStudent';

interface Props {
	className?: string;
	data: User;
}

const UserCard: FC<Props> = ({ className, data }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const textDeleteBtn =
		data.role === 'student' ? 'УДАЛИТЬ УЧЕНИКА' : 'УДАЛИТЬ ПРЕПОДАВАТЕЛЯ';

	const { deleteSimulation, hasActiveSimulation } = useSimulationByIdStudent(
		data.id,
	);

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
						{hasActiveSimulation ? (
							<Button
								width={273}
								height={27}
								text="Удалить симуляцию"
								className={styles.card__buttons__button}
								onClick={deleteSimulation}
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
							}
							}
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
