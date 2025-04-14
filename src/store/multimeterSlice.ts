import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
  MultimeterMode,
  ProbeConnectionsState,
  ProbeConnection,
} from '@/shared/types/multimeter';

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
    },
    /**
     * Редьюсер для установки результата измерения (заглушка).
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setMeasurementResult: (_state, _action: PayloadAction<SetMeasurementPayload>) => {
    },
    /**
     * Редьюсер для установки состояния ошибки (заглушка).
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setErrorState: (_state, _action: PayloadAction<string | null>) => {
    },
    /**
     * Редьюсер для обновления подключения щупа (заглушка).
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setProbeConnection: (_state, _action: PayloadAction<SetProbeConnectionPayload>) => {
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
export const selectActualDisplay = (state: RootState): string => state.multimeter.displayValue;

export default multimeterSlice.reducer;