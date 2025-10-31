'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useAppDispatch } from '@/shared/hooks/store';
import { trainingOff, trainingOn } from '@/store/trainingSlice';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const dispatch = useAppDispatch();

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
			</button>

			<div className={`${styles.sidebar} ${isOpen && styles.open}`}>
				<div className={styles.sidebarContent}>
					<Button
						width={90}
						height={34}
						aria-label="Главная"
						text="Главная"
						className={styles.buttonText}
						href="/"
						onClick={()=>dispatch(trainingOff())}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Обучение"
						text="Обучение"
						className={styles.buttonText}
						href="/training"
						onClick={()=>dispatch(trainingOn())}
					/>

					<Button
						width={90}
						height={34}
						aria-label="ПТК"
						text="ПТК"
						className={styles.buttonText}
						href="/ptk"
						onClick={()=>dispatch(trainingOff())}
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
