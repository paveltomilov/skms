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
	const [A, B, C] = inputCircuitBreakerElements;

	// проверяем сопротивление контактов автомата
	const isContactOpen =
		A.resistance === BASE_RESISTANCE_CONSTANT.highResistance &&
		B.resistance === BASE_RESISTANCE_CONSTANT.highResistance &&
		C.resistance === BASE_RESISTANCE_CONSTANT.highResistance;

	// если все контакты разомкнут, то автомат выключен, иначе включен
	return isContactOpen ? 'off' : 'on';
};
