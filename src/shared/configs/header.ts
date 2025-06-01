import {
	BASE_RESISTANCE,
	CLOSE_FROM_KRUZAP_ID,
	CLOSE_FROM_PTK_ID,
	HIGH_RESISTANCE,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	OPEN_FROM_KRUZAP_ID,
	OPEN_FROM_PTK_ID,
} from './scheme';

export const PTK_BUTTONS_CONFIG = {
	// срабатывает сразу после нажатия на кнопку открыть ПТК
	open: [
		{
			id: OPEN_FROM_PTK_ID,
			value: BASE_RESISTANCE[OPEN_FROM_PTK_ID],
		}, // Замыкаем "открыть"
		{ id: CLOSE_FROM_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
	],
	// срабатывает через 10 сек после нажатия на кнопку открыть ПТК (задвижка открылась полностью)
	opening: [
		{
			id: OPEN_FROM_PTK_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "открыть"
		{ id: LIMIT_SWITCH_OPEN_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "открыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть"
	],
	// срабатывает сразу после нажатия на кнопку закрыть ПТК
	close: [
		{
			id: CLOSE_FROM_PTK_ID,
			value: BASE_RESISTANCE[CLOSE_FROM_PTK_ID],
		}, // Замыкаем "закрыть"
		{ id: OPEN_FROM_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// срабатывает через 10 сек после нажатия на кнопку закрыть ПТК (задвижка закрылась полностью)
	closing: [
		{
			id: CLOSE_FROM_PTK_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть"
	],
	stop: [
		{ id: OPEN_FROM_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: CLOSE_FROM_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" тк положение задвижки промежуточное
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть" тк положение задвижки промежуточное
	],
};

export const KRUZAP_BUTTONS_CONFIG = {
	// срабатывает сразу после нажатия на кнопку открыть Крузап
	open: [
		{
			id: OPEN_FROM_KRUZAP_ID,
			value: BASE_RESISTANCE[OPEN_FROM_KRUZAP_ID],
		}, // Замыкаем "открыть"
	],
	// срабатывает если кнопку открыть зажать на 10 сек и более (задвижка открылась полностью)
	opening: [
		{
			id: OPEN_FROM_KRUZAP_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "открыть"
		{ id: LIMIT_SWITCH_OPEN_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "открыть"
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть"
	],
	// срабатывает сразу после нажатия на кнопку закрыть крузап
	close: [
		{
			id: CLOSE_FROM_KRUZAP_ID,
			value: BASE_RESISTANCE[CLOSE_FROM_PTK_ID],
		}, // Замыкаем "закрыть"
		{ id: OPEN_FROM_PTK_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
	],
	// срабатывает если кнопку закрыть зажать на 10 сек и более (задвижка закрылась полностью)
	closing: [
		{
			id: CLOSE_FROM_KRUZAP_ID,
			value: HIGH_RESISTANCE,
		}, // Размыкаем "закрыть"
		{ id: LIMIT_SWITCH_CLOSE_ID, value: HIGH_RESISTANCE }, // Размыкаем концевой "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть"
	],
	stop: [
		{ id: OPEN_FROM_KRUZAP_ID, value: HIGH_RESISTANCE }, // Размыкаем "открыть"
		{ id: CLOSE_FROM_KRUZAP_ID, value: HIGH_RESISTANCE }, // Размыкаем "закрыть"
		{
			id: LIMIT_SWITCH_OPEN_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_OPEN_ID],
		}, // Замыкаем концевой "открыть" тк положение задвижки промежуточное
		{
			id: LIMIT_SWITCH_CLOSE_ID,
			value: BASE_RESISTANCE[LIMIT_SWITCH_CLOSE_ID],
		}, // Замыкаем концевой "закрыть" тк положение задвижки промежуточное
	],
};
