'use client';

import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { startSimulation } from '@/store/simulationSlice';
import { useToast } from '@/shared/hooks/useToast';
import Toast from '@/shared/UI/Toast';
import { openModal } from '@/store/modalSlice';
import { setActiveGate } from '@/store/gateSlice';
import { activateMalfunction } from '@/store/circuitSlice';
import { SIMULATION_MALFUNCTIONS } from '@/shared/configs/simulationMalfunctions';
import SimulationControl from '@/entities/SimulationControl';
import { toggleEmergency } from '@/store/emergencyStatusSlice';
import cn from 'classnames';
import { resetTimer, startTimer } from '@/store/timerSlice';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const { toasts, showToast, removeToast } = useToast();
	const emergencyStatus = useAppSelector(store => store.emergencyStatus);

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const handleStartSimulation = useCallback(() => {
		// Проверка: симуляция уже активна
		if (simulation.simulationId !== null) {
			showToast(
				'Симуляция уже активна. Завершите текущую перед началом новой.',
				'info',
			);
			return;
		}

		// Генерируем уникальный ID симуляции
		const simulationId = `${Date.now()}`;

		// Инициализируем симуляцию с неисправностями из константы
		dispatch(
			startSimulation({
				simulationId,
				originalMalfunctions: SIMULATION_MALFUNCTIONS.malfunctions,
			}),
		);

		// Устанавливаем активную задвижку из константы
		dispatch(setActiveGate(SIMULATION_MALFUNCTIONS.gateId));

		// Активируем неисправности в схеме
		SIMULATION_MALFUNCTIONS.malfunctions.forEach(malfunction => {
			dispatch(activateMalfunction(malfunction.id));
		});

		// Открываем попап с уведомлением о запуске симуляции
		dispatch(openModal('infoStartSimulation'));
		dispatch(resetTimer());
		dispatch(startTimer());
	}, [simulation, dispatch, showToast]);

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

						<Button
							width={90}
							height={34}
							aria-label="Начать симуляцию"
							text="Начать симуляцию"
							className={styles.buttonHigh}
							disabled={simulation.simulationId !== null}
							onClick={handleStartSimulation}
						/>
						<Button
							width={90}
							height={38}
							aria-label="Аварийный останов"
							text="Аварийный останов"
							className={cn(styles.buttonHigh, {
								[styles.buttonHigh__attention]: emergencyStatus,
							})}
							onClick={() => dispatch(toggleEmergency())}
						/>
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
				{toasts.map(toast => (
					<Toast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</div>
		</>
	);
};

export default Sidebar;
