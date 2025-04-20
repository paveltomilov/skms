import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import buttonsReducer from './buttonsSlice';
import sidebarReducer from './sidebarSlice';
import popupReducer from './popupSlice';
import multimeterReducer from './multimeterSlice';

export const store = () => {
	return configureStore({
		reducer: {
			buttonsReducer,
			gateReducer,
			sidebar: sidebarReducer,
			popup: popupReducer,
			multimeter: multimeterReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
