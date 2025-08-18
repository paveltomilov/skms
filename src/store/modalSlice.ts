import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Modals = 'automatic' | 'gateControl' | 'diagnostic' | 'gateValves'; // добавить названия модалок

export interface ModalState {
	automatic: boolean;
	gateControl: boolean;
	diagnostic: boolean;
	gateValves: boolean;
}

const initialState: ModalState = {
	automatic: false,
	gateControl: false,
	diagnostic: false,
	gateValves: false,
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
		},
	},
});

export const { openModal, closeModal, closeAllModal } = modalSlice.actions;

export default modalSlice.reducer;
