import { useAppSelector } from './store';
import { shallowEqual } from 'react-redux';
import { findElementByID } from '../utils/findElementByID/scheme';
import { MALF_TPL_BREAKER } from '../configs/malfunctionTemplates';
import { INPUT_CIRCUIT_BREAKER_ID } from '../configs/powerCircuit/constants';

/**
 * Проверяет, активна ли неисправность «Ложно выбивает» хотя бы на одной фазе вводного автомата.
 */
export const useHasInputBreakerFalseTriggers = (): boolean => {
	const malfunctionFalseTriggers = MALF_TPL_BREAKER[1];

	const breakerContactsMalfunctions = useAppSelector(
		state =>
			INPUT_CIRCUIT_BREAKER_ID.map(
				id => findElementByID(id, state.circuit).malfunctions,
			),
		shallowEqual,
	);

	return breakerContactsMalfunctions.some(malfunctions =>
		malfunctions.some(
			mal =>
				mal.active &&
				(mal.name === malfunctionFalseTriggers.name ||
					mal.id.endsWith(malfunctionFalseTriggers.suffix)),
		),
	);
};
