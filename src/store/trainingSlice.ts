import { User } from '@/shared/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	// isTraining: boolean;
	studentId: number | null;
	mulfuntionCurrent: string;
	currentStudent: User | null;
}

const initialState: TrainingState = {
	// isTraining: false,
	studentId: null,
	mulfuntionCurrent: '',
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
		setMulfuntionCurrent: (state, action: PayloadAction<string>) => {
			state.mulfuntionCurrent = action.payload;
		},
	},
});

export const { setStudentId, clearStudentId, setMulfuntionCurrent, setCurrentStudent, clearCurrentStudent } =
	trainingSlice.actions;

export default trainingSlice.reducer;
