import { configureStore } from '@reduxjs/toolkit';
import gateReducer from './gateSlice';
import modalReducer from './modalSlice';
import multimeterReducer from './multimeterSlice';
import circuitReducer from './circuitSlice';
import pointsReducer from './pointsSlice';
import powerUnitReducer from './powerUnitSlice';
import trainingReducer from './trainingSlice';

export const store = () => {
	return configureStore({
		reducer: {
			gate: gateReducer,
			modal: modalReducer,
			multimeter: multimeterReducer,
			circuit: circuitReducer,
			points: pointsReducer,
			powerUnit: powerUnitReducer,
			training: trainingReducer,
		},
	});
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
