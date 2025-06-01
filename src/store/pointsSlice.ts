import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pointsState } from '@/shared/configs/scheme';

const pointsSlice = createSlice({
	name: 'points',
	initialState: pointsState,

	reducers: {
		setVoltagePoints: (state, action: PayloadAction<string>) => {
			state[action.payload] = false;
		},
	},
});

export const { setVoltagePoints } = pointsSlice.actions;

export default pointsSlice.reducer;
