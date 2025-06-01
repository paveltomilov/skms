import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для состояния
export interface GateState {
	state: GATE_STATE_TYPE;
	value: number;
	position: number;
}

// Инициализация состояния
const initialState: GateState = {
	state: GATE_STATE_TYPE.open,
	value: 18.8,
	position: 50, // 50% - промежуточное положение задвижки
};

const gateStateSlice = createSlice({
	name: 'gate',
	initialState,

	reducers: {
		setGateState: (state, action: PayloadAction<GateState>) => {
			state.state = action.payload.state;
			state.value = action.payload.value;
		},
		setGatePosition: (state, action: PayloadAction<number>) => {
			state.position = action.payload;
		},
	},
});

export const { setGateState, setGatePosition } = gateStateSlice.actions;

export default gateStateSlice.reducer;
