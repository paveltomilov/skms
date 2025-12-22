import { createSlice } from '@reduxjs/toolkit';

const emergencyStatusSlice = createSlice({
	name: 'emergencyStatus',
	initialState: false as boolean,

	reducers: {
		toggleEmergency: (state) => !state,
	},
});

export const { toggleEmergency } = emergencyStatusSlice.actions;

export default emergencyStatusSlice.reducer;
