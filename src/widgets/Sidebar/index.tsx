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
import { activateMalfunction } from '@/store/circuitSlice';
import { SIMULATION_MALFUNCTIONS } from '@/shared/configs/simulationMalfunctions';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const circuit = useAppSelector(state => state.circuit);
	const { toasts, showToast, removeToast } = useToast();
	const [isProcessing, setIsProcessing] = useState(false);

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
		console.info(
			'Активация неисправностей из SIMULATION_MALFUNCTIONS:',
			SIMULATION_MALFUNCTIONS.malfunctions,
		);
		SIMULATION_MALFUNCTIONS.malfunctions.forEach(malfunction => {
			console.info(`Диспатч активации неисправности: ${malfunction.id}`);
			dispatch(activateMalfunction(malfunction.id));
		});

		// Открываем попап с уведомлением о запуске симуляции
		dispatch(openModal('startSimulation'));
	}, [simulation, dispatch]);

	const handleLogCircuitState = useCallback(() => {
		console.info('=== Состояние схемы ===');
		console.info('Power Circuit:', circuit.powerCircuit);
		console.info('Control Circuit:', circuit.controlCircuit);

		// Проверяем активные неисправности из симуляции
		console.info('=== Проверка неисправностей из симуляции ===');
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
						element &&
						Array.isArray(element.malfunctions) &&
						malfunctionIndex >= 0 &&
						malfunctionIndex < element.malfunctions.length
					) {
						const schemeMalfunction =
							element.malfunctions[malfunctionIndex];
						console.info(
							`${
								schemeMalfunction.active ? '✓' : '✗'
							} Неисправность "${malfunctionId}" (${
								malfunction.name
							}):`,
							{
								elementId,
								malfunctionIndex: malfunctionIndex + 1,
								active: schemeMalfunction.active,
								elementName: element.name,
							},
						);
					} else {
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
		} else {
			console.info('Нет неисправностей в симуляции');
		}

		console.info('=== Состояние симуляции ===');
		console.info('Simulation ID:', simulation.simulationId);
		console.info('Original Malfunctions:', simulation.originalMalfunctions);
		console.info('Found Malfunction IDs:', simulation.foundMalfunctionIds);
		console.info('Is Completed:', simulation.isCompleted);
		console.info('Is Initialized:', simulation.isInitialized);
	}, [circuit, simulation]);

	const handleStopSimulation = useCallback(() => {
		// Открываем попап об остановке симуляции
		dispatch(openModal('abortSimulation'));
	}, [dispatch]);

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

		// Блокируем кнопку после клика
		setIsProcessing(true);

		// // Проверка: найдены все неисправности
		// // Проверяем, что все ID из originalMalfunctions присутствуют в foundMalfunctionIds
		// const originalIds = simulation.originalMalfunctions.map(m => m.id);
		// const allMalfunctionsFound = originalIds.every(id =>
		// 	simulation.foundMalfunctionIds.includes(id),
		// );

		// if (allMalfunctionsFound) {
		// Успешный сценарий: все неисправности найдены
		dispatch(completeSimulation());
		// Показываем модальное окно завершения
		dispatch(openModal('simulationComplete'));
		// Кнопка остается заблокированной после успешного завершения
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
						disabled={isProcessing}
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
