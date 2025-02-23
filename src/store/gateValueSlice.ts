import { createSlice } from "@reduxjs/toolkit";

const gateValueSlice = createSlice({
  name: "value",
  initialState: 18.8,

  reducers: {
    setGateValue: (state, action) => (state = action.payload),
  },
});

export const { setGateValue } = gateValueSlice.actions;

export default gateValueSlice.reducer;
