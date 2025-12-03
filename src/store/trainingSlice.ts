import { User } from '@/shared/types/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
	studentId: number | null;
	malfunctionCurrent: string;
	currentStudent: User | null;
}

const initialState: TrainingState = {
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
		setMalfunctionCurrent: (state, action: PayloadAction<string>) => {
			state.malfunctionCurrent = action.payload;
		},
	},
});

export const { setMalfunctionCurrent, setCurrentStudent, clearCurrentStudent } =
	trainingSlice.actions;

export default trainingSlice.reducer;
