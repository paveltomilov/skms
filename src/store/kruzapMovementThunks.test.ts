import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import circuitReducer from './circuitSlice';
import inputBreakerReducer from './inputBreakerSlice';
import { setGatePosition } from './gateSlice';
import { createInputBreakerListenerMiddleware } from './inputBreakerListeners';
import {
	startKruzapMovementThunk,
	stopKruzapMovementThunk,
} from './kruzapMovementThunks';

describe('kruzapMovementThunks', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('updates position on hold and sets intermediate state on release', async () => {
		const inputBreakerListener = createInputBreakerListenerMiddleware();
		const store = configureStore({
			reducer: {
				gate: gateReducer,
				circuit: circuitReducer,
				inputBreaker: inputBreakerReducer,
			},
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware().prepend(inputBreakerListener.middleware),
		});

		const gateId = 'g1';
		const initialPosition = store.getState().gate.gates[gateId].position;

		store.dispatch(
			startKruzapMovementThunk({
				button: 'close',
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement: false,
				hasMalfunctionStuckContactSwitchCloseElement: false,
			}),
		);

		await jest.advanceTimersByTimeAsync(300);
		const positionAfterHold = store.getState().gate.gates[gateId].position;

		expect(positionAfterHold).toBeLessThan(initialPosition);

		store.dispatch(
			stopKruzapMovementThunk({
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement: false,
				hasMalfunctionStuckContactSwitchCloseElement: false,
			}),
		);

		expect(store.getState().gate.gates[gateId].states).toBe('intermediate');
	});

	it('resets shutdown timer on release and restarts it on next hold', async () => {
		const inputBreakerListener = createInputBreakerListenerMiddleware();
		const store = configureStore({
			reducer: {
				gate: gateReducer,
				circuit: circuitReducer,
				inputBreaker: inputBreakerReducer,
			},
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware().prepend(inputBreakerListener.middleware),
		});

		const gateId = 'g1';
		store.dispatch(setGatePosition({ id: gateId, position: 1 }));

		store.dispatch(
			startKruzapMovementThunk({
				button: 'close',
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement: false,
				hasMalfunctionStuckContactSwitchCloseElement: true,
			}),
		);
		await jest.advanceTimersByTimeAsync(500);
		store.dispatch(
			stopKruzapMovementThunk({
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement: false,
				hasMalfunctionStuckContactSwitchCloseElement: true,
			}),
		);
		expect(store.getState().inputBreaker.mechanicalState).toBe('on');

		store.dispatch(
			startKruzapMovementThunk({
				button: 'close',
				gateId,
				hasMalfunctionStuckContactSwitchOpenElement: false,
				hasMalfunctionStuckContactSwitchCloseElement: true,
			}),
		);
		await jest.advanceTimersByTimeAsync(600);
		expect(store.getState().inputBreaker.mechanicalState).toBe('on');

		await jest.advanceTimersByTimeAsync(700);
		expect(store.getState().inputBreaker.mechanicalState).toBe('off');
	});
});
