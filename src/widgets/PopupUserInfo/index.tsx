import { FC, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import ModalHeader from '@/entities/ModalHeader';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { logout } from '@/shared/lib/auth';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { openModal } from '@/store/modalSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { resetSimulation } from '@/store/simulationSlice';

interface PopupUserInfoProps {
	handlePopupClose: () => void;
	className?: string;
}

const PopupUserInfo: FC<PopupUserInfoProps> = ({
	className,
	handlePopupClose,
}) => {
	const simulation = useAppSelector(state => state.simulation);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isActiveStudentSimulation, setIsActiveStudentSimulation] =
		useState<boolean>(false);

	const handleStopSimulation = useCallback(() => {
		// Деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Сбрасываем состояние симуляции до дефолтного
		dispatch(resetSimulation());

		// Открываем попап об остановке симуляции
		dispatch(openModal('abortSimulation'));
	}, [simulation, dispatch]);
	const isActiveSimulation: boolean = true; // в будущем статус от websocket
	const { firstName, lastName, role } = useUserCookies();
	const status =
		role === 'admin'
			? 'Администратор'
			: role === 'teacher'
			? 'Преподаватель'
			: 'Cтудент';

	useEffect(() => {
		setIsActiveStudentSimulation(role === 'student' && isActiveSimulation);
	}, [role, isActiveSimulation]);

	const handleLogout = () => {
		// Централизованный выход: чистим access + refresh и связанные cookie
		logout();
		router.push('/');
	};

	const fullName = firstName && lastName ? `${firstName} ${lastName}` : '—';

	return (
		<div className={cn(className, styles.userInfo)}>
			<ModalHeader
				headerTitle="Пользователь"
				handleClose={handlePopupClose}
			/>
			<div className={styles.userInfo__wrapper}>
				<div className={styles.userInfo__profile}>
					<Image
						className={styles.userInfo__profile__photo}
						src="/images/user_icon.png"
						alt="Фото пользователя"
						width={80}
						height={80}
					/>
					<div className={styles.userInfo__profile__info}>
						<div className={styles.userInfo__profile__info__name}>
							{fullName}
						</div>
						<div className={styles.userInfo__profile__info__status}>
							{status}
						</div>
					</div>
				</div>
				<ul className={styles.userInfo__more}>
					{isActiveStudentSimulation && (
						<li>
							<Image
								src="/svg/abortSim.svg"
								alt="history"
								width={16}
								height={16}
							/>
							История сессий
						</li>
					)}
					<li>
						<Button
							width={90}
							height={34}
							aria-label="Прервать попытку"
							text="Прервать попытку"
							className={styles.buttonText}
							disabled={simulation.simulationId === null}
							onClick={handleStopSimulation}
							image={{
								src: '/svg/abortSim.svg',
								width: 16,
								height: 16,
							}}
						/>
					</li>
					<li>
						<Image
							src="/svg/history.svg"
							alt="history"
							width={16}
							height={16}
						/>
						История сессий
					</li>
					<li>
						<Image
							src="/svg/support.svg"
							alt="support"
							width={16}
							height={16}
						/>
						Помощь
					</li>

					<li>
						<Image
							src="/svg/add-account.svg"
							alt="add account"
							width={16}
							height={16}
						/>
						Добавить аккаунт
					</li>
				</ul>
				<Button
					width={290}
					height={38}
					text="Выйти"
					onClick={handleLogout}
					className={styles.userInfo__logout}
				/>
			</div>
		</div>
	);
};

export default PopupUserInfo;
