import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import Button from '@/shared/UI/Button';
import { openModal } from '@/store/modalSlice';
import Timer from '../Timer';
import { useAppSelector } from '@/shared/hooks/store';

const SimulationControl: FC<{ className?: string }> = ({ className }) => {
	const dispatch = useDispatch();
	const simulation = useAppSelector(state => state.simulation);

	const handleFinishSimulation = () => {
		// Проверяем, все ли неисправности найдены
		const allMalfunctionsFound =
			simulation.originalMalfunctions.length > 0 &&
			simulation.originalMalfunctions.length ===
				simulation.foundMalfunctionIds.length;

		if (allMalfunctionsFound) {
			// Если все неисправности найдены, сохраняем simulationId в sessionStorage
			// для использования в PopupSimulationComplete
			if (simulation.simulationId) {
				sessionStorage.setItem(
					'completedSimulationId',
					String(simulation.simulationId),
				);
			}
			// Открываем попап о завершении симуляции
			dispatch(openModal('simulationComplete'));
		} else {
			// Если не все неисправности найдены, показываем предупреждение
			dispatch(openModal('infoUnfinished'));
		}
	};

	return (
		<div className={cn(styles.control, className)}>
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
