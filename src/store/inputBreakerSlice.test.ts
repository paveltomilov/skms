import { configureStore } from '@reduxjs/toolkit';
import circuitReducer, { activateMalfunction } from './circuitSlice';
import inputBreakerReducer, {
	dispatchInputBreakerSwitchCommand,
	syncInputBreakerContactsFromScheme,
} from './inputBreakerSlice';
import { INPUT_CIRCUIT_BREAKER_ID } from '@/shared/configs/powerCircuit/constants';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';

describe('inputBreakerSlice false trigger behavior', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	});

	it('trips to off with assemble_failed on turn_on when false trigger is active', () => {
		const store = configureStore({
			reducer: {
				circuit: circuitReducer,
				inputBreaker: inputBreakerReducer,
			},
		});

		const phaseA = findElementByID(
			INPUT_CIRCUIT_BREAKER_ID[0],
			store.getState().circuit,
		);
		const falseTriggerMalfunctionId = phaseA.malfunctions[1].id;
		store.dispatch(activateMalfunction(falseTriggerMalfunctionId));

		store.dispatch(dispatchInputBreakerSwitchCommand('on'));
		jest.advanceTimersByTime(120);

		expect(store.getState().inputBreaker.mechanicalState).toBe('off');
		expect(store.getState().inputBreaker.transitionStatus).toBe(
			'assemble_failed',
		);
	});

	it('applies phase projection after false trip instead of forcing all phases open', () => {
		const store = configureStore({
			reducer: {
				circuit: circuitReducer,
				inputBreaker: inputBreakerReducer,
			},
		});

		const phaseA = findElementByID(
			INPUT_CIRCUIT_BREAKER_ID[0],
			store.getState().circuit,
		);
		const phaseB = findElementByID(
			INPUT_CIRCUIT_BREAKER_ID[1],
			store.getState().circuit,
		);

		store.dispatch(activateMalfunction(phaseA.malfunctions[1].id)); // ложное выбивание
		store.dispatch(activateMalfunction(phaseB.malfunctions[0].id)); // плохой контакт (залипание при off)

		store.dispatch(dispatchInputBreakerSwitchCommand('on'));
		jest.advanceTimersByTime(120);

		const state = store.getState();
		const phaseAState = findElementByID(INPUT_CIRCUIT_BREAKER_ID[0], state.circuit);
		const phaseBState = findElementByID(INPUT_CIRCUIT_BREAKER_ID[1], state.circuit);
		const phaseCState = findElementByID(INPUT_CIRCUIT_BREAKER_ID[2], state.circuit);

		expect(phaseAState.resistance).toBe(BASE_RESISTANCE_CONSTANT.highResistance);
		expect(phaseBState.resistance).toBe(
			BASE_RESISTANCE[INPUT_CIRCUIT_BREAKER_ID[1]],
		);
		expect(phaseCState.resistance).toBe(BASE_RESISTANCE_CONSTANT.highResistance);
	});

	it('forces initial on-state to off on sync when false trigger is active', () => {
		const store = configureStore({
			reducer: {
				circuit: circuitReducer,
				inputBreaker: inputBreakerReducer,
			},
		});

		const phaseA = findElementByID(
			INPUT_CIRCUIT_BREAKER_ID[0],
			store.getState().circuit,
		);
		store.dispatch(activateMalfunction(phaseA.malfunctions[1].id)); // ложно выбивает

		store.dispatch(syncInputBreakerContactsFromScheme());
		const state = store.getState();

		expect(state.inputBreaker.mechanicalState).toBe('off');
		expect(state.inputBreaker.transitionStatus).toBe('assemble_failed');

		const phaseAState = findElementByID(INPUT_CIRCUIT_BREAKER_ID[0], state.circuit);
		expect(phaseAState.resistance).toBe(BASE_RESISTANCE_CONSTANT.highResistance);
	});
});
