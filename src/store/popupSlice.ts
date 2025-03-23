import { PopupContent } from '@/shared/types/popup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PopupState {
	isOpen: boolean;
	content: PopupContent | null;
}

const initialState: PopupState = {
	isOpen: false,
	content: null,
};

const sidebarSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		openPopup: (state, action: PayloadAction<PopupState>) => {
			state.isOpen = true;
			state.content = action.payload.content;
		},

		closePopup: state => {
			state.isOpen = false;
			state.content = null;
		},
	},
});

export const { openPopup, closePopup } = sidebarSlice.actions;

export default sidebarSlice.reducer;
