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
			const { id } = action.payload;
			const elementId = id.slice(0, -2); // ID элемента
			const malfunctionIndex = Number(id.slice(-1)) - 1; // Индекс неисправности (преобразуем в число)
			const element = findElementByID(elementId, state);

			// Проверяем:
			// 1. Что элемент найден
			// 2. Что у элемента есть массив malfunctions
			// 3. Что индекс неисправности корректен
			if (
				element &&
				Array.isArray(element.malfunctions) &&
				malfunctionIndex >= 0 &&
				malfunctionIndex < element.malfunctions.length
			) {
				element.malfunctions[malfunctionIndex].active = true;
			}
		},

		// Деактивация неисправности (аналогично активации)
		deactivateMalfunction(
			state: InitialState,
			action: PayloadAction<{ id: string }>,
		) {
			const { id } = action.payload;
			const elementId = id.slice(0, -2);
			const malfunctionIndex = Number(id.slice(-1)) - 1;
			const element = findElementByID(elementId, state);

			if (
				element &&
				Array.isArray(element.malfunctions) &&
				malfunctionIndex >= 0 &&
				malfunctionIndex < element.malfunctions.length
			) {
				element.malfunctions[malfunctionIndex].active = false;
			}
		},

		// Изменение сопротивления
		setResistance(
			state: InitialState,
			action: PayloadAction<{ id: string; value: number }>,
		) {
			const { id, value } = action.payload;
			const element = findElementByID(id, state);

			// Проверяем, что элемент найден и value — число
			if (element && typeof value === 'number') {
				element.resistance = value;
			}
		},
	},
});

export const { activateMalfunction, deactivateMalfunction, setResistance } =
	circuitSlice.actions;

export default circuitSlice.reducer;
