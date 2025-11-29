import { BASE_RESISTANCE_CONSTANT } from './elementKind';
import {
	BUTTON_KRUZA_P_OPEN_ID,
	BUTTON_KRUZA_P_CLOSE_ID,
	INSERT_NDO_CMD_CLOSE_PTK_ID,
	INSERT_NDO_CMD_OPEN_PTK_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from './controlCircuit/constants';

export const PTK_BUTTONS_CONFIG = {
	// Срабатывает сразу после нажатия на кнопку открыть ПТК
	open: [
		{
			id: INSERT_NDO_CMD_OPEN_PTK_ID,
			value: 0, // Замыкаем "открыть" - сопротивление = 0
		},
	],
	// Срабатывает через 10 сек после нажатия на кнопку открыть ПТК (задвижка открылась полностью)
	opening: [
		{
			id: INSERT_NDO_CMD_OPEN_PTK_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем кнопку ПТК "открыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем концевой "открыть"
	],
	// Срабатывает сразу после нажатия на кнопку закрыть ПТК
	close: [
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: 0, // Замыкаем "закрыть" - сопротивление = 0
		},
	],
	// Срабатывает через 10 сек после нажатия на кнопку закрыть ПТК (задвижка закрылась полностью)
	closing: [
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем кнопку ПТК "закрыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем концевой "закрыть"
	],
	stop: [
		{
			id: INSERT_NDO_CMD_OPEN_PTK_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "открыть"
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "закрыть"
	],
};

export const KRUZAP_BUTTONS_CONFIG = {
	// Срабатывает сразу после нажатия на кнопку открыть Крузап
	open: [
		{
			id: BUTTON_KRUZA_P_OPEN_ID,
			value: 0, // Замыкаем "открыть" - сопротивление = 0
		},
	],
	// Срабатывает если кнопку открыть зажать на 10 сек и более (задвижка открылась полностью)
	opening: [
		{
			id: BUTTON_KRUZA_P_OPEN_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "открыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем концевой "открыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: 0, // Замыкаем концевой "закрыть" (задвижка УЖЕ НЕ закрыта) - сопротивление = 0
		},
	],
	// Срабатывает сразу после нажатия на кнопку закрыть крузап
	close: [
		{
			id: BUTTON_KRUZA_P_CLOSE_ID,
			value: 0, // Замыкаем "закрыть" - сопротивление = 0
		},
		{
			id: INSERT_NDO_CMD_OPEN_PTK_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "открыть"
	],
	// Срабатывает если кнопку закрыть зажать на 10 сек и более (задвижка закрылась полностью)
	closing: [
		{
			id: BUTTON_KRUZA_P_CLOSE_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "закрыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: 0, // Замыкаем концевой "открыть" (задвижка УЖЕ НЕ открыта) - сопротивление = 0
		},
	],
	stop: [
		{
			id: BUTTON_KRUZA_P_OPEN_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "открыть"
		{
			id: BUTTON_KRUZA_P_CLOSE_ID,
			value: BASE_RESISTANCE_CONSTANT.highResistance,
		}, // Размыкаем "закрыть"
	],
};
