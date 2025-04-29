import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type {
	MultimeterMode,
	ProbeConnectionsState,
	ProbeConnection,
	ProbePosition,
	MultimeterState,
	SchemeSize,
} from '@/shared/types/multimeter';
import { UniqueIdentifier } from '@dnd-kit/core';

const SUPPORTED_MODES: MultimeterMode[] = ['OFF', 'ACV_750', 'OHM_200'];

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
	probePositions: { red: null, black: null },
	activeProb: null,
	schemeSize: null,
};
interface SetProbePositionPayload {
	probeColor: 'red' | 'black';
	position: ProbePosition | null;
}
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
			const newMode = action.payload;

			state.currentMode = newMode;
			state.errorState = null;
			state.measurementResult = null;
			state.measurementUnit = null;

			if (newMode === 'OFF') state.displayValue = '';
			else if (newMode === 'ACV_750') state.displayValue = '0.00';
			else if (newMode === 'OHM_200') state.displayValue = 'OL';
			else state.displayValue = '---';
		},

		setMeasurementResult: (
			state,
			action: PayloadAction<SetMeasurementPayload>,
		) => {
			if (
				!SUPPORTED_MODES.includes(state.currentMode) &&
				state.currentMode !== 'OFF'
			) {
				state.displayValue = '---';
				state.measurementResult = null;
				state.measurementUnit = null;
				state.errorState = 'UNSUPPORTED_MODE';
				return;
			}

			const {
				value,
				unit = null,
				isError = false,
				isOverload = false,
			} = action.payload;
			state.measurementResult = typeof value === 'number' ? value : null;
			state.measurementUnit = unit;
			state.errorState = isError ? 'CALCULATION_ERROR' : null;

			if (state.currentMode === 'OFF') state.displayValue = '';
			else if (isError) state.displayValue = 'Err';
			else if (isOverload) state.displayValue = 'OL';
			else if (value === null) {
				if (state.currentMode === 'ACV_750')
					state.displayValue = '0.00';
				else if (state.currentMode === 'OHM_200')
					state.displayValue = 'OL';
				else state.displayValue = '';
			} else if (typeof value === 'string') {
				state.displayValue = value;
			}
		},

		setProbeConnection: (
			state,
			action: PayloadAction<SetProbeConnectionPayload>,
		) => {
			const { probeColor, connection } = action.payload;
			state.probeConnections[probeColor] = connection;
			state.errorState = null;
			state.measurementResult = null;
			state.measurementUnit = null;
			if (state.currentMode === 'OFF') state.displayValue = '';
			else if (state.currentMode === 'ACV_750')
				state.displayValue = '0.00';
			else if (state.currentMode === 'OHM_200') state.displayValue = 'OL';
		},

		setProbePosition: (
			state,
			action: PayloadAction<SetProbePositionPayload>,
		) => {
			state.probePositions[action.payload.probeColor] =
				action.payload.position;
		},
		setActiveProb: (
			state,
			action: PayloadAction<UniqueIdentifier | null>,
		) => {
			state.activeProb = action.payload;
		},
		setSchemeSize: (state, action: PayloadAction<SchemeSize | null>) => {
			state.schemeSize = action.payload;
		},
	},
});

export const {
	setCurrentMode,
	setMeasurementResult,
	setProbeConnection,
	setProbePosition,
	setActiveProb,
	setSchemeSize,
} = multimeterSlice.actions;

export const selectCurrentMode = (state: RootState): MultimeterMode =>
	state.multimeter.currentMode;
export const selectProbeConnections = (
	state: RootState,
): ProbeConnectionsState => state.multimeter.probeConnections;
export const selectErrorState = (state: RootState): string | null =>
	state.multimeter.errorState;
export const selectActualDisplay = (state: RootState): string =>
	state.multimeter.displayValue;
export const selectProbePositions = (state: RootState) =>
	state.multimeter.probePositions;

export default multimeterSlice.reducer;
