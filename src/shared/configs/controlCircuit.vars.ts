export const OPEN_RES = 1_000_000_000;
export const CLOSED_RES = 0;
export const WIRE_RES = 0.1;
export const COIL_RES = 6_400;
export const LAMP_RES = 4_800;

export const createWireMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Обрыв провода', active: false },
	{ id: `${id}.2`, name: 'Короткое замыкание на землю', active: false },
	{ id: `${id}.3`, name: 'Короткое замыкание с соседним проводом', active: false },
];

export const createLimitSwitchMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Залипший контакт', active: false },
	{ id: `${id}.2`, name: 'Нет контакта', active: false },
	{ id: `${id}.3`, name: 'Не настроен', active: false },
];

export const createInsertMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Нет контакта, цепь не замыкается', active: false },
	{ id: `${id}.2`, name: 'Ложно сработала, цепь не размыкается', active: false },
];

export const createButtonMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Нет контакта, команда не уходит', active: false },
	{ id: `${id}.2`, name: 'Ложно сработала, команда постоянно висит', active: false },
];

export const createBlockingContactMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Нет контакта', active: false },
	{ id: `${id}.2`, name: 'Ложно замкнутый контакт', active: false },
];

export const createCoilMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Неисправна катушка, пускатель не подтягивается', active: false },
];

export const createLampMalfunctions = (id: string) => [
	{ id: `${id}.1`, name: 'Перегорела', active: false },
];

export const E = {
	C0: {
		id: 'c.0',
		name: 'Провод от силовой части схемы к автомату питания управления',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.0'),
	},
	CONTROL_CIRCUIT_BREAKER: {
		id: 'c.1',
		name: 'Автомат питания цепей управления',
		resistance: CLOSED_RES,
		malfunctions: [
			{ id: 'c.1.1', name: 'Плохой контакт на клемме, нет фазы', active: false },
			{ id: 'c.1.2', name: 'Ложно выбивает', active: false },
			{ id: 'c.1.3', name: 'Собирается механически, но нет коммутации', active: false },
		],
	},
	C2: {
		id: 'c.2',
		name: 'Провод от автомата до соединительной коробки',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.2'),
	},
	C_3_0_0: {
		id: 'c.3.0.0',
		name: 'Провод в соединительной коробке на ветку открытия',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.0'),
	},
	C_3_0_1: {
		id: 'c.3.0.1',
		name: 'Провод от соединительной коробки до концевого выключателя открыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.1'),
	},
	C_3_0_2: {
		id: 'c.3.0.2',
		name: 'Концевой выключатель открыто',
		resistance: CLOSED_RES,
		malfunctions: createLimitSwitchMalfunctions('c.3.0.2'),
	},
	C_3_0_3: {
		id: 'c.3.0.3',
		name: 'Провод от концевого выключателя открыто до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.3'),
	},
	C_3_0_4_0_0: {
		id: 'c.3.0.4.0.0',
		name: 'Провод от КРУЗА-П до вставки NDI открыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.0.0'),
	},
	C_3_0_4_0_1: {
		id: 'c.3.0.4.0.1',
		name: 'Вставка NDI открыто',
		resistance: CLOSED_RES,
		malfunctions: createInsertMalfunctions('c.3.0.4.0.1'),
	},
	C_3_0_4_0_2: {
		id: 'c.3.0.4.0.2',
		name: 'Провод от вставки NDI открыто до нейтрали',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.0.2'),
	},
	C_3_0_4_1_0_0_0: {
		id: 'c.3.0.4.1.0.0.0',
		name: 'Провод от КРУЗА-П до вставки NDO открыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.1.0.0.0'),
	},
	C_3_0_4_1_0_0_1: {
		id: 'c.3.0.4.1.0.0.1',
		name: 'Вставка NDO открыто',
		resistance: CLOSED_RES,
		malfunctions: createInsertMalfunctions('c.3.0.4.1.0.0.1'),
	},
	C_3_0_4_1_0_0_2: {
		id: 'c.3.0.4.1.0.0.2',
		name: 'Провод от вставки NDO открыто до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.1.0.0.2'),
	},
	C_3_0_0_1_0: {
		id: 'c.3.0.0.1.0',
		name: 'Провод от клемника КРУЗА-П до контактов блокировки схемы открытия пускателя',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.0.1.0'),
	},
	C_3_0_0_1_1: {
		id: 'c.3.0.0.1.1',
		name: 'Контакты блокировки пускателя закрыто',
		resistance: CLOSED_RES,
		malfunctions: createBlockingContactMalfunctions('c.3.0.0.1.1'),
	},
	C_3_0_0_1_2: {
		id: 'c.3.0.0.1.2',
		name: 'Провод от контактов блокировки пускателя',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.0.1.2'),
	},
	C_3_0_0_1_4: {
		id: 'c.3.0.0.1.4',
		name: 'Катушка пускателя открыть',
		resistance: COIL_RES,
		malfunctions: createCoilMalfunctions('c.3.0.0.1.4'),
	},
	C_3_0_4_1_0_1_0: {
		id: 'c.3.0.4.1.0.1.0',
		name: 'Провод от клемника КРУЗА-П до кнопки открыть',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.1.0.1.0'),
	},
	C_3_0_4_1_0_1_1: {
		id: 'c.3.0.4.1.0.1.1',
		name: 'Кнопка открыть',
		resistance: OPEN_RES,
		malfunctions: createButtonMalfunctions('c.3.0.4.1.0.1.1'),
	},
	C_3_0_4_1_0_1_2: {
		id: 'c.3.0.4.1.0.1.2',
		name: 'Провод от кнопки открыть до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.1.0.1.2'),
	},
	C_3_0_4_2_0: {
		id: 'c.3.0.4.2.0',
		name: 'Провод от клемника КРУЗА-П до лампы закрыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.2.0'),
	},
	C_3_0_4_2_1: {
		id: 'c.3.0.4.2.1',
		name: 'Лампа закрыто',
		resistance: LAMP_RES,
		malfunctions: createLampMalfunctions('c.3.0.4.2.1'),
	},
	C_3_0_4_2_2: {
		id: 'c.3.0.4.2.2',
		name: 'Провод от лампы закрыто до нейтрали',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.0.4.2.2'),
	},
	C_3_1_0: {
		id: 'c.3.1.0',
		name: 'Провод в соединительной коробке на ветку закрытия',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.0'),
	},
	C_3_1_1: {
		id: 'c.3.1.1',
		name: 'Провод от соединительной коробки до концевого выключателя закрыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.1'),
	},
	C_3_1_2: {
		id: 'c.3.1.2',
		name: 'Концевой выключатель закрыто',
		resistance: CLOSED_RES,
		malfunctions: createLimitSwitchMalfunctions('c.3.1.2'),
	},
	C_3_1_3: {
		id: 'c.3.1.3',
		name: 'Провод от концевого выключателя закрыто до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.3'),
	},
	C_3_1_4_0_0: {
		id: 'c.3.1.4.0.0',
		name: 'Провод от КРУЗА-П до вставки NDI закрыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.0.0'),
	},
	C_3_1_4_0_1: {
		id: 'c.3.1.4.0.1',
		name: 'Вставка NDI закрыто',
		resistance: CLOSED_RES,
		malfunctions: createInsertMalfunctions('c.3.1.4.0.1'),
	},
	C_3_1_4_0_2: {
		id: 'c.3.1.4.0.2',
		name: 'Провод от вставки NDI закрыто до нейтрали',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.0.2'),
	},
	C_3_1_4_1_0_0_0: {
		id: 'c.3.1.4.1.0.0.0',
		name: 'Провод от КРУЗА-П до вставки NDO закрыто',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.1.0.0.0'),
	},
	C_3_1_4_1_0_0_1: {
		id: 'c.3.1.4.1.0.0.1',
		name: 'Вставка NDO закрыто',
		resistance: CLOSED_RES,
		malfunctions: createInsertMalfunctions('c.3.1.4.1.0.0.1'),
	},
	C_3_1_4_1_0_0_2: {
		id: 'c.3.1.4.1.0.0.2',
		name: 'Провод от вставки NDO закрыто до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.1.0.0.2'),
	},
	C_3_1_0_1_0: {
		id: 'c.3.1.0.1.0',
		name: 'Провод от клемника КРУЗА-П до контактов блокировки схемы закрытия пускателя «открыто»',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.0.1.0'),
	},
	C_3_1_0_1_1: {
		id: 'c.3.1.0.1.1',
		name: 'Контакты блокировки пускателя открыто',
		resistance: CLOSED_RES,
		malfunctions: createBlockingContactMalfunctions('c.3.1.0.1.1'),
	},
	C_3_1_0_1_2: {
		id: 'c.3.1.0.1.2',
		name: 'Провод от контактов блокировки пускателя',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.0.1.2'),
	},
	C_3_1_0_1_4: {
		id: 'c.3.1.0.1.4',
		name: 'Катушка пускателя закрыть',
		resistance: COIL_RES,
		malfunctions: createCoilMalfunctions('c.3.1.0.1.4'),
	},
	C_3_1_4_1_0_1_0: {
		id: 'c.3.1.4.1.0.1.0',
		name: 'Провод от клемника КРУЗА-П до кнопки закрыть',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.1.0.1.0'),
	},
	C_3_1_4_1_0_1_1: {
		id: 'c.3.1.4.1.0.1.1',
		name: 'Кнопка закрыть',
		resistance: OPEN_RES,
		malfunctions: createButtonMalfunctions('c.3.1.4.1.0.1.1'),
	},
	C_3_1_4_1_0_1_2: {
		id: 'c.3.1.4.1.0.1.2',
		name: 'Провод от кнопки закрыть до клемника КРУЗА-П',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.1.0.1.2'),
	},
	C_3_1_4_2_0: {
		id: 'c.3.1.4.2.0',
		name: 'Провод от клемника КРУЗА-П до лампы открыть',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.2.0'),
	},
	C_3_1_4_2_1: {
		id: 'c.3.1.4.2.1',
		name: 'Лампа открыть',
		resistance: LAMP_RES,
		malfunctions: createLampMalfunctions('c.3.1.4.2.1'),
	},
	C_3_1_4_2_2: {
		id: 'c.3.1.4.2.2',
		name: 'Провод от лампы открыть до нейтрали',
		resistance: WIRE_RES,
		malfunctions: createWireMalfunctions('c.3.1.4.2.2'),
	},
};
