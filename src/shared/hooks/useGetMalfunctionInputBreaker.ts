import { useEffect, useMemo, useState } from 'react';
import { INPUT_CIRCUIT_BREAKER_ID } from '../configs/powerCircuit/constants';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppSelector } from './store';

export const useGetMalfunctionInputBreaker = () => {
	const [isActiveMalfunctionNoVoltage, setIsActiveMalfunctionNoVoltage] =
		useState<boolean>(false);
	const state = useAppSelector(state => state.circuit);
	const MALFUNCTION_NO_COMMUTATION =
		'Собирается механически, но нет коммутации';

	// получаем из стора элементы (контакты), из которых состоит автомат
	const inputCircuitBreakerElements = useMemo(
		() => INPUT_CIRCUIT_BREAKER_ID.map(id => findElementByID(id, state)),
		[state],
	);

	// проверяем контакты вводного автоматичекого выключателя на наличие несисправностей "Собирается механически, но нет коммутации"
	useEffect(() => {
		setIsActiveMalfunctionNoVoltage(
			inputCircuitBreakerElements.some(contact =>
				contact.malfunctions.some(
					mal =>
						mal.name === MALFUNCTION_NO_COMMUTATION && mal.active,
				),
			),
		);
	}, [inputCircuitBreakerElements]);

	return {
		isActiveMalfunctionNoVoltage,
	};
};
