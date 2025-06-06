import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
	MultimeterMode,
	MultimeterState,
	ProbeColor,
} from '@/shared/types/multimeter';
import { UniqueIdentifier } from '@dnd-kit/core';

const initialState: MultimeterState = {
	currentMode: 'OFF',
	displayValue: null,
	probeConnections: { red: null, black: null },
	activeProb: null,
};

interface AttachProbePayload {
	probeColor: 'red' | 'black';
	pointId: UniqueIdentifier | null;
}

export const multimeterSlice = createSlice({
	name: 'multimeter',
	initialState,
	reducers: {
		setCurrentMode: (state, action: PayloadAction<MultimeterMode>) => {
			state.currentMode = action.payload;
		},

		attachProbe: (state, action: PayloadAction<AttachProbePayload>) => {
			const { probeColor, pointId } = action.payload;
			state.probeConnections[probeColor] = pointId;
		},

		detachProbe: (state, action: PayloadAction<ProbeColor>) => {
			const probeColor = action.payload;
			state.probeConnections[probeColor] = null;
		},

		setActiveProb: (
			state,
			action: PayloadAction<UniqueIdentifier | null>,
		) => {
			state.activeProb = action.payload;
		},
		setMeasurementResult: (state, action: PayloadAction<number | null>) => {
			state.displayValue = action.payload;
		},
	},
});

export const {
	setCurrentMode,
	attachProbe,
	detachProbe,
	setActiveProb,
	setMeasurementResult,
} = multimeterSlice.actions;

export default multimeterSlice.reducer;
