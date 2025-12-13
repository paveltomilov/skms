import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closeModal, openModal } from '@/store/modalSlice';
import { resetSimulation } from '@/store/simulationSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { stopSimulation, getActiveSimulation } from '@/shared/api';
import { useToast } from '@/shared/hooks/useToast';

export const PopupAbortSimulationConfirm: FC = () => {
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const { showToast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const handleConfirm = async () => {
		setIsLoading(true);

		try {
			// Получаем ID активной симуляции с бэкенда
			const simulationId = await getActiveSimulation();

			// Если симуляция есть на бэкенде, останавливаем её
			if (simulationId !== null) {
				await stopSimulation(simulationId);
			}
			// Если симуляции нет на бэкенде (локальная симуляция),
			// просто продолжаем с очисткой локального состояния
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Не удалось прервать симуляцию';
			showToast(errorMessage, 'error');
			setIsLoading(false);
			return;
		}

		// Деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Сбрасываем состояние симуляции до дефолтного
		dispatch(resetSimulation());

		// Закрываем окно подтверждения
		dispatch(closeModal('abortSimulationConfirm'));

		// Открываем финальное окно
		dispatch(openModal('abortSimulation'));
		setIsLoading(false);
	};

	const handleCancel = () => {
		dispatch(closeModal('abortSimulationConfirm'));
	};

	return (
		<div className={styles.popup}>
			<div className={styles.wrapper}>
				<div className={styles.message}>
					Вы уверены, что хотите прервать попытку?
				</div>
				<div className={styles.buttons}>
					<Button
						width={276}
						height={55}
						text="Да, прервать"
						onClick={handleConfirm}
						className={styles.button}
						disabled={isLoading}
					/>
					<Button
						width={276}
						height={55}
						text="Отмена"
						onClick={handleCancel}
						className={styles.button}
						disabled={isLoading}
					/>
				</div>
			</div>
		</div>
	);
};
