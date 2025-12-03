import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
	MultimeterMode,
	MultimeterState,
	ProbeColor,
	ProbStateProps,
} from '@/shared/types/multimeter';
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
	attachProbe,
	detachProbe,
	setActiveProb,
	setMeasurementResult,
	powerOff,
	setACV750,
	stubMode,
} = multimeterSlice.actions;

export default multimeterSlice.reducer;
