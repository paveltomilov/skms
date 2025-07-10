'use client';

import React, {useState} from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import {openModal} from '@/store/modalSlice';
import {useAppSelector} from '@/shared/hooks/store';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import {useDispatch} from 'react-redux';

const Sidebar = () => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleSidebar = () => setIsOpen(!isOpen);
	const { activeModal } = useAppSelector(state => state.modal);
	const handleOpenDiagnosticPopup = () => {
		dispatch(openModal('diagnostic'));
	};

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
			</button>

			<div className={`${styles.sidebar} ${isOpen && styles.open}`}>
				<div className={styles.sidebarContent}>
					<Button
						id="main-button"
						width={90}
						height={34}
						aria-label="Главная"
						text="Главная"
						className={styles.buttonText}
					/>

					<Button
						id="scheme-button"
						width={90}
						height={34}
						aria-label="Схема"
						text="Схема"
						className={styles.buttonText}
					/>

					<Button
						id="training-button"
						width={90}
						height={34}
						aria-label="Обучение"
						text="Обучение"
						className={styles.buttonText}
					/>

					<Button
						id="simulation-button"
						width={90}
						height={34}
						aria-label="Тренажер"
						text="Тренажер"
						className={styles.buttonText}
						href="/"
					/>

					<Button
						id="ptk-button"
						width={90}
						height={34}
						aria-label="ПТК"
						text="ПТК"
						className={styles.buttonText}
						href="/ptk"
					/>
					<Button
						id="diagnostic-button"
						width={90}
						height={34}
						onClick={handleOpenDiagnosticPopup}
						aria-label="Диагностика"
						text="Диагностика"
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
			{activeModal === 'diagnostic' && (

					<PopupDiagnostic />

			)}
		</>
	);
};

export default Sidebar;
