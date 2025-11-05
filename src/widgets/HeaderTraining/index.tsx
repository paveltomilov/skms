'use client';

import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import useShowModal from '@/shared/hooks/useShowModal';
import { useDate } from '@/shared/hooks/useDate';

const HeaderTraining: FC = () => {
	const handleModalStudentCreate = useShowModal('studentCreate');
	const handleModalNotification = useShowModal('notification');

	const { formattedDate, formattedTime, dateTimeDate, dateTimeTime } =
		useDate();

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.buttons}>
					<Button
						className={styles.button}
						width={213}
						height={32}
						text="Создать ученика"
						onClick={() => {
							handleModalStudentCreate();
						}}
					/>
					<Button
						className={styles.button}
						width={163}
						height={32}
						text="Статистика"
						onClick={() => {
							handleModalNotification();
						}}
					/>
					<Button
						className={styles.button}
						width={32}
						height={32}
						text="?"
						onClick={() => {
							handleModalNotification();
						}}
					/>
				</div>
				<div suppressHydrationWarning className={styles.datetime}>
					<time dateTime={dateTimeDate} suppressHydrationWarning>
						{formattedDate}
					</time>{' '}
					<time dateTime={dateTimeTime} suppressHydrationWarning>
						{formattedTime}
					</time>
				</div>
			</div>
		</header>
	);
};

export default HeaderTraining;
