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
	const [A, B, C] = inputCircuitBreakerElements

	// проверяем сопротивление контактов автомата
	const isContactClose = 
			A.resistance === BASE_RESISTANCE_CONSTANT.BREAKER && 
			B.resistance === BASE_RESISTANCE_CONSTANT.BREAKER && 
			C.resistance === BASE_RESISTANCE_CONSTANT.BREAKER 

	// если все контакты разомкнут, то автомат выключен, иначе включен
	return isContactClose ? 'on' : 'off';
};
