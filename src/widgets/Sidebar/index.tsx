'use client';

import React, { useState, useCallback } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Chevron from '@/shared/UI/icons/Chevron';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { completeSimulation } from '@/store/simulationSlice';
import { useToast } from '@/shared/hooks/useToast';
import Toast from '@/shared/UI/Toast';
import { openModal } from '@/store/modalSlice';

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const { toasts, showToast, removeToast } = useToast();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleToggleSidebar = () => setIsOpen(!isOpen);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const handleFinishSimulation = useCallback(() => {
		// Проверка: симуляция инициализирована
		if (!simulation.isInitialized) {
			showToast('Симуляция не инициализирована', 'error');
			return;
		}

		// Проверка: найден хотя бы один дефект
		if (simulation.foundMalfunctionIds.length === 0) {
			showToast('Необходимо найти хотя бы одну неисправность', 'error');
			return;
		}

		// Блокируем кнопку после клика
		setIsProcessing(true);

		// Проверка: найдены все неисправности
		// Проверяем, что все ID из originalMalfunctions присутствуют в foundMalfunctionIds
		const originalIds = simulation.originalMalfunctions.map(m => m.id);
		const allMalfunctionsFound = originalIds.every(id =>
			simulation.foundMalfunctionIds.includes(id),
		);

		if (allMalfunctionsFound) {
			// Успешный сценарий: все неисправности найдены
			dispatch(completeSimulation());
			// Показываем модальное окно завершения
			dispatch(openModal('simulationComplete'));
			// Кнопка остается заблокированной после успешного завершения
			// Toast не показываем, так как показывается модальное окно
		} else {
			// Неполное решение: показываем toast и продолжаем симуляцию
			showToast(
				'Найдены не все неисправности. Продолжите поиск.',
				'info',
			);
			// Разблокируем кнопку после небольшой задержки
			setTimeout(() => {
				setIsProcessing(false);
			}, 1000);
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
					aria-label="Завершить"
					text="Завершить"
					className={styles.buttonText}
					disabled={isProcessing}
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
