import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gateReducer from './gateSlice';
import modalReducer from './modalSlice';
import multimeterReducer from './multimeterSlice';
import circuitReducer from './circuitSlice';
import pointsReducer from './pointsSlice';
import powerUnitReducer from './powerUnitSlice';
import trainingReducer from './trainingSlice';
import windowsReducer from './windowsSlice';
import percentReducer from './percentSlice';
import updateListReducer from './updateListSlice';
import UserInfoSlice from '@/store/userInfoSlice';
import simulationReducer from './simulationSlice';
import emergencyStatusReducer from './emergencyStatusSlice';
import timerReducer from './timerSlice';

const rootReducer = combineReducers({
	updateList: updateListReducer,
	percent: percentReducer,
	windows: windowsReducer,
	gate: gateReducer,
	modal: modalReducer,
	multimeter: multimeterReducer,
	circuit: circuitReducer,
	points: pointsReducer,
	powerUnit: powerUnitReducer,
	training: trainingReducer,
	userInfo: UserInfoSlice,
	simulation: simulationReducer,
	emergencyStatus: emergencyStatusReducer,
	timer: timerReducer,
});

const persistConfig = {
	key: 'appWindows',
	storage,
	whitelist: ['windows', 'percent', 'simulation', 'timer'], // cписок reduces сохраняемых в localStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
				// Увеличиваем порог предупреждения для больших состояний
				warnAfter: 128, // по умолчанию 32ms
			},
		}),
});

export const persistor = persistStore(store);
export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
