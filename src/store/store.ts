<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import reduserFilter from "./mainSlics";
import gateReducer from "./gateStateSlice";
import buttonsReducer from './buttonsSlice';
import sidebarReducer from './sidebarSlice'; 

export const store = () => {
  return configureStore({
    reducer: {
      reduserFilter,
      buttonsReducer,
      gateReducer,
      sidebar: sidebarReducer, 
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

=======
import { configureStore } from '@reduxjs/toolkit';
import reduserFilter from './mainSlics';
import gateReducer from './gateStateSlice';
import buttonsReducer from './buttonsSlice';

export const store = () => {
	return configureStore({
		reducer: {
			reduserFilter,
			buttonsReducer,
			gateReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
>>>>>>> 4de87c84e557cfd1be50254c09758036a7cabbb9
