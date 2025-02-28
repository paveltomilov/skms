import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, MainState } from "../types/storeType";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    filter: {
      country: ["gfdgdfsgf"], // Начальный массив для стран
      region: ["gsdgsd"], // Начальный массив для регионов
    },
  },
  reducers: {
    setFilterState(
      state: MainState,
      action: PayloadAction<FilterState> // Указываем тип payload
    ) {
      state.filter = action.payload; // Обновляем filter
    },
  },
});

export const { setFilterState } = mainSlice.actions;
export default mainSlice.reducer;
