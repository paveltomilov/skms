import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../shared/configs/scheme';

const circuitSlice = createSlice({
	name: 'circuit',
	initialState,
	reducers: {
		// Активация неисправности
		activateMalfunction() {},
		// Деактивация неисправности
		deactivateMalfunction() {},

		// Изменение сопротивления
		setResistance() {},

		// Изменение напряжения
		setvoltage() {},
	},
});

// Экспорт экшенов
export const {
	activateMalfunction,
	deactivateMalfunction,
	setResistance,
	setvoltage,
} = circuitSlice.actions;

// Экспорт редьюсера
export default circuitSlice.reducer;
