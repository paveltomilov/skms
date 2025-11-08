import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import cn from 'classnames';
import ModalHeader from '@/entities/ModalHeader';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { logout } from '@/shared/lib/auth';
import { deleteCookie } from 'cookies-next';

interface PopupUserInfoProps {
	handlePopupClose: () => void;
	className?: string;
}

const PopupUserInfo: FC<PopupUserInfoProps> = ({
	className,
	handlePopupClose,
}) => {
	const router = useRouter();
	const { firstName, lastName, role } = useUserCookies();
	const status = 	role === 'admin' ? 'Администратор' :
					role === 'teacher' ? 'Преподаватель' : 
					'Cтудент';

	const handleLogout = () => {
		// Централизованный выход: чистим access + refresh и связанные cookie
		logout();
		deleteCookie('first_name');
		deleteCookie('last_name');
		deleteCookie('role');
		router.push('/');
	};

	const fullName = firstName && lastName ? `${firstName} ${lastName}` : '—';

	return (
		<div className={cn(className, styles.userInfo)}>
			<ModalHeader
				headerTitle="Пользователь"
				handleClose={handlePopupClose}
			/>
			<div className={styles.userInfo__profile}>
				<img
					className={styles.userInfo__profile__photo}
					src="/images/user_icon.png"
					alt="Фото пользователя"
				></img>
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
				<li>
					<img src="/svg/support.svg" alt={'support'} />
					Помощь
				</li>
				<li>
					<img src="/svg/history.svg" alt={'history'} />
					История сессий
				</li>
				<li>
					<img src="/svg/add-account.svg" alt={'add account'} />
					Добавить аккаунт
				</li>
			</ul>
			<Button
				width={125}
				height={38}
				text="Выйти"
				onClick={handleLogout}
				className={styles.userInfo__logout}
			/>
		</div>
	);
};

export default PopupUserInfo;
