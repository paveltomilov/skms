import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pointsState } from '@/shared/configs/scheme';

const pointsSlice = createSlice({
	name: 'points',
	initialState: pointsState,

	reducers: {
		setVoltagePoints: (
			state,
			action: PayloadAction<typeof pointsState>,
		) => {
			// Полностью заменяем состояние новым значением
			console.log(action.payload);
			return action.payload;
		},
	},
});

export const { setVoltagePoints } = pointsSlice.actions;

export default pointsSlice.reducer;
