'use client';

import React from 'react';
import styles from './styles.module.scss';
import { toggleSidebar } from '@/store/sidebarSlice';
import Button from '@/shared/UI/Button';
import { Arrow } from '@/shared/UI/svg';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';

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
						text="Главная"
						className={styles.buttonText}
					/>

					<Button
						id="scheme-button"
						width={90}
						height={34}
						onClick={() => {
							console.log('Кнопка Схема нажата');
						}}
						aria-label="Схема"
						text="Схема"
						className={styles.buttonText}
					/>

					<Button
						id="training-button"
						width={90}
						height={34}
						onClick={() => {
							console.log('Кнопка Обучение нажата');
						}}
						aria-label="Обучение"
						text="Обучение"
						className={styles.buttonText}
					/>
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
