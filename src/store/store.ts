import { configureStore } from '@reduxjs/toolkit';
import reduserFilter from './mainSlics';
import gateReducer from './gateStateSlice';
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

// Типизируем RootState и AppDispatch
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];