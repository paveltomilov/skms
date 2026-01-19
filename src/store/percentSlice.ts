import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const percentSlice = createSlice({
	name: 'percent',
	initialState: 100 as number,

	reducers: {
		setPercent: (state, { payload }: PayloadAction<number>) => payload,
	},
});

export const { setPercent } = percentSlice.actions;

export default percentSlice.reducer;
