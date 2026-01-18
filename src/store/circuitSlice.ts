import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialStateScheme } from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { highResistanceMalfunctionIds } from '@/shared/configs/implementedMalfunctions';

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
			const malfunctionId = action.payload;

			// Проверяем, что malfunctionId не undefined или пустая строка
			if (!malfunctionId || typeof malfunctionId !== 'string') {
				console.error(
					`Invalid malfunction ID: "${malfunctionId}". Expected non-empty string.`,
				);
				return;
			}

			// ID неисправности имеет формат: elementId.suffix (например, 'c.0.1', 'c.3.0.4.1.4.1')
			// Находим последнюю точку для разделения ID элемента и номера неисправности
			const lastDotIndex = malfunctionId.lastIndexOf('.');
			if (lastDotIndex === -1) {
				console.error(
					`Invalid malfunction ID format: "${malfunctionId}". Expected format: "elementId.suffix"`,
				);
				return;
			}

			const elementId = malfunctionId.substring(0, lastDotIndex);
			const suffix = malfunctionId.substring(lastDotIndex + 1);
			const malfunctionIndex = Number(suffix) - 1; // Индекс неисправности (преобразуем в число, -1 так как индексация с 0)

			let element;
			try {
				element = findElementByID(elementId, state);
			} catch (error) {
				// Если элемент не найден, просто выходим без изменений
				console.error(
					`Element with id "${elementId}" not found in activateMalfunction: ${error}`,
				);
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
				const beforeActive =
					element.malfunctions[malfunctionIndex].active;
				const malfunction = element.malfunctions[malfunctionIndex];
				const malfunctionName = malfunction.name;

				// Явно обновляем массив malfunctions для корректной работы Immer
				element.malfunctions = element.malfunctions.map((m, index) => {
					if (index === malfunctionIndex) {
						return { ...m, active: true };
					}
					return m;
				});
				const afterActive =
					element.malfunctions[malfunctionIndex].active;

				// Если неисправность - "Обрыв провода", устанавливаем высокое сопротивление
				// Используем trim() для удаления возможных пробелов и проверяем точное совпадение
				const isHighResistance =
					highResistanceMalfunctionIds.includes(malfunctionId);

				console.info(
					`[DEBUG] Проверка высокой сопротивляемости для "${malfunctionId}":`,
					{
						malfunctionName,
						isMatch: isHighResistance,
					},
				); 

				if (isHighResistance) {
					const oldResistance = element.resistance;
					element.resistance =
						BASE_RESISTANCE_CONSTANT.highResistance;
					console.info(
						`✓ Установлено высокое сопротивление для элемента "${elementId}" из-за неисправности`,
						{
							oldResistance,
							newResistance:
								BASE_RESISTANCE_CONSTANT.highResistance,
							malfunctionName,
						},
					);
				} else {
					console.info(
						`✗ Неисправность "${malfunctionId}" не требует высокого сопротивления`,
					);
				}

				console.info(
					`✓ Активирована неисправность "${malfunctionId}" в элементе "${elementId}" (индекс ${malfunctionIndex})`,
					{
						elementName: element.name,
						beforeActive,
						afterActive,
						malfunctionName,
						resistance: element.resistance,
					},
				);
			} else {
				console.error(
					`✗ Неисправность с индексом ${malfunctionIndex} не найдена в элементе "${elementId}". Доступно неисправностей: ${
						element?.malfunctions?.length || 0
					}`,
				);
				if (element?.malfunctions) {
					console.error(
						`Доступные неисправности элемента "${elementId}":`,
						element.malfunctions.map((m, idx) => ({
							index: idx,
							id: m.id,
							name: m.name,
							active: m.active,
						})),
					);
				}
			}
		},

		// Деактивация неисправности (аналогично активации)
		deactivateMalfunction(
			state: InitialStateScheme,
			action: PayloadAction<string>,
		) {
			const malfunctionId = action.payload;

			// Проверяем, что malfunctionId не undefined или пустая строка
			if (!malfunctionId || typeof malfunctionId !== 'string') {
				console.error(
					`Invalid malfunction ID: "${malfunctionId}". Expected non-empty string.`,
				);
				return;
			}

			// ID неисправности имеет формат: elementId.suffix (например, 'c.0.1', 'c.3.0.4.1.4.1')
			// Находим последнюю точку для разделения ID элемента и номера неисправности
			const lastDotIndex = malfunctionId.lastIndexOf('.');
			if (lastDotIndex === -1) {
				console.error(
					`Invalid malfunction ID format: "${malfunctionId}". Expected format: "elementId.suffix"`,
				);
				return;
			}

			const elementId = malfunctionId.substring(0, lastDotIndex);
			const suffix = malfunctionId.substring(lastDotIndex + 1);
			const malfunctionIndex = Number(suffix) - 1; // Индекс неисправности (преобразуем в число, -1 так как индексация с 0)

			let element;
			try {
				element = findElementByID(elementId, state);
			} catch (error) {
				console.error(
					`Element with id "${elementId}" not found in deactivateMalfunction: ${error}`,
				);
				// Если элемент не найден, просто выходим без изменений
				return;
			}

			if (
				element &&
				Array.isArray(element.malfunctions) &&
				malfunctionIndex >= 0 &&
				malfunctionIndex < element.malfunctions.length
			) {
				const malfunction = element.malfunctions[malfunctionIndex];
				const malfunctionName = malfunction.name;

				// Явно обновляем массив malfunctions для корректной работы Immer
				element.malfunctions = element.malfunctions.map((m, index) => {
					if (index === malfunctionIndex) {
						return { ...m, active: false };
					}
					return m;
				});

				// Если деактивируем "Обрыв провода", возвращаем исходное сопротивление
				// Используем trim() для удаления возможных пробелов, как при активации
				const trimmedName = malfunctionName.trim();
				if (trimmedName === 'Обрыв провода') {
					try {
						// Получаем исходный элемент из начального состояния схемы
						const originalElement = findElementByID(
							elementId,
							initialStateScheme,
						);
						element.resistance = originalElement.resistance;
						console.info(
							`✓ Восстановлено исходное сопротивление для элемента "${elementId}" после деактивации обрыва провода`,
							{
								originalResistance: originalElement.resistance,
							},
						);
					} catch (error) {
						console.error(
							`Ошибка при восстановлении исходного сопротивления для элемента "${elementId}":`,
							error,
						);
					}
				}
			}
		},

		// Изменение сопротивления
		setResistance(
			state: InitialStateScheme,
			action: PayloadAction<{ id: string; value: number }>,
		) {
			const { id, value } = action.payload;
			console.log('id', id);
			console.log('value', value);
			let element;
			try {
				element = findElementByID(id, state);
			} catch (error) {
				console.error(
					`3 Element with id "${id}" not found in setResistance: ${error}	`,
				);
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
