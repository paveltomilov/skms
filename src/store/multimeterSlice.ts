import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  MultimeterMode,
  ProbeConnectionsState,
  ProbeConnection,
} from '@/shared/types/multimeter.d';
import { formatMeasurementValue } from '@/shared/lib/formattingUtils'; 

interface MultimeterState {
  currentMode: MultimeterMode;
  displayValue: string;
  measurementResult: number | null;
  measurementUnit: string | null;
  errorState: string | null;
  probeConnections: ProbeConnectionsState;
}

const initialState: MultimeterState = {
  currentMode: 'OFF',
  displayValue: '',
  measurementResult: null,
  measurementUnit: null,
  errorState: null,
  probeConnections: {
    red: { targetId: null, targetType: null },
    black: { targetId: null, targetType: null },
  },
};

interface SetProbeConnectionPayload {
  probeColor: 'red' | 'black';
  connection: ProbeConnection;
}

interface SetMeasurementPayload {
    value: number | string | null; 
    unit?: string | null;
    isError?: boolean;
    isOverload?: boolean;
}


export const multimeterSlice = createSlice({
  name: 'multimeter',
  initialState,
  reducers: {
    setCurrentMode: (state, action: PayloadAction<MultimeterMode>) => {
      state.currentMode = action.payload;
      state.errorState = null;
      state.measurementResult = null;
      state.measurementUnit = null;
      state.displayValue = action.payload === 'OFF' ? '' : '---';
    },

    setMeasurementResult: (state, action: PayloadAction<SetMeasurementPayload>) => {
      const { value, unit = null, isError = false, isOverload = false } = action.payload;

      state.measurementResult = typeof value === 'number' ? value : null;
      state.measurementUnit = unit;
      state.errorState = isError ? 'CALCULATION_ERROR' : null; 

      if (state.currentMode === 'OFF') {
          state.displayValue = '';
      } else if (isError) {
          state.displayValue = 'Err'; 
      } else if (isOverload) {
          state.displayValue = 'OL'; 
      } else if (value === null) {
          state.displayValue = '---'; 
      } else if (typeof value === 'string') {
          state.displayValue = value;
      } else {
          const precisionFactor = 1; 
          state.displayValue = formatMeasurementValue(value, unit, precisionFactor);
      }
    },

    setErrorState: (state, action: PayloadAction<string | null>) => {
      state.errorState = action.payload;
      state.measurementResult = null;
      state.measurementUnit = null;
      if (action.payload !== null && state.currentMode !== 'OFF') {
        state.displayValue = 'Err';
      } else if (state.currentMode === 'OFF') {
        state.displayValue = '';
      }
    },

    setProbeConnection: (state, action: PayloadAction<SetProbeConnectionPayload>) => {
      const { probeColor, connection } = action.payload;
      state.probeConnections[probeColor] = connection;
      state.errorState = null;
      state.measurementResult = null;
      state.measurementUnit = null;
      if (state.currentMode !== 'OFF') {
        state.displayValue = '---'; 
      } else {
        state.displayValue = '';
      }
    },
  },
});

export const {
  setCurrentMode,
  setMeasurementResult,
  setErrorState,
  setProbeConnection,
} = multimeterSlice.actions;

export const selectCurrentMode = (state: RootState): MultimeterMode => state.multimeter.currentMode;
export const selectProbeConnections = (state: RootState): ProbeConnectionsState => state.multimeter.probeConnections;
export const selectErrorState = (state: RootState): string | null => state.multimeter.errorState;
export const selectActualDisplay = (state: RootState): string => state.multimeter.displayValue; // Просто возвращаем готовое значение

export default multimeterSlice.reducer;