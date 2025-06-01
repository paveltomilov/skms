import { initialSchemState as initialState } from '../shared/configs/scheme';
import { findElementByID } from '@/shared/utils/scheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '@/shared/types/scheme';

const circuitSlice = createSlice({
	name: 'circuit',
	initialState,
	reducers: {
		// Активация неисправности
		activateMalfunction(
			state: InitialState,
			action: PayloadAction<{ id: string }>,
		) {
			const { id } = action.payload; // id неисправности
			const elementId = id.slice(0, -2); // id для поиска элемента
			const malfunction = +id.slice(-1) - 1; // индекс искомой неисправности в массиве malfunction
			const element = findElementByID(elementId, state);

			if (element) {
				element.malfunctions[malfunction].active = true;
			}
		},

		// Деактивация неисправности
		deactivateMalfunction(
			state: InitialState,
			action: PayloadAction<{ id: string }>,
		) {
			const { id } = action.payload; // id неисправности
			const elementId = id.slice(0, -2); // id для поиска элемента
			const malfunction = +id.slice(-1) - 1; // индекс искомой неисправности в массиве malfunction
			const element = findElementByID(elementId, state);

			if (element) {
				element.malfunctions[malfunction].active = false;
			}
		},

		// Изменение сопротивления
		setResistance(
			state,
			action: PayloadAction<{ id: string; value: number }>,
		) {
			const { id, value } = action.payload;
			const element = findElementByID(id, state);
			if (element) {
				element.resistance = value;
			}
		},
	},
});

// Экспорт экшенов
export const { activateMalfunction, deactivateMalfunction, setResistance } =
	circuitSlice.actions;

// Экспорт редьюсера
export default circuitSlice.reducer;
