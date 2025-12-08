import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { closeModal, openModal } from '@/store/modalSlice';
import { resetSimulation } from '@/store/simulationSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';

export const PopupAbortSimulationConfirm: FC = () => {
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);

	const handleConfirm = () => {
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
					/>
					<Button
						width={276}
						height={55}
						text="Отмена"
						onClick={handleCancel}
						className={styles.button}
					/>
				</div>
			</div>
		</div>
	);
};
