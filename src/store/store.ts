import { configureStore } from "@reduxjs/toolkit";
import reduserFilter from "./mainSlics";
import gateReducer from "./gateStateSlice";
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
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


