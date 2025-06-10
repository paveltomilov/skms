import {
	HIGH_RESISTANCE,
	INPUT_CIRCUIT_BREAKER,
} from '@/shared/configs/scheme';
import { useAppSelector } from '@/shared/hooks/store';
import { findElementByID } from '../findElementByID/scheme';

// функция для получения состояния вводного автомата
export const getInputCircuitBreakerState = (): 'on' | 'off' => {
	// получаем из стора элементы (контакты), из которых состоит автомат
	const inputCircuitBreakerElements = INPUT_CIRCUIT_BREAKER.map(id =>
		findElementByID(
			id,
			useAppSelector(state => state.circuit),
		),
	);

	// проверяем сопротивление контактов автомата
	const isContactOpen = inputCircuitBreakerElements.some(
		element => element.resistance === HIGH_RESISTANCE,
	);

	// если хотябы 1 контакт разомкнут, то автомат выключен, иначе включен
	return isContactOpen ? 'off' : 'on';
};
