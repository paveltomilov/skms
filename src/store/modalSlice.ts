import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Modals = 'automatic' | 'gateControl' | 'diagnostic' | 'gateValves' | 'test';

export interface ModalState {
	automatic: boolean;
	gateControl: boolean;
	diagnostic: boolean;
	gateValves: boolean;
	test: boolean;
}

const initialState: ModalState = {
	automatic: false,
	gateControl: false,
	diagnostic: false,
	gateValves: false,
	test: false,
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
			state.diagnostic = false;
			state.gateControl = false;
			state.gateValves = false;
			state.automatic = false;
			state.test = false;
		},
	},
});

export const { openModal, closeModal, closeAllModal } = modalSlice.actions;

export default modalSlice.reducer;
