'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import PowerUnit from '@/entities/PowerUnit';
import useShowModal from '@/shared/hooks/useShowModal';
import DateTime from '@/entities/DateTime/DateTime';
import WindowWrapper from '@/entities/WindowWrapper';

const HeaderPtk: FC = () => {
	const handleModalNotification = useShowModal('notification');

	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.windows}>
					<div className={styles.windows_ptk}>ПТК</div>
					<div className={styles.windows_defense}>Pабота защит</div>
					<div className={styles.windows_kpm}>КРМ</div>
				</div>
				<WindowWrapper windowKey='w238' />
				<div className={styles.buttons}>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Гл. меню"
						onClick={() => {
							handleModalNotification();
						}}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Сигналы"
						onClick={() => {
							handleModalNotification();
						}}
					/>
					<Button
						className={styles.button}
						width={140}
						height={32}
						text="Графики"
						onClick={() => {
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
						handleModalNotification();
					}}
				/>
				<DateTime />
				<PowerUnit />
			</div>
		</header>
	);
};

export default HeaderPtk;
