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

export interface ModalState {
	automatic: boolean;
	gateControl: boolean;
	diagnostic: boolean;
	gateValves: boolean;
	lamps: boolean;
	block_switches: boolean;
	starter: boolean;
	motor: boolean;
	user_info: boolean;
	fusible_insert: boolean;
	starter_coil: boolean;
	blocking_activation: boolean;
	button: boolean;
	notification: boolean;
}

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
		closeAllModal(state) {
			Object.keys(state).forEach(key => {
				state[key as keyof ModalState] = false;
			});
		},
	},
});

export const { openModal, closeModal, closeAllModal } = modalSlice.actions;

export default modalSlice.reducer;
