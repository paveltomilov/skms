import { User } from '@/shared/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	studentId: number | null;
	malfunctionCurrent: string;
	currentStudent: User | null;
}

const initialState: TrainingState = {
	studentId: null,
	malfunctionCurrent: '',
	currentStudent: null,
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
		setStudentId: (state, action: PayloadAction<number>) => {
			state.studentId = action.payload;
		},
		clearStudentId: state => {
			state.studentId = null;
		},
		setMalfunctionCurrent: (state, action: PayloadAction<string>) => {
			state.malfunctionCurrent = action.payload;
		},
	},
});

export const { setStudentId, clearStudentId, setMalfunctionCurrent, setCurrentStudent, clearCurrentStudent } =
	trainingSlice.actions;

export default trainingSlice.reducer;
