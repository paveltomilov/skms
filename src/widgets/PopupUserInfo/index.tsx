import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import ModalHeader from '@/entities/ModalHeader';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { logout } from '@/shared/lib/auth';
import EllipseClose from '@/shared/UI/icons/EllipseClose';
import { useAppDispatch } from '@/shared/hooks/store';
import { openModal } from '@/store/modalSlice';

interface PopupUserInfoProps {
	handlePopupClose: () => void;
	className?: string;
}

const PopupUserInfo: FC<PopupUserInfoProps> = ({
	className,
	handlePopupClose,
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isActiveStudentSimulation, setIsActiveStudentSimulation] =
		useState<boolean>(false);
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

	const handleAbortSimulation = () => {
		handlePopupClose();
		dispatch(openModal('abortSimulationConfirm'));
	};

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
							<div
								className={styles.userInfo__more__item}
								aria-label="Прервать попытку"
								onClick={handleAbortSimulation}
							>
								<EllipseClose size="xs" typeWidth="think" />
								Прервать попытку
							</div>
						</li>
					)}
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
