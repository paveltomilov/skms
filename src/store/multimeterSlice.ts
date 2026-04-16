import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
	MultimeterState,
	ProbeColor,
	ProbStateProps,
} from '@/shared/types/multimeter';
import type { MultimeterMode } from '@/shared/configs/multimeterModes';
import { UniqueIdentifier } from '@dnd-kit/core';
import { setACV750Action } from '@/store/actions/multimiter/setACV750Action';

const initialState: MultimeterState = {
	currentMode: 'OFF',
	displayValue: null,
	probeConnections: { red: null, black: null },
	activeProb: null,
};

interface AttachProbePayload {
	probeColor: 'red' | 'black';
	pointId: UniqueIdentifier | null;
	dropId?: UniqueIdentifier | null;
}

export interface MultimeterModePropPayload {
	red: ProbStateProps;
	black: ProbStateProps;
}

export const multimeterSlice = createSlice({
	name: 'multimeter',
	initialState,
	reducers: {
		setCurrentMode: (state, action: PayloadAction<MultimeterMode>) => {
			state.currentMode = action.payload;
		},
		toggleAllowedMode: state => {
			state.currentMode = state.currentMode === 'OFF' ? 'ACV_750' : 'OFF';
		},

		attachProbe: (state, action: PayloadAction<AttachProbePayload>) => {
			const { probeColor, pointId, dropId = null } = action.payload;
			state.probeConnections[probeColor] = {
				pointId,
				dropId,
			};
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

		/** Выключение питания мультиметра */
		powerOff: state => {
			state.displayValue = null;
			state.probeConnections.red = null;
			state.probeConnections.black = null;
			state.activeProb = null;
		},

		/** Установка значения напряжения на дисплей */
		setACV750: (state, action: PayloadAction<MultimeterModePropPayload>) =>
			setACV750Action(state, action),

		/** TODO убрать заглушку после реализации всех экшенов режимов мультиметра */
		stubMode: state => {
			state.displayValue = 404;
		},
	},
});

export const {
	setCurrentMode,
	toggleAllowedMode,
	attachProbe,
	detachProbe,
	setActiveProb,
	setMeasurementResult,
	powerOff,
	setACV750,
	stubMode,
} = multimeterSlice.actions;

export default multimeterSlice.reducer;
