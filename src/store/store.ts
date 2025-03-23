import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateStateSlice';
import buttonsReducer from './buttonsSlice';
import sidebarReducer from './sidebarSlice';
import popupReducer from './popupSlice';

export const store = () => {
	return configureStore({
		reducer: {
			buttonsReducer,
			gateReducer,
			sidebar: sidebarReducer,
			popup: popupReducer,
		},
	});
};

// Типизируем RootState и AppDispatch
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
