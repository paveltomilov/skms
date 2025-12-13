import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Modals =
	| 'automatic'
	| 'gateControl'
	| 'diagnostic'
	| 'gateValves'
	| 'lamps'
	| 'block_switches'
	| 'starter'
	| 'motor'
	| 'fusible_insert'
	| 'starter_coil'
	| 'blocking_activation'
	| 'button'
	| 'input_circuit_breaker'
	| 'clamp'
	| 'notification'
	| 'setSimulation'
	| 'studentStatistics'
	| 'studentCreate'
	| 'studentDelete'
	| 'note'
	| 'simulationComplete'
	| 'abortSimulation'
	| 'abortSimulationConfirm'
	| 'infoStartSimulation'
	| 'infoSimulationIsActive'
	| 'infoUnfinished'
	| 'notAllMalfunctionsFound';

export type ModalState = Record<Modals, boolean>;

const initialState: ModalState = {
	automatic: false,
	gateControl: false,
	diagnostic: false,
	gateValves: false,
	lamps: false,
	block_switches: false,
	starter: false,
	motor: false,
	fusible_insert: false,
	starter_coil: false,
	blocking_activation: false,
	button: false,
	input_circuit_breaker: false,
	clamp: false,
	notification: false,
	setSimulation: false,
	studentStatistics: false,
	studentCreate: false,
	studentDelete: false,
	abortSimulation: false,
	abortSimulationConfirm: false,
	note: false,
	simulationComplete: false,
	infoStartSimulation: false,
	infoSimulationIsActive: false,
	infoUnfinished: false,
	notAllMalfunctionsFound: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, { payload }: PayloadAction<Modals>) {
			state[payload] = true;
		},
		closeModal(state, { payload }: PayloadAction<Modals>) {
			state[payload] = false;
		},
		closeAllModal() {
			return initialState;
		},
	},
});

export const { openModal, closeModal, closeAllModal } = modalSlice.actions;

export default modalSlice.reducer;
