import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	studentId: number | null;
	mulfuntionCurrent: string ;
}

const initialState: TrainingState = {
	studentId: null,
	mulfuntionCurrent: '',
};

const trainingSlice = createSlice({
	name: 'training',
	initialState,
	reducers: {
		setStudentId: (state, action: PayloadAction<number>) => {
			state.studentId = action.payload;
		},
		clearStudentId: (state) => {
			state.studentId = null;
		},
		setMulfuntionCurrent: (state, action: PayloadAction<string>) => {
			state.mulfuntionCurrent = action.payload;
		}
	},
});

export const {
	setStudentId,
	clearStudentId,
	setMulfuntionCurrent,
} = trainingSlice.actions;

export default trainingSlice.reducer;