import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Modals =
	'automatic' |
	'gateControl' |
	'diagnostic' |
	'recoveryPassword'
	; // добавить названия модалок

export interface ModalState {
	automatic: boolean;
	gateControl: boolean;
	diagnostic: boolean;
	recoveryPassword: boolean;
}

const initialState: ModalState = {
	automatic: false,
	gateControl: false,
	diagnostic: false,
	recoveryPassword: false,
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
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
