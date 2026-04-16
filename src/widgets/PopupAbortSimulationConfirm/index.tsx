import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closeModal, openModal } from '@/store/modalSlice';
import { resetSimulation, setManualAbort } from '@/store/simulationSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { setActiveGate, setGateMalfunctions } from '@/store/gateSlice';
import { stopSimulation } from '@/shared/api';

export const PopupAbortSimulationConfirm: FC = () => {
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);
	const [isLoading, setIsLoading] = useState(false);

	const handleConfirm = async () => {
		setIsLoading(true);

		dispatch(setManualAbort(true));

		try {
			// Отправляем запрос на бэкенд для прерывания симуляции
			if (simulation.simulationId !== null) {
				console.log('simulation.simulationId', simulation.simulationId);
				await stopSimulation(simulation.simulationId);
			}

			// Деактивируем все неисправности из симуляции
			if (simulation.originalMalfunctions.length > 0) {
				simulation.originalMalfunctions.forEach(malfunction => {
					dispatch(deactivateMalfunction(malfunction.id));
				});
			}

			if (simulation.gate) {
				dispatch(
					setGateMalfunctions({
						id: simulation.gate,
						malfunctions: [],
					}),
				);
			}

			// Сбрасываем активную задвижку
			dispatch(setActiveGate(null));

			// Сбрасываем состояние симуляции до дефолтного
			// Используем resetSimulation(), который возвращает initialState
			// Это должно установить simulationId в null, что разблокирует кнопку "Начать симуляцию"
			dispatch(resetSimulation());

			// Очищаем sessionStorage для попапа о начале симуляции
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem('shownStartSimulationId');
				sessionStorage.removeItem('shownStartSimulationWithoutId');
			}

			// Закрываем окно подтверждения
			dispatch(closeModal('abortSimulationConfirm'));

			// Открываем финальное окно с сообщением о негативном результате
			dispatch(openModal('abortSimulation'));
		} catch (error) {
			console.error('Ошибка при прерывании симуляции:', error);
			// В случае ошибки все равно продолжаем процесс прерывания на клиенте
			// Деактивируем все неисправности из симуляции
			if (simulation.originalMalfunctions.length > 0) {
				simulation.originalMalfunctions.forEach(malfunction => {
					dispatch(deactivateMalfunction(malfunction.id));
				});
			}

			// Сбрасываем активную задвижку
			dispatch(setActiveGate(null));

			// Сбрасываем состояние симуляции
			dispatch(resetSimulation());

			// Очищаем sessionStorage
			if (typeof window !== 'undefined') {
				sessionStorage.removeItem('shownStartSimulationId');
				sessionStorage.removeItem('shownStartSimulationWithoutId');
			}

			// Закрываем окно подтверждения
			dispatch(closeModal('abortSimulationConfirm'));

			// Открываем финальное окно
			dispatch(openModal('abortSimulation'));
		} finally {
			setIsLoading(false);
		}
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
