'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import SimulationAttributes from '@/entities/SimulationAttributes';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
			</button>

			<div className={`${styles.sidebar} ${isOpen && styles.open}`}>
				<div className={styles.sidebarContent}>
					<Button
						width={90}
						height={24}
						aria-label="Главная"
						text="Главная"
						className={styles.buttonText}
						href="/"
						onClick={() => dispatch(clearCurrentStudent())}
					/>

					{role != 'student' && (
						<Button
							width={90}
							height={24}
							aria-label={
								isAdmin ? 'Список препод.' : 'Список студ.'
							}
							text={isAdmin ? 'Список препод.' : 'Список студ.'}
							className={styles.buttonText__list}
							href="/training"
							onClick={() => dispatch(clearCurrentStudent())}
						/>
					)}

					<Button
						width={90}
						height={24}
						aria-label="ПТК"
						text="ПТК"
						className={styles.buttonText}
						href="/ptk"
						onClick={() => dispatch(clearCurrentStudent())}
					/>
				</div>
				{role === 'student' && <SimulationAttributes />}
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
