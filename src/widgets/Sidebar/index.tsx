'use client';

import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { completeSimulation, startSimulation } from '@/store/simulationSlice';
import { useToast } from '@/shared/hooks/useToast';
import Toast from '@/shared/UI/Toast';
import { openModal } from '@/store/modalSlice';
import { setActiveGate } from '@/store/gateSlice';
import {
	activateMalfunction,
	deactivateMalfunction,
} from '@/store/circuitSlice';
import { SIMULATION_MALFUNCTIONS } from '@/shared/configs/simulationMalfunctions';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const { toasts, showToast, removeToast } = useToast();

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
		const simulationId = `sim-${Date.now()}`;

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
		dispatch(openModal('startSimulation'));
	}, [simulation, dispatch, showToast]);

	const handleFinishSimulation = useCallback(() => {
		// Валидация: проверяем наличие активной симуляции
		if (!simulation.simulationId) {
			showToast('Нет активной симуляции для завершения', 'error');
			return;
		}

		// Валидация: проверяем, что есть неисправности для поиска
		if (simulation.originalMalfunctions.length === 0) {
			showToast('В симуляции нет неисправностей для поиска', 'error');
			return;
		}

		// Проверяем, все ли неисправности найдены
		const originalMalfunctionIds = simulation.originalMalfunctions.map(
			m => m.id,
		);
		const allMalfunctionsFound = originalMalfunctionIds.every(id =>
			simulation.foundMalfunctionIds.includes(id),
		);

		if (!allMalfunctionsFound) {
			// Если не все неисправности найдены, показываем попап с предупреждением
			dispatch(openModal('notAllMalfunctionsFound'));
			return;
		}

		// Если все неисправности найдены, продолжаем с завершением симуляции
		// Сохраняем simulationId перед сбросом для редиректа
		const currentSimulationId = simulation.simulationId;

		// Автоматически деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Сбрасываем состояние симуляции (включая simulationId в null)
		dispatch(completeSimulation());

		// Показываем модальное окно завершения
		dispatch(openModal('simulationComplete'));

		// Сохраняем simulationId в sessionStorage для использования в модальном окне
		if (currentSimulationId) {
			sessionStorage.setItem(
				'completedSimulationId',
				currentSimulationId,
			);
		}
	}, [simulation, dispatch, showToast]);

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

					<Button
						width={90}
						height={34}
						aria-label="Начать симуляцию"
						text="Начать симуляцию"
						className={styles.buttonText}
						disabled={simulation.simulationId !== null}
						onClick={handleStartSimulation}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Завершить"
						text="Завершить"
						className={styles.buttonText}
						disabled={simulation.simulationId === null}
						onClick={handleFinishSimulation}
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
