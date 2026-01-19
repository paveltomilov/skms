import { getRandomNumber } from '@/shared/utils/getRandomNumber/getRandomNumber';
import { createSlice } from '@reduxjs/toolkit';

const updateListSlice = createSlice({
	name: 'update',
	initialState: 0 as number,

	reducers: {
		updateList: () => {
			return getRandomNumber(1, 1000);
		},
	},
});

export const { updateList } = updateListSlice.actions;

export default updateListSlice.reducer;
