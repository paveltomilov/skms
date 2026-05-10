import { useState, useRef, useEffect, useCallback } from 'react';
import { useUserCookies } from './useUserCookies';
import { useAppDispatch, useAppSelector } from './store';
import {
	deactivateSimulationMalfunction,
	markMalfunctionAsFound,
} from '@/store/simulationSlice';
import { closeModal, openModal } from '@/store/modalSlice';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { setGateMalfunctions } from '@/store/gateSlice';

const useDetectMalfunction = () => {
	const [selectedMalfunction, setSelectedMalfunction] = useState('');
	const selectedMalfunctionRef = useRef<string>(selectedMalfunction);

	const { role } = useUserCookies();
	const isStudent = role === 'student';

	const dispatch = useAppDispatch();

	const { originalMalfunctions, gate } = useAppSelector(state => state.simulation);
	const gateMalfunctions = useAppSelector(state =>
		gate ? state.gate.gates[gate]?.malfunctions ?? [] : [],
	);

	const isSelected = selectedMalfunction.length > 0;

	// Синхронизируем ref с состоянием после каждого ререндера
	useEffect(() => {
		selectedMalfunctionRef.current = selectedMalfunction;
	}, [selectedMalfunction]);

	const handleDetectMalfunction = useCallback((): void => {
		// Берём значение напрямую из ref — всегда актуальное
		const currentMalfunction = selectedMalfunctionRef.current;

		const isActiveMalfunction =
			originalMalfunctions.filter(
				item => item.id === currentMalfunction && item.active,
			).length > 0;

		if (isActiveMalfunction) {
			dispatch(deactivateMalfunction(currentMalfunction));
			dispatch(deactivateSimulationMalfunction(currentMalfunction));
			dispatch(markMalfunctionAsFound(currentMalfunction));

			if (gate) {
				dispatch(
					setGateMalfunctions({
						id: gate,
						malfunctions: gateMalfunctions.filter(
							malfunctionId => malfunctionId !== currentMalfunction,
						),
					}),
				);
			}

			dispatch(openModal('detectInfo'));
			dispatch(closeModal('setSimulation'));
		} else {
			dispatch(openModal('detectInfoError'));
		}
		setSelectedMalfunction('');
	}, [dispatch, gate, gateMalfunctions, originalMalfunctions]);

	const handleSelectMalfunction = useCallback((malfunctionId: string): void => {
		setSelectedMalfunction(malfunctionId);
	}, []);

	return {
		selectedMalfunction,
		isStudent,
		isSelected,
		handleSelectMalfunction,
		handleDetectMalfunction,
	};
};

export default useDetectMalfunction;
