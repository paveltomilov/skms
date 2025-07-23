import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import popupReducer from './popupSlice';
import modalReducer from './modalSlice';
import multimeterReducer from './multimeterSlice';
import circuitReducer from './circuitSlice';
import pointsReducer from './pointsSlice';
import tooltipReduser from './tooltipSlice';

export const store = () => {
	return configureStore({
		reducer: {
			gate: gateReducer,
			popup: popupReducer,
			modal: modalReducer,
			tooltip: tooltipReduser,
			multimeter: multimeterReducer,
			circuit: circuitReducer,
			points: pointsReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
