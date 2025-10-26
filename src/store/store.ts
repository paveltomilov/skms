import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import modalReducer from './modalSlice';
import multimeterReducer from './multimeterSlice';
import circuitReducer from './circuitSlice';
import pointsReducer from './pointsSlice';
import powerUnitReducer from './powerUnitSlice';
import windowsReducer from './windowsSlice';
import percentReducer from './percentSlice';

export const store = () => {
	return configureStore({
		reducer: {
			percent: percentReducer,
			windows: windowsReducer,
			gate: gateReducer,
			modal: modalReducer,
			multimeter: multimeterReducer,
			circuit: circuitReducer,
			points: pointsReducer,
			powerUnit: powerUnitReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
