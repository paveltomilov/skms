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
		setStudentId: (state, {payload}: PayloadAction<number>) => {
			state.studentId = payload;
		},
		setCurrentStudent: (state, { payload }: PayloadAction<User>) => {
			state.currentStudent = payload;
		},
		clearCurrentStudent: state => {
			state.currentStudent = null;
		},
		setMalfunctionCurrent: (state, action: PayloadAction<string>) => {
			state.malfunctionCurrent = action.payload;
		},
	},
});

export const { setMalfunctionCurrent, setCurrentStudent, clearCurrentStudent, setStudentId } =
	trainingSlice.actions;

export default trainingSlice.reducer;
