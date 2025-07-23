import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TooltipState} from '@/shared/types/tooltip';

const initialState: TooltipState = {
	isOpen: false,
	positionX: 0,
	positionY: 0,
	direction: 'top',
	side: 'center',
	content: '',
};

const tooltipSlice = createSlice({
	name: 'tooltip',
	initialState,
	reducers: {
		openTooltip: (state, action: PayloadAction<TooltipState>) => {
			state.isOpen = true;
			state.positionX = action.payload.positionX;
			state.positionY = action.payload.positionY;
			state.direction = action.payload.direction;
			state.side = action.payload.side;
			state.content = action.payload.content;
		},

		closeTooltip: state => {
			state.isOpen = false;
			state.positionX = 0;
			state.positionY = 0;
			state.direction = 'top';
			state.side = 'center';
			state.content = '';
		},
	},
});

export const { openTooltip, closeTooltip } = tooltipSlice.actions;

export default tooltipSlice.reducer;
