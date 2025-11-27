import { Modals } from '@/store/modalSlice';
import {
	BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
	COIL_CLOSE_ID,
	INTERLOCK_CLOSE_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	COIL_OPEN_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	INSERT_NDI_NOT_OPEN_ID,
	LAMP_KRUZA_P_OPEN_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	INSERT_NDI_NOT_CLOSED_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
	INTERLOCK_OPEN_ID,
} from './controlCircuit/constants';
import { initialStateScheme } from './scheme';
import type { CircuitBranch, CircuitElement } from '../types/scheme';
import { BASE_RESISTANCE_CONSTANT } from './elementKind';

/**
 * Рекурсивно извлекает все элементы схемы из ветвей.
 * @param branches - массив ветвей схемы
 * @returns массив всех элементов схемы
 */
const extractElements = (branches: CircuitBranch[]): CircuitElement[] => {
	const elements: CircuitElement[] = [];

	for (const branch of branches) {
		if (Array.isArray(branch)) {
			// Рекурсивно обрабатываем вложенные массивы (параллельные ветвления)
			elements.push(...extractElements(branch));
		} else {
			// Это элемент схемы
			elements.push(branch);
		}
	}

	return elements;
};

/**
 * Базовые сопротивления элементов схемы по их ID.
 * Сопротивление определяется по типу элемента (kind) из BASE_RESISTANCE_CONSTANT.
 */
export const BASE_RESISTANCE: Record<string, number> = (() => {
	const allElements = [
		...extractElements(initialStateScheme.powerCircuit),
		...extractElements(initialStateScheme.controlCircuit),
	];

	const resistanceMap: Record<string, number> = {};
	for (const element of allElements) {
		// Берем сопротивление из BASE_RESISTANCE_CONSTANT по типу элемента
		resistanceMap[element.id] =
			BASE_RESISTANCE_CONSTANT[element.kind] ?? element.resistance;
	}
	console.log(resistanceMap);
	return resistanceMap;
})();

/**
 * Элементы схемы для отображения в интерфейсе.
 * Каждый элемент содержит id, aria-метку и тип модального окна.
 */
export const SCHEME_ELEMENTS: { id: string; aria: string; type: Modals }[] = [
	{
		id: 'p.1',
		aria: 'Двигатель',
		type: 'motor',
	},
	{
		id: 'p.3.1',
		aria: 'Реверсивный пускатель',
		type: 'starter',
	},
	// Элементы цепи управления
	{
		id: CONTROL_CIRCUIT_BREAKER_ID,
		aria: 'Автомат питания цепей управления',
		type: 'automatic',
	},
	{
		id: LIMIT_SWITCH_OPEN_ID,
		aria: 'Концевой выключатель открыто',
		type: 'block_switches',
	},
	{
		id: LIMIT_SWITCH_CLOSE_ID,
		aria: 'Концевой выключатель закрыто',
		type: 'block_switches',
	},
	{
		id: INSERT_NDI_NOT_OPEN_ID,
		aria: 'Вставка NDI (сигнал «не открыто»)',
		type: 'fusible_insert',
	},
	{
		id: INSERT_NDO_CMD_OPEN_PTK_ID,
		aria: 'Вставка NDI (команда открыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: BUTTON_KRUZA_P_OPEN_ID,
		aria: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: INTERLOCK_OPEN_ID,
		aria: 'Блокировка включения пускателя на открытие',
		type: 'blocking_activation',
	},
	{
		id: COIL_OPEN_ID,
		aria: 'Катушка пускателя открыть',
		type: 'starter_coil',
	},
	{
		id: LAMP_KRUZA_P_CLOSED_ID,
		aria: 'Лампа в КРУЗА-П закрыто',
		type: 'lamps',
	},
	{
		id: INSERT_NDI_NOT_CLOSED_ID,
		aria: 'Вставка NDI (сигнал «не закрыто»)',
		type: 'fusible_insert',
	},
	{
		id: INSERT_NDO_CMD_CLOSE_PTK_ID,
		aria: 'Вставка NDI (команда закрыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: BUTTON_KRUZA_P_CLOSE_ID,
		aria: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: INTERLOCK_CLOSE_ID,
		aria: 'Блокировка включения пускателя на закрыть',
		type: 'blocking_activation',
	},
	{
		id: COIL_CLOSE_ID,
		aria: 'Катушка пускателя закрыть',
		type: 'starter_coil',
	},
	{
		id: LAMP_KRUZA_P_OPEN_ID,
		aria: 'Лампа в КРУЗА-П открыто',
		type: 'lamps',
	},
];
