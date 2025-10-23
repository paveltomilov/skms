import { createSlice} from '@reduxjs/toolkit';

export interface TrainingState {
	isTraining: boolean;
}

const initialState: TrainingState = {
	isTraining: false,
};

const trainingSlice = createSlice({
	name: 'powerUnit',
	initialState,
	reducers: {
		trainingOn: state => {
			state.isTraining = true;
		},

		trainingOff: state => {
			state.isTraining = false;
		},
	},
});

export const { trainingOn, trainingOff } = trainingSlice.actions;

export default trainingSlice.reducer;