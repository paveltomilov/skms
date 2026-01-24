'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import SimulationControl from '@/entities/SimulationControl';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { markMalfunctionAsFound } from '@/store/simulationSlice';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const originalMalfunctions = useAppSelector(
		state => state.simulation.originalMalfunctions,
	);

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';
	const handleSimulateAllFound = () => {
		// Сбрасываем активные неисправности и сопротивления в исходное состояние
		originalMalfunctions.forEach(malfunction => {
			dispatch(deactivateMalfunction(malfunction.id));
		});
		originalMalfunctions.forEach(malfunction => {
			dispatch(markMalfunctionAsFound(malfunction.id));
		});
	};

	return (
		<>
			<button onClick={handleToggleSidebar} className={styles.openButton}>
				<Chevron transform="rotate90" />
			</button>

			<div className={`${styles.sidebar} ${isOpen && styles.open}`}>
				<div className={styles.sidebarContent}>
					<div className={styles.sidebarButtons}>
						<Button
							width={90}
							height={24}
							aria-label="Главная"
							text="Главная"
							className={styles.buttonText}
							href="/"
							onClick={() => dispatch(clearCurrentStudent())}
						/>

						<Button
							width={90}
							height={24}
							aria-label="ПТК"
							text="ПТК"
							className={styles.buttonText}
							href="/ptk"
							onClick={() => dispatch(clearCurrentStudent())}
						/>
						<Button
							width={90}
							height={24}
							aria-label="Имитация: все неисправности найдены"
							text="Все неиспр."
							className={styles.buttonText}
							onClick={handleSimulateAllFound}
						/>
						{role != 'student' && (
							<Button
								width={90}
								height={24}
								aria-label={
									isAdmin ? 'Список препод.' : 'Список студ.'
								}
								text={
									isAdmin ? 'Список препод.' : 'Список студ.'
								}
								className={styles.buttonText__list}
								href="/training"
								onClick={() => dispatch(clearCurrentStudent())}
							/>
						)}
					</div>
					{role === 'student' && <SimulationControl />}
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
