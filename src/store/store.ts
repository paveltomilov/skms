import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import buttonsReducer from './buttonsSlice';
import sidebarReducer from './sidebarSlice';
import popupReducer from './popupSlice';
import multimeterReducer from './multimeterSlice';
import circuitReducer from './circuitSlice';
import pointsReducer from './pointsSlice';

export const store = () => {
	return configureStore({
		reducer: {
			buttonsReducer,
			gate: gateReducer,
			sidebar: sidebarReducer,
			popup: popupReducer,
			multimeter: multimeterReducer,
			circuit: circuitReducer,
			points: pointsReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
