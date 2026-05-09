import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
	SWITCH_TRANSITION_DELAY_MS,
	finishTransition,
	startTransition,
	syncInputBreakerContactsFromScheme,
} from './inputBreakerSlice';
import {
	getInputBreakerFaultState,
	type InputBreakerMechanicalState,
	type InputBreakerTransitionStatus,
} from '@/features/scheme-simulation/model/engine/inputBreakerProjection';
import type { InitialStateScheme } from '@/shared/types/scheme';

interface InputBreakerListenerState {
	circuit: InitialStateScheme;
	inputBreaker: {
		pendingTarget: 'on' | 'off' | null;
	};
}

export const createInputBreakerListenerMiddleware = () => {
	const listenerMiddleware = createListenerMiddleware();

	listenerMiddleware.startListening({
		actionCreator: startTransition,
		effect: async (_action, listenerApi) => {
			listenerApi.cancelActiveListeners();
			await listenerApi.delay(SWITCH_TRANSITION_DELAY_MS);

			const state = listenerApi.getState() as InputBreakerListenerState;
			const faultState = getInputBreakerFaultState(state.circuit);
			const targetFromState = state.inputBreaker.pendingTarget;

			if (!targetFromState) {
				return;
			}

			const shouldFailAssemble =
				targetFromState === 'on' && faultState.hasFalseTrigger;

			const nextMechanicalState: InputBreakerMechanicalState = shouldFailAssemble
				? 'off'
				: targetFromState === 'on'
					? 'on'
					: 'off';
			const nextTransitionStatus: InputBreakerTransitionStatus =
				shouldFailAssemble
					? 'assemble_failed'
					: targetFromState === 'on'
						? 'assembled'
						: 'disassembled';

			listenerApi.dispatch(
				finishTransition({
					mechanicalState: nextMechanicalState,
					transitionStatus: nextTransitionStatus,
				}),
			);
			listenerApi.dispatch(syncInputBreakerContactsFromScheme() as never);
		},
	});

	return listenerMiddleware;
};
