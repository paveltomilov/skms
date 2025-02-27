import { configureStore } from "@reduxjs/toolkit";
import reduserFilter from "./mainSlics";
import gateReducer from "./gateStateSlice";

export const store = () => {
  return configureStore({
    reducer: {
      reduserFilter,
      gateReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
