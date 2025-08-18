import { createSlice} from '@reduxjs/toolkit';

export interface PowerUnitState {
	isWork: boolean;
}

const initialState: PowerUnitState = {
	isWork: true,
};

const powerUnitSlice = createSlice({
	name: 'powerUnit',
	initialState,
	reducers: {
		powerOn: state => {
			state.isWork = true;
		},

		powerOff: state => {
			state.isWork = false;
		},
	},
});

export const { powerOn, powerOff } = powerUnitSlice.actions;

export default powerUnitSlice.reducer;