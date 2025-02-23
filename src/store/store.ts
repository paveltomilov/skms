import { configureStore } from "@reduxjs/toolkit";
import reduserFilter from "./mainSlics";
import gateReducer from "./gateStateSlice";
import valueReducer from "./gateValueSlice";

export const store = () => {
  return configureStore({
    reducer: {
      reduserFilter,
      gateReducer,
      valueReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
