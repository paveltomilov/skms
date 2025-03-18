'use client';

import React from 'react';
import styles from './styles.module.scss';
import { toggleSidebar } from '@/store/sidebarSlice';
import Button from '@c/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Arrow } from '@/shared/svg';

const Sidebar = () => {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen);

	const handleToggleSidebar = () => {
		dispatch(toggleSidebar());
	};

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Arrow className={styles.rotatedSvg} />
			</button>

			<div
				className={`${styles.sidebar} ${isSidebarOpen && styles.open}`}
			>
				<div className={styles.sidebarContent}>
					<Button
						id="main-button"
						width={90}
						height={34}
						onClick={() => {
							console.log('Кнопка Главная нажата');
						}}
						aria-label="Главная"
					>
						Главная
					</Button>

					<Button
						id="scheme-button"
						width={90}
						height={34}
						onClick={() => {
							console.log('Кнопка Схема нажата');
						}}
						aria-label="Схема"
					>
						Схема
					</Button>

					<Button
						id="training-button"
						width={90}
						height={34}
						onClick={() => {
							console.log('Кнопка Обучение нажата');
						}}
						aria-label="Обучение"
					>
						Обучение
					</Button>
				</div>

				<button
					onClick={handleToggleSidebar}
					className={`${styles.toggleButton} ${
						isSidebarOpen && styles.visible
					}`}
				>
					<div className={styles.toggleButtonInner}>
						<div className={styles.toggleButtonLeft}></div>
						<Arrow className={styles.toggleButtonIcon} />
						<div className={styles.toggleButtonRight}></div>
					</div>
				</button>
			</div>
		</>
	);
};

export default Sidebar;
