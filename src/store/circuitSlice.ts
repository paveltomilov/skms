import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialStateScheme } from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';

const initialState: InitialStateScheme = initialStateScheme;
const circuitSlice = createSlice({
	name: 'circuit',
	initialState,
	reducers: {
		// Активация неисправности
		activateMalfunction(
			state: InitialStateScheme,
			action: PayloadAction<string>,
		) {
			const id = action.payload;
			const elementId = id.slice(0, -2); // ID элемента
			const malfunctionIndex = Number(id.slice(-1)) - 1; // Индекс неисправности (преобразуем в число)

			let element;
			try {
				element = findElementByID(elementId, state);
			} catch (error) {
				// Если элемент не найден, просто выходим без изменений
				console.error(`Element with id "${elementId}" not found in activateMalfunction: ${error}`);
				return;
			}

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
			state: InitialStateScheme,
			action: PayloadAction<string>,
		) {
			const id = action.payload;
			const elementId = id.slice(0, -2);
			const malfunctionIndex = Number(id.slice(-1)) - 1;

			let element;
			try {
				element = findElementByID(elementId, state);
			} catch (error) {
				console.error(`Element with id "${elementId}" not found in deactivateMalfunction: ${error}`);
				// Если элемент не найден, просто выходим без изменений
				return;
			}

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
			state: InitialStateScheme,
			action: PayloadAction<{ id: string; value: number }>,
		) {
			const { id, value } = action.payload;

			let element;
			try {
				element = findElementByID(id, state);
			} catch (error) {
				console.error(`Element with id "${id}" not found in setResistance: ${error}	`);
				// Если элемент не найден, просто выходим без изменений
				return;
			}

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
