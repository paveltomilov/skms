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
	},
});

export const { setVoltagePoints } = pointsSlice.actions;

export default pointsSlice.reducer;
