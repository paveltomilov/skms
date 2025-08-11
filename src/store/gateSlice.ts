import { GATES } from '@/shared/configs/gate';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const gateStateSlice = createSlice({
	name: 'gate',
	initialState: GATES,

	reducers: {
		setGateState: (
			state,
			action: PayloadAction<{ id: string; states: GATE_STATE_TYPE }>,
		) => {
			const { id, states } = action.payload;
			state[id].states = states;
		},
		setGatePosition: (
			state,
			action: PayloadAction<{ id: string; position: number }>,
		) => {
			const { id, position } = action.payload;
			state[id].position = position;
		},
		setGateMalfunctions: (
			state,
			action: PayloadAction<{ id: string; malfunctions: string[] }>,
		) => {
			const { id, malfunctions } = action.payload;
			state[id].malfunctions = malfunctions;
		},
		turnOnSwitch(
			state,
			action: PayloadAction<{
				id: string;
				type: 'controlSwitch' | 'powerSwitch';
			}>,
		) {
			const { id, type } = action.payload;
			state[id][type] = true;
		},
		turnOffSwitch(
			state,
			action: PayloadAction<{
				id: string;
				type: 'controlSwitch' | 'powerSwitch';
			}>,
		) {
			const { id, type } = action.payload;
			state[id][type] = false;
		},
	},
});

export const {
	setGateState,
	setGatePosition,
	setGateMalfunctions,
	turnOnSwitch,
	turnOffSwitch,
} = gateStateSlice.actions;

export default gateStateSlice.reducer;
