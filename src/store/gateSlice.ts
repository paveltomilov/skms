import { GATES } from '@/shared/configs/gate';
import { GATE_STATE_TYPE, IGate } from '@/shared/types/gate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GateState {
	gates: Record<string, IGate>;
	activeGateId: string | null;
}

const initialState: GateState = {
	gates: GATES,
	activeGateId: null,
};

const gateStateSlice = createSlice({
	name: 'gate',
	initialState,

	reducers: {
		setActiveGate: (state, action: PayloadAction<string>) => {
			state.activeGateId = action.payload;
		},
		setGateState: (
			state,
			action: PayloadAction<{ id: string; states: GATE_STATE_TYPE }>,
		) => {
			const { id, states } = action.payload;
			state.gates[id].states = states;
		},
		setGatePosition: (
			state,
			action: PayloadAction<{ id: string; position: number }>,
		) => {
			const { id, position } = action.payload;
			state.gates[id].position = position;
		},
		setGateMalfunctions: (
			state,
			action: PayloadAction<{ id: string; malfunctions: string[] }>,
		) => {
			const { id, malfunctions } = action.payload;
			state.gates[id].malfunctions = malfunctions;
		},
		turnOnSwitch(
			state,
			action: PayloadAction<{
				id: string;
				type: 'controlSwitch' | 'powerSwitch';
			}>,
		) {
			const { id, type } = action.payload;
			state.gates[id][type] = true;
		},
		turnOffSwitch(
			state,
			action: PayloadAction<{
				id: string;
				type: 'controlSwitch' | 'powerSwitch';
			}>,
		) {
			const { id, type } = action.payload;
			state.gates[id][type] = false;
		},
	},
});

export const {
	setActiveGate,
	setGateState,
	setGatePosition,
	setGateMalfunctions,
	turnOnSwitch,
	turnOffSwitch,
} = gateStateSlice.actions;

export default gateStateSlice.reducer;
