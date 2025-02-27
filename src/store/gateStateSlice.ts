import { createSlice } from "@reduxjs/toolkit";
import style from "../components/Gate/Gate.module.scss";

export const initialGateState = [
  style.close,
  style.toClose,
  style.open,
  style.toOpen,
  style.noPower,
]; // массив состояний задвижки

const gateStateSlice = createSlice({
  name: "gate",
  initialState: { gate: initialGateState[2], value: 18.8 },

  reducers: {
    setGateState: (state, action) => (state = action.payload),
  },
});

export const { setGateState } = gateStateSlice.actions;

export default gateStateSlice.reducer;
