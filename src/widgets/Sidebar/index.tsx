'use client';

import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import {
	completeSimulation,
	startSimulation,
	resetSimulation,
} from '@/store/simulationSlice';
import { useToast } from '@/shared/hooks/useToast';
import Toast from '@/shared/UI/Toast';
import { openModal } from '@/store/modalSlice';
import { setActiveGate } from '@/store/gateSlice';
import {
	activateMalfunction,
	deactivateMalfunction,
} from '@/store/circuitSlice';
import { SIMULATION_MALFUNCTIONS } from '@/shared/configs/simulationMalfunctions';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const circuit = useAppSelector(state => state.circuit);
	const { toasts, showToast, removeToast } = useToast();

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const handleStartSimulation = useCallback(() => {
		// Проверка: симуляция уже активна
		if (simulation.isInitialized && !simulation.isCompleted) {
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

	const handleLogCircuitState = useCallback(() => {
		// Проверяем активные неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				const malfunctionId = malfunction.id;
				const lastDotIndex = malfunctionId.lastIndexOf('.');
				if (lastDotIndex === -1) {
					console.error(
						`Неверный формат ID неисправности: "${malfunctionId}"`,
					);
					return;
				}

				const elementId = malfunctionId.substring(0, lastDotIndex);
				const suffix = malfunctionId.substring(lastDotIndex + 1);
				const malfunctionIndex = Number(suffix) - 1;

				try {
					// Используем findElementByID для поиска элемента
					const element = findElementByID(elementId, circuit);

					if (
						!element ||
						!Array.isArray(element.malfunctions) ||
						malfunctionIndex < 0 ||
						malfunctionIndex >= element.malfunctions.length
					) {
						console.error(
							`✗ Неисправность "${malfunctionId}" не найдена в элементе "${elementId}"`,
						);
					}
				} catch (error) {
					console.error(
						`✗ Ошибка при поиске элемента "${elementId}" для неисправности "${malfunctionId}":`,
						error,
					);
				}
			});
		}
	}, [circuit, simulation]);

	const handleStopSimulation = useCallback(() => {
		// Деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Сбрасываем состояние симуляции до дефолтного
		dispatch(resetSimulation());

		// Открываем попап об остановке симуляции
		dispatch(openModal('abortSimulation'));
	}, [simulation, dispatch]);

	const handleFinishSimulation = useCallback(() => {
		// // Проверка: симуляция инициализирована
		// if (!simulation.isInitialized) {
		// 	showToast('Симуляция не инициализирована', 'error');
		// 	return;
		// }

		// // Проверка: найден хотя бы один дефект
		// if (simulation.foundMalfunctionIds.length === 0) {
		// 	showToast('Необходимо найти хотя бы одну неисправность', 'error');
		// 	return;
		// }

		// // Проверка: найдены все неисправности
		// // Проверяем, что все ID из originalMalfunctions присутствуют в foundMalfunctionIds
		// const originalIds = simulation.originalMalfunctions.map(m => m.id);
		// const allMalfunctionsFound = originalIds.every(id =>
		// 	simulation.foundMalfunctionIds.includes(id),
		// );

		// if (allMalfunctionsFound) {
		// Успешный сценарий: все неисправности найдены
		dispatch(completeSimulation());

		// Автоматически деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Показываем модальное окно завершения
		dispatch(openModal('simulationComplete'));
		// Toast не показываем, так как показывается модальное окно
		// } else {
		// 	// Неполное решение: показываем toast и продолжаем симуляцию
		// 	showToast(
		// 		'Найдены не все неисправности. Продолжите поиск.',
		// 		'info',
		// 	);
		// 	// Разблокируем кнопку после небольшой задержки
		// 	setTimeout(() => {
		// 		setIsProcessing(false);
		// 	}, 1000);
		// }
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
						height={34}
						aria-label="Главная"
						text="Главная"
						className={styles.buttonText}
						href="/"
						onClick={() => dispatch(clearCurrentStudent())}
					/>

					{role != 'student' && (
						<Button
							width={90}
							height={34}
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
						height={34}
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
						disabled={
							simulation.isInitialized && !simulation.isCompleted
						}
						onClick={handleStartSimulation}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Остановить симуляцию"
						text="Остановить симуляцию"
						className={styles.buttonText}
						disabled={!simulation.isInitialized}
						onClick={handleStopSimulation}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Завершить"
						text="Завершить"
						className={styles.buttonText}
						disabled={
							!simulation.isInitialized || simulation.isCompleted
						}
						onClick={handleFinishSimulation}
					/>

					<Button
						width={90}
						height={34}
						aria-label="Лог схемы"
						text="Лог схемы"
						className={styles.buttonText}
						onClick={handleLogCircuitState}
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
