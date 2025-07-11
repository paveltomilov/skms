import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Modals = 'automatic' | 'gateControl' | 'diagnostic'; // добавить названия модалок

export interface ModalState {
	activeModal: null | Modals;
}

const initialState: ModalState = {
	activeModal: null,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<Modals>) {
			state.activeModal = action.payload;
		},
		closeModal(state) {
			state.activeModal = null;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
