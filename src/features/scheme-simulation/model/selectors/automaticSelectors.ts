import {
	CONTROL_CIRCUIT_BREAKER_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
} from '@/shared/configs/controlCircuit/constants';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import type { RootState } from '@/store/store';
import type { SwitchMode } from '@/shared/types/switch';

export const selectAutomaticPanelState = (state: RootState) => {
	const controlCircuitBreaker = findElementByID(
		CONTROL_CIRCUIT_BREAKER_ID,
		state.circuit,
	);

	const tumblerMode: SwitchMode =
		controlCircuitBreaker.resistance ===
		BASE_RESISTANCE_CONSTANT.highResistance
			? 'off'
			: 'on';
	const switcherMode: SwitchMode =
		state.inputBreaker.mechanicalState === 'off'
			? 'off'
			: 'on';

	return {
		switcherMode,
		tumblerMode,
		inputBreakerTransitionStatus: state.inputBreaker.transitionStatus,
		inputBreakerMechanicalState: state.inputBreaker.mechanicalState,
		hasVoltageOnControlBreakerInput:
			state.points[CONTROL_BREAKER_INPUT_POINT_ID],
	};
};
