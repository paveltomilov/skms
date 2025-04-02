'use client';

import React from 'react';
import styles from './styles.module.scss';
import { toggleSidebar } from '@/store/sidebarSlice';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import Chevron from '@/shared/UI/icons/Chevron';

const Sidebar = () => {
	const dispatch = useAppDispatch();
	const isSidebarOpen = useAppSelector(state => state.sidebar.isOpen);

	const handleToggleSidebar = () => {
		dispatch(toggleSidebar());
	};

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
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
					className={styles.closeButton}
				>
					<Chevron
						transform="rotateLeft90"
						className={styles.toggleButtonIcon}
					/>
				</button>
			</div>
		</>
	);
};

export default Sidebar;
