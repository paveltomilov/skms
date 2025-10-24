import { CircuitElement } from '../types/scheme';

export const OPEN_RES = 1_000_000_000;
export const CLOSED_RES = 0;
export const WIRE_RES = 0.1;
export const COIL_RES = 6400;
export const LAMP_RES = 4800;

export type ElementKind =
	| 'wire'
	| 'breaker'
	| 'limitSwitch'
	| 'insert'
	| 'button'
	| 'blockingContact'
	| 'coil'
	| 'lamp';

type MalfunctionTemplate = { key: string; name: string };

const MALF_TEMPLATES: Record<ElementKind, MalfunctionTemplate[]> = {
	wire: [
		{ key: '1', name: 'Обрыв провода' },
		{ key: '2', name: 'Короткое замыкание на землю' },
		{ key: '3', name: 'Короткое замыкание с соседним проводом' },
	],
	breaker: [
		{ key: '1', name: 'Плохой контакт на клемме, нет фазы' },
		{ key: '2', name: 'Ложно выбивает' },
		{ key: '3', name: 'Собирается механически, но нет коммутации' },
	],
	limitSwitch: [
		{ key: '1', name: 'Залипший контакт' },
		{ key: '2', name: 'Нет контакта' },
		{ key: '3', name: 'Не настроен' },
	],
	insert: [
		{ key: '1', name: 'Нет контакта, цепь не замыкается' },
		{ key: '2', name: 'Ложно сработала, цепь не размыкается' },
	],
	button: [
		{ key: '1', name: 'Нет контакта, команда не уходит' },
		{ key: '2', name: 'Ложно сработала, команда постоянно висит' },
	],
	blockingContact: [
		{ key: '1', name: 'Нет контакта' },
		{ key: '2', name: 'Ложно замкнутый контакт' },
	],
	coil: [
		{ key: '1', name: 'Неисправна катушка, пускатель не подтягивается' },
	],
	lamp: [
		{ key: '1', name: 'Перегорела' },
	],
};

const DEFAULT_RES_BY_KIND: Record<ElementKind, number> = {
	wire: WIRE_RES,
	breaker: CLOSED_RES,
	limitSwitch: CLOSED_RES,
	insert: CLOSED_RES,
	button: OPEN_RES,
	blockingContact: CLOSED_RES,
	coil: COIL_RES,
	lamp: LAMP_RES,
};

type CircuitMalfunction = CircuitElement['malfunctions'][number];

function createMalfunctions(id: string, kind: ElementKind): CircuitMalfunction[] {
	return MALF_TEMPLATES[kind].map((template) => ({
		id: `${id}.${template.key}`,
		name: template.name,
		active: false,
	}));
}

function makeEl(
	key: string,
	id: string,
	name: string,
	kind: ElementKind,
	resistance: number = DEFAULT_RES_BY_KIND[kind],
): Record<string, CircuitElement> {
	return {
		[key]: {
			id,
			name,
			resistance,
			malfunctions: createMalfunctions(id, kind),
		},
	};
}

export const controlCircuitElements = {
	...makeEl('C0', 'c.0', 'Провод от силовой части схемы к автомату питания управления', 'wire'),
	...makeEl('C1', 'c.1', 'Автомат питания цепей управления', 'breaker'),
	...makeEl('C2', 'c.2', 'Провод от автомата до соединительной коробки', 'wire'),
	...makeEl('C3_0_0', 'c.3.0.0', 'Провод в соединительной коробке на ветку открытия', 'wire'),
	...makeEl('C3_0_1', 'c.3.0.1', 'Провод от соединительной коробки до концевого выключателя открыто', 'wire'),
	...makeEl('C3_0_2', 'c.3.0.2', 'Концевой выключатель открыто', 'limitSwitch'),
	...makeEl('C3_0_3', 'c.3.0.3', 'Провод от концевого выключателя открыто до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_0_4_0_0', 'c.3.0.4.0.0', 'Провод от КРУЗА-П до вставки NDI открыто', 'wire'),
	...makeEl('C3_0_4_0_1', 'c.3.0.4.0.1', 'Вставка NDI открыто', 'insert'),
	...makeEl('C3_0_4_0_2', 'c.3.0.4.0.2', 'Провод от вставки NDI открыто до нейтрали', 'wire'),
	...makeEl('C3_0_4_1_0_0_0', 'c.3.0.4.1.0.0.0', 'Провод от КРУЗА-П до вставки NDO открыто', 'wire'),
	...makeEl('C3_0_4_1_0_0_1', 'c.3.0.4.1.0.0.1', 'Вставка NDO открыто', 'insert'),
	...makeEl('C3_0_4_1_0_0_2', 'c.3.0.4.1.0.0.2', 'Провод от вставки NDO открыто до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_0_0_1_0', 'c.3.0.0.1.0', 'Провод от клемника КРУЗА-П до контактов блокировки схемы открытия пускателя', 'wire'),
	...makeEl('C3_0_0_1_1', 'c.3.0.0.1.1', 'Контакты блокировки пускателя закрыто', 'blockingContact', OPEN_RES),
	...makeEl('C3_0_0_1_2', 'c.3.0.0.1.2', 'Провод от контактов блокировки пускателя', 'wire'),
	...makeEl('C3_0_0_1_4', 'c.3.0.0.1.4', 'Катушка пускателя открыть', 'coil'),
	...makeEl('C3_0_4_1_0_1_0', 'c.3.0.4.1.0.1.0', 'Провод от клемника КРУЗА-П до кнопки открыть', 'wire'),
	...makeEl('C3_0_4_1_0_1_1', 'c.3.0.4.1.0.1.1', 'Кнопка открыть', 'button'),
	...makeEl('C3_0_4_1_0_1_2', 'c.3.0.4.1.0.1.2', 'Провод от кнопки открыть до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_0_4_2_0', 'c.3.0.4.2.0', 'Провод от клемника КРУЗА-П до лампы закрыто', 'wire'),
	...makeEl('C3_0_4_2_1', 'c.3.0.4.2.1', 'Лампа закрыто', 'lamp'),
	...makeEl('C3_0_4_2_2', 'c.3.0.4.2.2', 'Провод от лампы закрыто до нейтрали', 'wire'),
	...makeEl('C3_1_0', 'c.3.1.0', 'Провод в соединительной коробке на ветку закрытия', 'wire'),
	...makeEl('C3_1_1', 'c.3.1.1', 'Провод от соединительной коробки до концевого выключателя закрыто', 'wire'),
	...makeEl('C3_1_2', 'c.3.1.2', 'Концевой выключатель закрыто', 'limitSwitch'),
	...makeEl('C3_1_3', 'c.3.1.3', 'Провод от концевого выключателя закрыто до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_1_4_0_0', 'c.3.1.4.0.0', 'Провод от КРУЗА-П до вставки NDI закрыто', 'wire'),
	...makeEl('C3_1_4_0_1', 'c.3.1.4.0.1', 'Вставка NDI закрыто', 'insert'),
	...makeEl('C3_1_4_0_2', 'c.3.1.4.0.2', 'Провод от вставки NDI закрыто до нейтрали', 'wire'),
	...makeEl('C3_1_4_1_0_0_0', 'c.3.1.4.1.0.0.0', 'Провод от КРУЗА-П до вставки NDO закрыто', 'wire'),
	...makeEl('C3_1_4_1_0_0_1', 'c.3.1.4.1.0.0.1', 'Вставка NDO закрыто', 'insert'),
	...makeEl('C3_1_4_1_0_0_2', 'c.3.1.4.1.0.0.2', 'Провод от вставки NDO закрыто до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_1_0_1_0', 'c.3.1.0.1.0', 'Провод от клемника КРУЗА-П до контактов блокировки схемы закрытия пускателя «открыто»', 'wire'),
	...makeEl('C3_1_0_1_1', 'c.3.1.0.1.1', 'Контакты блокировки пускателя открыто', 'blockingContact', OPEN_RES),
	...makeEl('C3_1_0_1_2', 'c.3.1.0.1.2', 'Провод от контактов блокировки пускателя', 'wire'),
	...makeEl('C3_1_0_1_4', 'c.3.1.0.1.4', 'Катушка пускателя закрыть', 'coil'),
	...makeEl('C3_1_4_1_0_1_0', 'c.3.1.4.1.0.1.0', 'Провод от клемника КРУЗА-П до кнопки закрыть', 'wire'),
	...makeEl('C3_1_4_1_0_1_1', 'c.3.1.4.1.0.1.1', 'Кнопка закрыть', 'button'),
	...makeEl('C3_1_4_1_0_1_2', 'c.3.1.4.1.0.1.2', 'Провод от кнопки закрыть до клемника КРУЗА-П', 'wire'),
	...makeEl('C3_1_4_2_0', 'c.3.1.4.2.0', 'Провод от клемника КРУЗА-П до лампы открыть', 'wire'),
	...makeEl('C3_1_4_2_1', 'c.3.1.4.2.1', 'Лампа открыть', 'lamp'),
	...makeEl('C3_1_4_2_2', 'c.3.1.4.2.2', 'Провод от лампы открыть до нейтрали', 'wire'),
} as const;
