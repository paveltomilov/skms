import { BASE_RESISTANCE, HIGH_RESISTANCE } from './scheme';
import {
	CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
	CLOSE_COMMAND_FROM_PTK_INSERT_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
	OPEN_COMMAND_FROM_PTK_INSERT_ID,
} from './controlCircuit/constants';

export const PTK_BUTTONS_CONFIG = {
	// Срабатывает сразу после нажатия на кнопку открыть ПТК
	open: [
		{
			id: OPEN_COMMAND_FROM_PTK_INSERT_ID,
			value: BASE_RESISTANCE[OPEN_COMMAND_FROM_PTK_INSERT_ID],
		}, // Замыкаем "открыть"
		{ id: CLOSE_COMMAND_FROM_PTK_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
	// Срабатывает через 10 сек после нажатия на кнопку открыть ПТК (задвижка открылась полностью)
	opening: [
		{
			id: OPEN_COMMAND_FROM_PTK_INSERT_ID,
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
			id: CLOSE_COMMAND_FROM_PTK_INSERT_ID,
			value: BASE_RESISTANCE[CLOSE_COMMAND_FROM_PTK_INSERT_ID],
		}, // Замыкаем "закрыть"
		{ id: OPEN_COMMAND_FROM_PTK_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// Срабатывает через 10 сек после нажатия на кнопку закрыть ПТК (задвижка закрылась полностью)
	closing: [
		{
			id: CLOSE_COMMAND_FROM_PTK_INSERT_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" (задвижка УЖЕ НЕ открыта)
	],
	stop: [
		{ id: OPEN_COMMAND_FROM_PTK_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: CLOSE_COMMAND_FROM_PTK_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
};

export const KRUZAP_BUTTONS_CONFIG = {
	// Срабатывает сразу после нажатия на кнопку открыть Крузап
	open: [
		{
			id: OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
			value: BASE_RESISTANCE[OPEN_COMMAND_FROM_KRUZAP_INSERT_ID],
		}, // Замыкаем "открыть"
	],
	// Срабатывает если кнопку открыть зажать на 10 сек и более (задвижка открылась полностью)
	opening: [
		{
			id: OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
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
			id: CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
			value: BASE_RESISTANCE[CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID],
		}, // Замыкаем "закрыть"
		{ id: OPEN_COMMAND_FROM_PTK_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// Срабатывает если кнопку закрыть зажать на 10 сек и более (задвижка закрылась полностью)
	closing: [
		{
			id: CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" (задвижка УЖЕ НЕ открыта)
	],
	stop: [
		{ id: OPEN_COMMAND_FROM_KRUZAP_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
};
