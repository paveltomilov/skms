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
	| 'user_info'
	| 'fusible_insert'
	| 'starter_coil'
	| 'blocking_activation'
	| 'button'
	| 'notification';

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
	user_info: false,
	fusible_insert: false,
	starter_coil: false,
	blocking_activation: false,
	button: false,
	notification: false,
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
