import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ButtonsState {
  activeButtons: Record<string, boolean>;
}

const initialState: ButtonsState = {
  activeButtons: {},
};

const buttonsSlice = createSlice({
  name: 'buttons',
  initialState,
  reducers: {
    buttonClicked: (state, action: PayloadAction<string>) => {
      const buttonId = action.payload;
      state.activeButtons[buttonId] = !state.activeButtons[buttonId];
    },
  },
});

export const { buttonClicked } = buttonsSlice.actions;
export default buttonsSlice.reducer;