import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {
	'p.p.0.1': true,
	'p.p.0.2': true,
	'p.p.0.3': true,

	'p.p.1.1': true,
	'p.p.2.1': true,
	'p.p.3.1': true,

	'p.p.1.2': true,
	'p.p.2.2': true,
	'p.p.3.2': true,

	'p.p.1.3.1': true,
	'p.p.2.3.1': true,
	'p.p.3.3.1': true,
	'p.p.1.3.2': true,
	'p.p.2.3.2': true,
	'p.p.3.3.2': true,

	'p.p.4.1.1': false,
	'p.p.4.1.2': false,
	'p.p.4.1.3': false,
	'p.p.4.2.1': false,
	'p.p.4.2.2': false,
	'p.p.4.2.3': false,

	'p.p.1.5': false,
	'p.p.2.5': false,
	'p.p.3.5': false,

	'p.c.0': true,
	'p.c.1': true,
	'p.c.2': true,

	'p.с.3.1.1': true,
	'p.с.3.1.2': true,
	'p.с.3.1.3.2.1': false,
	'p.с.3.1.3.2.2': false,

	'p.с.3.2.1': true,
	'p.с.3.2.2': true,
	'p.с.3.2.3.2.1': false,
	'p.с.3.2.3.2.2': false,
};

const pointsSlice = createSlice({
	name: 'points',
	initialState,

	reducers: {
		setVoltage: (state, action: PayloadAction<string>) => {
			state[action.payload] = true;
		},

		unsetVoltage: (state, action: PayloadAction<string>) => {
			state[action.payload] = false;
		},
	},
});

export const { setVoltage, unsetVoltage } = pointsSlice.actions;

export default pointsSlice.reducer;
