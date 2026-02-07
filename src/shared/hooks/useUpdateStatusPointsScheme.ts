import { useAppDispatch, useAppSelector } from './store';
import { setNewVoltagePoints } from '../utils/setPointsVoltage/setPointsVoltage';
import { setVoltagePoints } from '@/store/pointsSlice';

const useUpdateStatusPointsScheme = () => {
	const dispatch = useAppDispatch();
	const currentScheme = useAppSelector(state => state.circuit);
	const currentPoints = useAppSelector(state => state.points);

	// Создаём стабильную функцию, которая всегда видит актуальное состояние
	const updatePointsScheme = () => {
		const updatedPoints = setNewVoltagePoints(currentScheme, currentPoints);
		dispatch(setVoltagePoints(updatedPoints));
	};

	return { updatePointsScheme };
};

export default useUpdateStatusPointsScheme;
