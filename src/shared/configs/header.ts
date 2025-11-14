import { BASE_RESISTANCE, HIGH_RESISTANCE } from './scheme';
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
			value: BASE_RESISTANCE[INSERT_NDO_CMD_OPEN_PTK_ID],
		}, // Замыкаем "открыть"
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
	],
	// Срабатывает через 10 сек после нажатия на кнопку открыть ПТК (задвижка открылась полностью)
	opening: [
		{
			id: INSERT_NDO_CMD_OPEN_PTK_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "открыть"
		{ id: LIMIT_SWITCH_OPEN_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "открыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть" (задвижка УЖЕ НЕ закрыта)
	],
	// Срабатывает сразу после нажатия на кнопку закрыть ПТК
	close: [
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: BASE_RESISTANCE[INSERT_NDO_CMD_CLOSE_PTK_ID],
		}, // Замыкаем "закрыть"
		{ id: INSERT_NDO_CMD_OPEN_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// Срабатывает через 10 сек после нажатия на кнопку закрыть ПТК (задвижка закрылась полностью)
	closing: [
		{
			id: INSERT_NDO_CMD_CLOSE_PTK_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" (задвижка УЖЕ НЕ открыта)
	],
	stop: [
		{ id: INSERT_NDO_CMD_OPEN_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: INSERT_NDO_CMD_CLOSE_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
};

export const KRUZAP_BUTTONS_CONFIG = {
	// Срабатывает сразу после нажатия на кнопку открыть Крузап
	open: [
		{
			id: BUTTON_KRUZA_P_OPEN_ID,
			value: BASE_RESISTANCE[BUTTON_KRUZA_P_OPEN_ID],
		}, // Замыкаем "открыть"
	],
	// Срабатывает если кнопку открыть зажать на 10 сек и более (задвижка открылась полностью)
	opening: [
		{
			id: BUTTON_KRUZA_P_OPEN_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "открыть"
		{ id: LIMIT_SWITCH_OPEN_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "открыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть" (задвижка УЖЕ НЕ закрыта)
	],
	// Срабатывает сразу после нажатия на кнопку закрыть крузап
	close: [
		{
			id: BUTTON_KRUZA_P_CLOSE_ID,
			value: BASE_RESISTANCE[BUTTON_KRUZA_P_CLOSE_ID],
		}, // Замыкаем "закрыть"
		{ id: INSERT_NDO_CMD_OPEN_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// Срабатывает если кнопку закрыть зажать на 10 сек и более (задвижка закрылась полностью)
	closing: [
		{
			id: BUTTON_KRUZA_P_CLOSE_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" (задвижка УЖЕ НЕ открыта)
	],
	stop: [
		{ id: BUTTON_KRUZA_P_OPEN_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: BUTTON_KRUZA_P_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
};
