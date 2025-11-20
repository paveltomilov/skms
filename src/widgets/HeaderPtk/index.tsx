'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Window from '@/shared/UI/Window';
import { useDate } from '@/shared/hooks/useDate';
import PowerUnit from '@/entities/PowerUnit';
import useShowModal from '@/shared/hooks/useShowModal';
import { useAppSelector } from '@/shared/hooks/store';
import { RootState } from '@/store/store';

const HeaderPtk: FC = () => {
	const handleModalNotification = useShowModal('notification');
	const { formattedDate, formattedTime, dateTimeDate, dateTimeTime } =
		useDate();
	const windows = useAppSelector((state: RootState) => state.windows);

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.windows}>
					<div className={styles.windows_ptk}>ПТК</div>
					<div className={styles.windows_defense}>Pабота защит</div>
					<div className={styles.windows_kpm}>КРМ</div>
				</div>
				<Window color="yellow" data={windows.w238} right />
				<div className={styles.buttons}>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Гл. меню"
						onClick={() => {
							console.log('Нажата кнопка Главное меню');
							handleModalNotification();
						}}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Сигналы"
						onClick={() => {
							console.log('Нажата кнопка Сигналы');
							handleModalNotification();
						}}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Графики"
						onClick={() => {
							console.log('Нажата кнопка Графики');
							handleModalNotification();
						}}
					/>
				</div>
				<Button
					className={styles.button}
					width={32}
					height={32}
					text="?"
					onClick={() => {
						console.log('Нажата кнопка ?');
						handleModalNotification();
					}}
				/>
				<div suppressHydrationWarning className={styles.datetime}>
					<time dateTime={dateTimeDate} suppressHydrationWarning>
						{formattedDate}
					</time>{' '}
					<time dateTime={dateTimeTime} suppressHydrationWarning>
						{formattedTime}
					</time>
				</div>
				<PowerUnit />
			</div>
		</header>
	);
};

export default HeaderPtk;
