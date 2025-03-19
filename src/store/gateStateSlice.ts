import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// перечисление состояний задвижки
export enum GATE_STATE_TYPE {
	close = 'close',
	toClose = 'toClose',
	open = 'open',
	toOpen = 'toOpen',
	noPower = 'noPower',
	intermediate = 'intermediate',
}

// Интерфейс для состояния
export interface GateState {
	state: GATE_STATE_TYPE;
	value: number;
}

// Инициализация состояния
const initialState: GateState = {
	state: GATE_STATE_TYPE.open,
	value: 18.8,
};

const gateStateSlice = createSlice({
	name: 'gate',
	initialState,

	reducers: {
		setGateState: (state, action: PayloadAction<GateState>) => {
			state.state = action.payload.state;
			state.value = action.payload.value;
		},
	},
});

export const { setGateState } = gateStateSlice.actions;

export default gateStateSlice.reducer;
