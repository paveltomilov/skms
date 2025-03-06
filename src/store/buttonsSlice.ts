import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ButtonsState {
	activeButtons: Record<string, boolean>;
}

const initialState: ButtonsState = {
	activeButtons: { closeBtn: false, openBtn: false, stopBtn: false },
};

const buttonsSlice = createSlice({
	name: 'buttons',
	initialState,
	reducers: {
		buttonClicked: (state, action: PayloadAction<string>) => {
			const buttonId = action.payload;
			state.activeButtons[buttonId] = !state.activeButtons[buttonId];
		},

		disableButton: (state, action: PayloadAction<string>) => {
			const buttonId = action.payload;
			state.activeButtons[buttonId] = true;
		},

		enableButton: (state, action: PayloadAction<string>) => {
			const buttonId = action.payload;
			state.activeButtons[buttonId] = false;
		},
	},
});

export const { buttonClicked, disableButton, enableButton } =
	buttonsSlice.actions;
export default buttonsSlice.reducer;
