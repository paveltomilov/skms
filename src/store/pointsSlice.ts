import { pointsState } from '@/shared/configs/points';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pointsSlice = createSlice({
	name: 'points',
	initialState: pointsState,

	reducers: {
		setVoltagePoints: (
			state,
			action: PayloadAction<typeof pointsState>,
		) => {
			// Полностью заменяем состояние новым значением
			return action.payload;
		},
		togglePointState: (
			state,
			{ payload }: PayloadAction<keyof typeof pointsState>,
		) => {
			state[payload] = !state[payload];
		},
	},
});

export const { setVoltagePoints, togglePointState } = pointsSlice.actions;

export default pointsSlice.reducer;
