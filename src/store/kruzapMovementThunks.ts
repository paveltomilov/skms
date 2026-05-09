import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { setResistance } from './circuitSlice';
import { setGatePosition, setGateState } from './gateSlice';
import { dispatchInputBreakerSwitchCommand } from './inputBreakerSlice';
import type { RootState } from './store';
import { KRUZAP_BUTTONS_CONFIG } from '@/shared/configs/header';
import { LIMIT_SWITCH_CLOSE_ID, LIMIT_SWITCH_OPEN_ID } from '@/shared/configs/controlCircuit/constants';
import { PositionClose, PositionOpen } from '@/shared/configs/gate';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { TimeShutdownInputBreaker } from '@/shared/hooks/usePtkButtons';
import {
	createTickSnapshotFromPreset,
	dispatchSimulationCommand,
	gateControlPresets,
} from '@/features/scheme-simulation';

const timeStepIntervalGateMoving = 100;
const shutdownTicksThreshold =
	(TimeShutdownInputBreaker * 1000) / timeStepIntervalGateMoving;

let gateInterval: ReturnType<typeof setInterval> | null = null;
let timerTriggeringInputAutomaton = 0;

type TypeButtons = 'open' | 'close';

interface KruzapMovementPayload {
	gateId: string;
	hasMalfunctionStuckContactSwitchOpenElement: boolean;
	hasMalfunctionStuckContactSwitchCloseElement: boolean;
	forcedPosition?: number;
}

interface StartKruzapMovementPayload extends KruzapMovementPayload {
	button: TypeButtons;
}

type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const getGatePosition = (state: RootState, gateId: string): number =>
	state.gate.gates[gateId]?.position ?? PositionClose;

const applyLimitSwitchResistance = (
	dispatch: (action: unknown) => unknown,
	state: RootState,
	limitSwitchOpenResistance: number,
	limitSwitchCloseResistance: number,
) => {
	const limitSwitchOpenElement = findElementByID(LIMIT_SWITCH_OPEN_ID, state.circuit);
	const limitSwitchCloseElement = findElementByID(
		LIMIT_SWITCH_CLOSE_ID,
		state.circuit,
	);

	if (limitSwitchOpenElement.resistance !== limitSwitchOpenResistance) {
		dispatch(
			setResistance({
				id: LIMIT_SWITCH_OPEN_ID,
				value: limitSwitchOpenResistance,
			}),
		);
	}

	if (limitSwitchCloseElement.resistance !== limitSwitchCloseResistance) {
		dispatch(
			setResistance({
				id: LIMIT_SWITCH_CLOSE_ID,
				value: limitSwitchCloseResistance,
			}),
		);
	}
};

const clearKruzapInterval = () => {
	if (gateInterval) {
		clearInterval(gateInterval);
		gateInterval = null;
	}
};

const resetKruzapShutdownTimer = () => {
	timerTriggeringInputAutomaton = 0;
};

export const stopKruzapMovementThunk = (
	payload: KruzapMovementPayload,
): AppThunk => {
	return (dispatch, getState) => {
		resetKruzapShutdownTimer();
		KRUZAP_BUTTONS_CONFIG.stop.forEach(action => {
			dispatch(setResistance(action));
		});

		if (!gateInterval) {
			return;
		}

		clearKruzapInterval();

		const state = getState();
		const currentPosition =
			payload.forcedPosition ?? getGatePosition(state, payload.gateId);
		const stopResult = dispatchSimulationCommand({
			type: 'stop',
			payload: {
				snapshot: {
					currentPosition,
					positionOpen: gateControlPresets.kruzap.positionOpen,
					positionClose: gateControlPresets.kruzap.positionClose,
					defaultLimitSwitchResistance:
						gateControlPresets.kruzap.defaultLimitSwitchResistance,
					highResistance: gateControlPresets.kruzap.highResistance,
					hasMalfunctionStuckContactSwitchOpenElement:
						payload.hasMalfunctionStuckContactSwitchOpenElement,
					hasMalfunctionStuckContactSwitchCloseElement:
						payload.hasMalfunctionStuckContactSwitchCloseElement,
				},
			},
		});

		applyLimitSwitchResistance(
			dispatch,
			state,
			stopResult.limitSwitchOpenResistance,
			stopResult.limitSwitchCloseResistance,
		);

		dispatch(
			setGatePosition({
				id: payload.gateId,
				position: currentPosition,
			}),
		);
		dispatch(
			setGateState({
				id: payload.gateId,
				states: GATE_STATE_TYPE.intermediate,
			}),
		);
	};
};

export const startKruzapMovementThunk = (
	payload: StartKruzapMovementPayload,
): AppThunk => {
	return (dispatch, getState) => {
		resetKruzapShutdownTimer();
		KRUZAP_BUTTONS_CONFIG[payload.button].forEach(action => {
			dispatch(setResistance(action));
		});

		clearKruzapInterval();

		gateInterval = setInterval(() => {
			const state = getState();
			const currentPosition = getGatePosition(state, payload.gateId);
			const tickResult = dispatchSimulationCommand({
				type: 'tick',
				payload: {
					direction: payload.button,
					snapshot: createTickSnapshotFromPreset('kruzap', currentPosition, {
						hasMalfunctionStuckContactSwitchOpenElement:
							payload.hasMalfunctionStuckContactSwitchOpenElement,
						hasMalfunctionStuckContactSwitchCloseElement:
							payload.hasMalfunctionStuckContactSwitchCloseElement,
					}),
				},
			});

			dispatch(
				setGateState({
					id: payload.gateId,
					states: tickResult.gateState,
				}),
			);
			applyLimitSwitchResistance(
				dispatch,
				state,
				tickResult.limitSwitchOpenResistance,
				tickResult.limitSwitchCloseResistance,
			);

			let nextPosition = tickResult.nextPosition;
			if (tickResult.shouldTriggerInputBreakerShutdownTimer) {
				nextPosition =
					payload.button === 'open' ? PositionOpen : PositionClose;
				dispatch(
					setGatePosition({
						id: payload.gateId,
						position: nextPosition,
					}),
				);
				timerTriggeringInputAutomaton += 1;

				if (timerTriggeringInputAutomaton >= shutdownTicksThreshold) {
					dispatch(dispatchInputBreakerSwitchCommand('off'));
					dispatch(
						stopKruzapMovementThunk({
							gateId: payload.gateId,
							forcedPosition: nextPosition,
							hasMalfunctionStuckContactSwitchOpenElement:
								payload.hasMalfunctionStuckContactSwitchOpenElement,
							hasMalfunctionStuckContactSwitchCloseElement:
								payload.hasMalfunctionStuckContactSwitchCloseElement,
						}),
					);
				}
				return;
			}

			resetKruzapShutdownTimer();

			if (tickResult.shouldStop) {
				nextPosition =
					payload.button === 'open' ? PositionOpen : PositionClose;

				dispatch(
					stopKruzapMovementThunk({
						gateId: payload.gateId,
						forcedPosition: nextPosition,
						hasMalfunctionStuckContactSwitchOpenElement:
							payload.hasMalfunctionStuckContactSwitchOpenElement,
						hasMalfunctionStuckContactSwitchCloseElement:
							payload.hasMalfunctionStuckContactSwitchCloseElement,
					}),
				);
				dispatch(
					setGateState({
						id: payload.gateId,
						states:
							payload.button === 'open'
								? GATE_STATE_TYPE.open
								: GATE_STATE_TYPE.close,
					}),
				);

				KRUZAP_BUTTONS_CONFIG[
					payload.button === 'open' ? 'opening' : 'closing'
				].forEach(action => {
					if (
						action.id !== LIMIT_SWITCH_OPEN_ID &&
						action.id !== LIMIT_SWITCH_CLOSE_ID
					) {
						dispatch(setResistance(action));
					}
				});
			}

			dispatch(
				setGatePosition({
					id: payload.gateId,
					position: nextPosition,
				}),
			);
		}, timeStepIntervalGateMoving);
	};
};
