'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import useShowModal from '@/shared/hooks/useShowModal';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import cn from 'classnames';
import DateTime from '@/entities/DateTime/DateTime';

const HeaderTraining: FC = () => {
	const handleModalStudentCreate = useShowModal('studentCreate');
	const handleModalNotification = useShowModal('notification');
	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const textBtnAddUser = isAdmin
		? 'СОЗДАТЬ ПРЕПОДАВАТЕЛЯ'
		: 'СОЗДАТЬ УЧЕНИКА';

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div
					className={cn(styles.buttons, {
						[styles.buttons__wide]: isAdmin,
					})}
				>
					<Button
						className={styles.button}
						width={isAdmin ? 270 : 213}
						height={27}
						text={textBtnAddUser}
						onClick={handleModalStudentCreate}
					/>
					<Button
						className={styles.button}
						width={163}
						height={27}
						text="Статистика"
						onClick={handleModalNotification}
					/>
					<Button
						className={styles.button}
						width={32}
						height={32}
						text="?"
						onClick={handleModalNotification}
					/>
				</div>
				<DateTime />
			</div>
		</header>
	);
};

export default HeaderTraining;
