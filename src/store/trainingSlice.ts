import { User } from '@/shared/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	malfunctionCurrent: string;
	currentStudent: User | null;
	studentId: number | null; 
}

const initialState: TrainingState = {
	malfunctionCurrent: '',
	currentStudent: null,
	studentId: null,
};

const trainingSlice = createSlice({
	name: 'training',
	initialState,
	reducers: {
		setCurrentStudent: (state, { payload }: PayloadAction<User>) => {
			state.currentStudent = payload;
		},
		clearCurrentStudent: state => {
			state.currentStudent = null;
		},
		setMalfunctionCurrent: (state, action: PayloadAction<string>) => {
			state.malfunctionCurrent = action.payload;
		},
		setStudentId: (state, action: PayloadAction<number>) => {
			state.studentId = action.payload;
		},
		clearStudentId: state => {
			state.studentId = null;
		},
	},
});

export const {
	setMalfunctionCurrent,
	setCurrentStudent,
	clearCurrentStudent,
	setStudentId,
	clearStudentId,
} = trainingSlice.actions;

export default trainingSlice.reducer;
