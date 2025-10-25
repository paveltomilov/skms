import { KeyWindows, WINDOWS, WindowsState } from '@/shared/configs/window';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const windowsSlice = createSlice({
	name: 'windows',
	initialState: WINDOWS as WindowsState,

	reducers: {
		setValueById: (
			state: WindowsState,
			{
				payload,
			}: PayloadAction<{ id: KeyWindows; value: number | null }>,
		) => {
			state[payload.id].currentValue = payload.value;
		},
		setValueAll: (
			_,
			{ payload }: PayloadAction<WindowsState>,
		) => {
			return payload;
		},
	},
});

export const { setValueById, setValueAll } = windowsSlice.actions;

export default windowsSlice.reducer;
