import { createSlice } from "@reduxjs/toolkit";

// перечисление состояний задвижки
enum GATE_STATE_TYPE {
  close = "close",
  toClose = "toClose",
  open = "open",
  toOpen = "toOpen",
  noPower = "noPower",
}

// Интерфейс для состояния
interface GateState {
  state: GATE_STATE_TYPE;
  value: number;
}

// Инициализация состояния
const initialState: GateState = { state: GATE_STATE_TYPE.open, value: 18.8 };

const gateStateSlice = createSlice({
  name: "gate",
  initialState,

  reducers: {
    setGateState: (state, action) => (state = action.payload),
  },
});

export const { setGateState } = gateStateSlice.actions;

export default gateStateSlice.reducer;
