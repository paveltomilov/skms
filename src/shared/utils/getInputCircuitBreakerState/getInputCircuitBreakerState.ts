import { INPUT_CIRCUIT_BREAKER_ID } from '@/shared/configs/powerCircuit/constants';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { useAppSelector } from '@/shared/hooks/store';
import { findElementByID } from '../findElementByID/scheme';

// функция для получения состояния вводного автомата
export const getInputCircuitBreakerState = (): 'on' | 'off' => {
	// получаем из стора элементы (контакты), из которых состоит автомат
	const inputCircuitBreakerElements = INPUT_CIRCUIT_BREAKER_ID.map(id =>
		findElementByID(
			id,
			useAppSelector(state => state.circuit),
		),
	);

	// проверяем сопротивление контактов автомата
	const isContactOpen = inputCircuitBreakerElements.some(
		element =>
			element.resistance === BASE_RESISTANCE_CONSTANT.highResistance,
	);

	// если хотябы 1 контакт разомкнут, то автомат выключен, иначе включен
	return isContactOpen ? 'off' : 'on';
};
