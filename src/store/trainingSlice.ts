import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	isTraining: boolean;
	studentId: number;
	mulfuntionCurrent: string ;
}

const initialState: TrainingState = {
	isTraining: false,
	studentId: 0,
	mulfuntionCurrent: '',
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
		setStudentId: (state, action: PayloadAction<number>) => {
			state.studentId = action.payload;
		},
		setMulfuntionCurrent: (state, action: PayloadAction<string>) => {
			state.mulfuntionCurrent = action.payload;
		}
	},
});

export const {
	trainingOn,
	trainingOff,
	setStudentId,
	setMulfuntionCurrent,
} = trainingSlice.actions;

export default trainingSlice.reducer;