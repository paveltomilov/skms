import {
	CONTROL_CIRCUIT_BREAKER_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
} from '@/shared/configs/controlCircuit/constants';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_CIRCUIT_BREAKER_ID,
} from '@/shared/configs/powerCircuit/constants';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import type { RootState } from '@/store/store';
import type { SwitchMode } from '@/shared/types/switch';

export const selectAutomaticPanelState = (state: RootState) => {
	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		state.circuit,
	);
	const resistancePhaseAInputBreaker = findElementByID(
		INPUT_BREAKER_CONTACT_PHASE_A_ID,
		state.circuit,
	).resistance;

	const inputCircuitBreakerElements = INPUT_CIRCUIT_BREAKER_ID.map(id =>
		findElementByID(id, state.circuit),
	);
	const isInputBreakerOff = inputCircuitBreakerElements.every(
		element => element.resistance === BASE_RESISTANCE_CONSTANT.highResistance,
	);

	const tumblerMode: SwitchMode =
		controlCircuitBreaker.resistance ===
			BASE_RESISTANCE_CONSTANT.highResistance ||
		resistancePhaseAInputBreaker === BASE_RESISTANCE_CONSTANT.highResistance
			? 'off'
			: 'on';
	const switcherMode: SwitchMode = isInputBreakerOff ? 'off' : 'on';

	return {
		switcherMode,
		tumblerMode,
		hasVoltageOnControlBreakerInput:
			state.points[CONTROL_BREAKER_INPUT_POINT_ID],
	};
};
