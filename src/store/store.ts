import { configureStore } from '@reduxjs/toolkit';
import reduserFilter from './mainSlics';

export const store = () => {
  return configureStore({
    reducer: {
      reduserFilter,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
