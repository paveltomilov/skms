import { activateMalfunction } from '@/store/circuitSlice';
import { useAppDispatch, useAppSelector } from './store';
import { useEffect } from 'react';

export const useGateMalfunctions = () => {
	const dispatch = useAppDispatch();

	// получаем id активной задвижки из стора
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';

	// получаем неисправности задвижки из стора
	const gateMalfunctions = useAppSelector(
		state => state.gate.gates[gateId].malfunctions,
	);

	useEffect(() => {
		gateMalfunctions.forEach(id => dispatch(activateMalfunction(id)));
	}, [dispatch, gateMalfunctions]);
};
