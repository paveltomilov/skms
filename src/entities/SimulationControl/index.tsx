import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import Timer from '../Timer';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { stopSimulation } from '@/shared/api';
import { resetSimulation, setCompletedSimulationId } from '@/store/simulationSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { setActiveGate } from '@/store/gateSlice';

const SimulationControl: FC<{ className?: string }> = ({ className }) => {
	const dispatch = useAppDispatch();
	const simulation = useAppSelector(state => state.simulation);

	const handleFinishSimulation = async () => {
		// Проверяем, все ли неисправности найдены
		const allMalfunctionsFound =
			simulation.originalMalfunctions.length > 0 &&
			simulation.originalMalfunctions.length ===
			simulation.foundMalfunctionIds.length;

		if (allMalfunctionsFound) {
			if (simulation.simulationId !== null) {
				try {
					await stopSimulation(simulation.simulationId);
				} catch {
					// Даже при ошибке запроса завершаем симуляцию на фронте
				}
			}

			const completedId = simulation.simulationId;

			if (simulation.originalMalfunctions.length > 0) {
				simulation.originalMalfunctions.forEach(malfunction => {
					dispatch(deactivateMalfunction(malfunction.id));
				});
			}

			dispatch(setActiveGate(null));
			dispatch(resetSimulation());
			if (completedId) {
				dispatch(setCompletedSimulationId(completedId));
			}

			// Открываем попап о завершении симуляции
			dispatch(openModal('simulationComplete'));
		} else {
			// Если не все неисправности найдены, показываем предупреждение
			dispatch(openModal('infoUnfinished'));
		}
	};

	const handleDetectMalfunction = () => {
		dispatch(openModal('setSimulation'));
	};

	return (
		<div className={cn(styles.control, className)}>
			<Button
				width={89}
				height={38}
				aria-label={'Определить неисправность'}
				text={'Определить неисправность'}
				className={styles.control__buttonFinish}
				onClick={handleDetectMalfunction}
			/>
			<Button
				width={89}
				height={38}
				aria-label={'Задвижка исправна'}
				text={'Задвижка исправна'}
				className={styles.control__buttonFinish}
				onClick={handleFinishSimulation}
			/>
			<Timer />
		</div>
	);
};

export default SimulationControl;
