import {
	createSlice,
	type PayloadAction,
	type ThunkAction,
	type Action,
} from '@reduxjs/toolkit';
import { setResistance } from './circuitSlice';
import type { RootState } from './store';
import {
	getInputBreakerFaultState,
	projectInputBreakerContacts,
	shouldFalseTrip,
	type InputBreakerMechanicalState,
	type InputBreakerTransitionStatus,
} from '@/features/scheme-simulation/model/engine/inputBreakerProjection';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';

export interface InputBreakerState {
	mechanicalState: InputBreakerMechanicalState;
	transitionStatus: InputBreakerTransitionStatus;
	pendingTarget: 'on' | 'off' | null;
}

export const SWITCH_TRANSITION_DELAY_MS = 100;

const initialState: InputBreakerState = {
	mechanicalState: 'on',
	transitionStatus: 'idle',
	pendingTarget: null,
};

const inputBreakerSlice = createSlice({
	name: 'inputBreaker',
	initialState,
	reducers: {
		startTransition(
			state,
			action: PayloadAction<{ target: 'on' | 'off' }>,
		) {
			state.mechanicalState =
				action.payload.target === 'on' ? 'turning_on' : 'turning_off';
			state.transitionStatus = 'idle';
			state.pendingTarget = action.payload.target;
		},
		finishTransition(
			state,
			action: PayloadAction<{
				mechanicalState: InputBreakerMechanicalState;
				transitionStatus: InputBreakerTransitionStatus;
			}>,
		) {
			state.mechanicalState = action.payload.mechanicalState;
			state.transitionStatus = action.payload.transitionStatus;
			state.pendingTarget = null;
		},
	},
});

export const { startTransition, finishTransition } = inputBreakerSlice.actions;

export const syncInputBreakerContactsFromScheme = (): AppThunk => {
	return (dispatch, getState) => {
		const state = getState();
		const faultState = getInputBreakerFaultState(state.circuit);
		const shouldFalseTripOnSync = shouldFalseTrip(
			state.inputBreaker.mechanicalState,
			faultState,
		);
		const mechanicalStateForProjection: InputBreakerMechanicalState =
			shouldFalseTripOnSync ? 'off' : state.inputBreaker.mechanicalState;

		if (shouldFalseTripOnSync) {
			dispatch(
				finishTransition({
					mechanicalState: 'off',
					transitionStatus: 'assemble_failed',
				}),
			);
		}

		const projectedResistances = projectInputBreakerContacts(
			mechanicalStateForProjection,
			faultState,
		);

		for (const [phaseId, resistance] of Object.entries(projectedResistances)) {
			const currentResistance = findElementByID(phaseId, state.circuit).resistance;
			if (currentResistance !== resistance) {
				dispatch(setResistance({ id: phaseId, value: resistance }));
			}
		}
	};
};

export const dispatchInputBreakerSwitchCommand = (
	target: 'on' | 'off',
): AppThunk => {
	return dispatch => {
		dispatch(startTransition({ target }));
	};
};

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default inputBreakerSlice.reducer;
