import { Modals } from '@/store/modalSlice';
import { InitialStateScheme } from '../types/scheme';
import { controlCircuit } from './controlCircuit/controlCircuit';
import { powerCircuit } from './powerCircuit/powerCircuit';
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
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
} from './controlCircuit/constants';

export { controlCircuit } from './controlCircuit/controlCircuit';
export {
	CONTROL_CIRCUIT_BREAKER_ID,
	LIMIT_SWITCH_OPEN_ID,
	LIMIT_SWITCH_CLOSE_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
} from './controlCircuit/constants';

export const INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID = 'p.0.0.1';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID = 'p.0.1.1';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID = 'p.0.2.1';
export const INPUT_CIRCUIT_BREAKER_ID = [
	INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID,
	INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID,
	INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID,
]; //вводной автомат состоит из 3 элементов

// Значение сопротивления при обрыве или при размыкании цепи
export const HIGH_RESISTANCE = 1_000_000_000;

export const BASE_RESISTANCE: Record<string, number> = {
	'p.1.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID]: 0,
	'p.1.3': 0.1,
	'p.1.4.1.1': 0,
	'p.1.4.1.2': 0.1,
	'p.1.4.1.3': 4100,
	'p.2.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID]: 0,
	'p.2.3': 0.1,
	'p.2.4.1': 0,
	'p.2.4.2': 0,
	'p.2.5': 0.1,
	'p.2.6': 4100,
	'p.3.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID]: 0,
	'p.3.3': 0.1,
	'p.3.4.1': 0,
	'p.3.4.1.2': 0.1,
	'p.3.4.1.3': 4100,
	[CONTROL_CIRCUIT_BREAKER_ID]: 0,
	[WIRE_PHASE_AFTER_BREAKER_ID]: 0.1,
	[LIMIT_SWITCH_OPEN_ID]: 0,
	[WIRE_LIMIT_OPEN_TO_TERMINAL_ID]: 0.1,
	[INSERT_NDI_NOT_OPEN_ID]: 0,
	[INSERT_NDO_CMD_OPEN_PTK_ID]: 0,
	[BUTTON_KRUZA_P_OPEN_ID]: 0,
	[INTERLOCK_OPEN_ID]: 0,
	[COIL_OPEN_ID]: 6400,
	[LAMP_KRUZA_P_CLOSED_ID]: 4800,
	[LIMIT_SWITCH_CLOSE_ID]: 0,
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: 0.1,
	[INSERT_NDI_NOT_CLOSED_ID]: 0,
	[INSERT_NDO_CMD_CLOSE_PTK_ID]: 0,
	[BUTTON_KRUZA_P_CLOSE_ID]: 0,
	[INTERLOCK_CLOSE_ID]: 0,
	[COIL_CLOSE_ID]: 6400,
	[LAMP_KRUZA_P_OPEN_ID]: 4800,
};

// Элементы схемы
export const SCHEME_ELEMENTS: { id: string; aria: string; type: Modals }[] = [
	{
		id: 'p.1.4.1.2',
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

export const initialStateScheme: InitialStateScheme = {
	powerCircuit,
	controlCircuit,
};
