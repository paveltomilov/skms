import { createSlice } from "@reduxjs/toolkit";
import style from "../components/Gate/Gate.module.scss";

export const initialState = [
  style.close,
  style.toClose,
  style.open,
  style.toOpen,
  style.noPower,
]; // массив состояний задвижки

const gateStateSlice = createSlice({
  name: "gate",
  initialState: initialState[3],

  reducers: {
    setGateState: (state, action) => (state = action.payload),
  },
});

export const { setGateState } = gateStateSlice.actions;

export default gateStateSlice.reducer;
