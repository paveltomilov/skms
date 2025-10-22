import { Modals } from '@/store/modalSlice';
import { CircuitBranch, InitialStateScheme } from '../types/scheme';
import { E } from './controlCircuit.vars';

const {
	C0: provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	C1: avtomatPitaniyaSkhemyUpravleniya,
	C2: provodOtAvtomataDoSoyedinitelnojKorobki,
	C3_0_0: provodVSoyedinitelnojKorobkeNaVetkuOtkrytiya,
	C3_0_1: provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
	C3_0_2: kontsevojVyklyuchatelOtkryto,
	C3_0_3: provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZA_P,
	C3_0_4_0_0: provodOtKRUZA_PDoVstavkiNDIOtkryto,
	C3_0_4_0_1: vstavkaNDIOtkryto,
	C3_0_4_0_2: provodOtVstavkiNDIOtkrytoDoNejtrali,
	C3_0_4_1_0_0_0: provodOtKRUZA_PDoVstavkiNDOOtkryt,
	C3_0_4_1_0_0_1: vstavkaNDOOtkryt,
	C3_0_4_1_0_0_2: provodOtVstavkiNDOOtkrytDoKlemmikaKRUZA_P,
	C3_0_0_1_0: provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyOtkrytiyaPuskatelyaZakryto,
	C3_0_0_1_1: kontaktyBlokirovkiPuskatelyaZakryto,
	C3_0_0_1_2: provodOtKontaktovBlokirovkiPuskatelyaZakrytoNaKatushechkuPuskatelyaOtkryto,
	C3_0_0_1_4: katushechkaPuskatelyaOtkryt,
	C3_0_4_1_0_1_0: provodOtKlemmikaKRUZA_PDoKnopkiOtkryt,
	C3_0_4_1_0_1_1: knopkaOtkryt,
	C3_0_4_1_0_1_2: provodOtKnopkiOtkrytDoKlemmikaKRUZA_P,
	C3_0_4_2_0: provodOtKlemmikaKRUZA_PDoLampyZakryto,
	C3_0_4_2_1: lampaZakryto,
	C3_0_4_2_2: provodOtLampyZakrytoDoNejtrali,
	C3_1_0: provodVSoyedinitelnojKorobkeNaVetkuZakrytiya,
	C3_1_1: provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
	C3_1_2: kontsevojVyklyuchatelZakryto,
	C3_1_3: provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZA_P,
	C3_1_4_0_0: provodOtKRUZA_PDoVstavkiNDIZakryto,
	C3_1_4_0_1: vstavkaNDIZakryto,
	C3_1_4_0_2: provodOtVstavkiNDIZakrytoDoNejtrali,
	C3_1_4_1_0_0_0: provodOtKRUZA_PDoVstavkiNDOZakryt,
	C3_1_4_1_0_0_1: vstavkaNDOZakryt,
	C3_1_4_1_0_0_2: provodOtVstavkiNDOZakrytDoKlemmikaKRUZA_P,
	C3_1_0_1_0: provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyZakrytiyaPuskatelyaOtkryto,
	C3_1_0_1_1: kontaktyBlokirovkiPuskatelyaOtkryto,
	C3_1_0_1_2: provodOtKontaktovBlokirovkiPuskatelyaOtkrytoNaKatushechkuPuskatelyaZakryto,
	C3_1_0_1_4: katushechkaPuskatelyaZakryt,
	C3_1_4_1_0_1_0: provodOtKlemmikaKRUZA_PDoKnopkiZakryt,
	C3_1_4_1_0_1_1: knopkaZakryt,
	C3_1_4_1_0_1_2: provodOtKnopkiZakrytDoKlemmikaKRUZA_P,
	C3_1_4_2_0: provodOtKlemmikaKRUZA_PDoLampyOtkryto,
	C3_1_4_2_1: lampaOtkryto,
	C3_1_4_2_2: provodOtLampyOtkrytoDoNejtrali,
} = E;

// id элементов схемы
export const LIMIT_SWITCH_OPEN_ID = 'c.3.1.1';
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.2.1';

export const OPEN_FROM_KRUZAP_ID = 'c.3.1.3.2.1.2';
export const CLOSE_FROM_KRUZAP_ID = 'c.3.2.3.2.1.2';
export const OPEN_FROM_PTK_ID = 'c.3.1.3.2.1.1';
export const CLOSE_FROM_PTK_ID = 'c.3.2.3.2.1.1';

export const INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID = 'p.1.2';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID = 'p.2.2';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID = 'p.3.2';
export const INPUT_CIRCUIT_BREAKER_ID = [
	INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID,
	INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID,
	INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID,
]; //вводной автомат состоит из 3 элементов
export const CONTROL_CIRCUIT_BREAKER_ID = 'c.1'; // автомат питания цепей управления

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
	'c.2': 0.1,
	[LIMIT_SWITCH_OPEN_ID]: 0,
	'c.3.1.2': 0.1,
	'c.3.1.3.1': 0,
	[OPEN_FROM_PTK_ID]: 0,
	[OPEN_FROM_KRUZAP_ID]: 0,
	'c.3.1.3.2.2': 0,
	'c.3.1.3.2.3': 6400,
	'c.3.1.3.3': 4800,
	[LIMIT_SWITCH_CLOSE_ID]: 0,
	'c.3.2.2': 0.1,
	'c.3.2.3.1': 0,
	[CLOSE_FROM_PTK_ID]: 0,
	[CLOSE_FROM_KRUZAP_ID]: 0,
	'c.3.2.3.2.2': 0,
	'c.3.2.3.2.3': 6400,
	'c.3.2.3.3': 4800,
};

// Элементы схемы
export const SCHEME_ELEMENTS: { id: string; aria: string; type: Modals }[] = [
	{
		id: CLOSE_FROM_PTK_ID,
		aria: 'Вставка NDI (команда закрыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: OPEN_FROM_PTK_ID,
		aria: 'Вставка NDI (команда открыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: 'c.3.2.3.1',
		aria: 'Вставка NDI (сигнал «не закрыто»)',
		type: 'fusible_insert',
	},
	{
		id: 'c.3.1.3.1',
		aria: 'Вставка NDI (сигнал «не открыто»)',
		type: 'fusible_insert',
	},
	{
		id: 'c.3.2.3.2.3',
		aria: 'Катушка пускателя закрыть',
		type: 'starter_coil',
	},
	{
		id: 'c.3.1.3.2.3',
		aria: 'Катушка пускателя открыть',
		type: 'starter_coil',
	},
	{
		id: 'c.3.1.3.3',
		aria: 'Лампа в КРУЗА-П закрыто',
		type: 'lamps'
	},
	{
		id: 'c.3.2.3.3',
		aria: 'Лампа в КРУЗА-П открыто',
		type: 'lamps'
	},
	{
		id: CONTROL_CIRCUIT_BREAKER_ID,
		aria: 'Автомат питания цепей управления',
		type: 'automatic',
	},
	{
		id: 'c.3.1.3.2.2',
		aria: 'Блокировка включения пускателя на открытие',
		type: 'blocking_activation',
	},
	{
		id: 'c.3.2.3.2.2',
		aria: 'Блокировка включения пускателя на закрыть',
		type: 'blocking_activation',
	},
	{
		id: 'p.3.1',
		aria: 'Реверсивный пускатель',
		type: 'starter'
	},
	{
		id: OPEN_FROM_KRUZAP_ID,
		aria: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: CLOSE_FROM_KRUZAP_ID,
		aria: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: LIMIT_SWITCH_CLOSE_ID,
		aria: 'Концевой выключатель закрыто',
		type: 'block_switches',
	},
	{
		id: LIMIT_SWITCH_OPEN_ID,
		aria: 'Концевой выключатель открыто',
		type: 'block_switches',
	},
	{
		id: 'p.1.4.1.2',
		aria: 'Двигатель',
		type: 'motor',
	},
];

const powerCircuit = [
	[
		{
			id: 'p.1.1',
			name: 'Провод от фазы А до автомата',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.1.1.1',
					name: 'Короткое замыкание с фазой C',
					active: false,
				},
				{
					id: 'p.1.1.2',
					name: 'Короткое замыкание с фазой B',
					active: false,
				},
				{ id: 'p.1.1.3', name: 'Обрыв', active: false },
				{
					id: 'p.1.1.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{ id: 'p.1.1.5', name: 'Обрыв провода', active: false },
			],
		},
		{
			id: INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID,
			name: 'Сухой контакт фазы А автомата',
			resistance: 0,
			malfunctions: [
				{
					id: 'p.1.2.1',
					name: 'Плохой контакт на клемме, нет одной фазы',
					active: false,
				},
				{ id: 'p.1.2.2', name: 'Ложно выбивает', active: false },
				{
					id: 'p.1.2.3',
					name: 'Собирается механически, но нет коммутации',
					active: false,
				},
			],
		},
		{
			id: 'p.1.3',
			name: 'Провод фазы A от автомата до пускателей',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.1.3.1',
					name: 'Короткое замыкание с фазой C',
					active: false,
				},
				{
					id: 'p.1.3.2',
					name: 'Короткое замыкание с фазой B',
					active: false,
				},
				{ id: 'p.1.3.3', name: 'Обрыв', active: false },
				{
					id: 'p.1.3.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
			],
		},
		[
			[
				{
					id: 'p.1.4.1.1',
					name: 'Контакты пускателя открыть фаза A',
					resistance: 1000000000,
					malfunctions: [
						{
							id: 'p.1.4.1.1.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'p.1.4.1.1.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'p.1.4.1.1.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
				{
					id: 'p.1.4.1.2',
					name: 'Фаза A от пускателя до двигателя',
					resistance: 0.1,
					malfunctions: [
						{
							id: 'p.1.4.1.2.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'p.1.4.1.2.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{ id: 'p.1.4.1.2.3', name: 'Обрыв', active: false },
						{
							id: 'p.1.4.1.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'p.1.4.1.3',
					name: 'Электродвигатель задвижки, обмотка фазы А',
					resistance: 4.1,
					malfunctions: [
						{
							id: 'p.1.4.1.3.1',
							name: 'Обрыв фазы',
							active: false,
						},
						{
							id: 'p.1.4.1.3.2',
							name: 'Короткое замыкание между фазами',
							active: false,
						},
						{
							id: 'p.1.4.1.3.3',
							name: 'Короткое замыкание обмотки на землю',
							active: false,
						},
					],
				},
			],
			[
				{
					id: 'p.1.4.2.1',
					name: 'Контакты пускателя закрыть фаза С',
					resistance: 1000000000,
					malfunctions: [
						{
							id: 'p.1.4.2.1.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'p.1.4.2.1.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'p.1.4.2.1.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
				{
					id: 'p.1.4.2.2',
					name: 'Фаза С от пускателя до двигателя',
					resistance: 0.1,
					malfunctions: [
						{
							id: 'p.1.4.2.2.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'p.1.4.2.2.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{ id: 'p.1.4.2.2.3', name: 'Обрыв', active: false },
						{
							id: 'p.1.4.2.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'p.1.4.2.3',
					name: 'Электродвигатель задвижки, обмотка фазы С',
					resistance: 4.1,
					malfunctions: [
						{
							id: 'p.1.4.2.3.1',
							name: 'Обрыв фазы',
							active: false,
						},
						{
							id: 'p.1.4.2.3.2',
							name: 'Короткое замыкание между фазами',
							active: false,
						},
						{
							id: 'p.1.4.2.3.3',
							name: 'Короткое замыкание обмотки на землю',
							active: false,
						},
					],
				},
			],
		],
	],
	[
		{
			id: 'p.2.1',
			name: 'Провод от фазы В до автомата',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.2.1.1',
					name: 'Короткое замыкание с фазой A',
					active: false,
				},
				{
					id: 'p.2.1.2',
					name: 'Короткое замыкание с фазой C',
					active: false,
				},
				{ id: 'p.2.1.3', name: 'Обрыв', active: false },
				{
					id: 'p.2.1.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{ id: 'p.2.1.5', name: 'Обрыв провода', active: false },
			],
		},
		{
			id: INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID,
			name: 'Сухой контакт фазы С автомата',
			resistance: 0,
			malfunctions: [
				{
					id: 'p.2.2.1',
					name: 'Плохой контакт на клемме',
					active: false,
				},
				{ id: 'p.2.2.2', name: 'Ложное срабатывание', active: false },
				{ id: 'p.2.2.3', name: 'Нет коммутации', active: false },
			],
		},
		{
			id: 'p.2.3',
			name: 'Провод фазы B от автомата до пускателей',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.2.3.1',
					name: 'Короткое замыкание с фазой A',
					active: false,
				},
				{
					id: 'p.2.3.2',
					name: 'Короткое замыкание с фазой C',
					active: false,
				},
				{ id: 'p.2.3.3', name: 'Обрыв', active: false },
				{
					id: 'p.2.3.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
			],
		},
		[
			{
				id: 'p.2.4.1',
				name: 'Контакты пускателя открыть фаза В',
				resistance: 1000000000,
				malfunctions: [
					{
						id: 'p.2.4.1.1',
						name: 'Неисправна катушка, пускатель не подтягивается',
						active: false,
					},
					{
						id: 'p.2.4.1.2',
						name: 'Нет контакта в контактной группе',
						active: false,
					},
					{
						id: 'p.2.4.1.3',
						name: 'Залипший контакт в контактной группе',
						active: false,
					},
				],
			},
			{
				id: 'p.2.4.2',
				name: 'Контакты пускателя закрыть фаза В',
				resistance: 1000000000,
				malfunctions: [
					{
						id: 'p.2.4.2.1',
						name: 'Неисправна катушка, пускатель не подтягивается',
						active: false,
					},
					{
						id: 'p.2.4.2.2',
						name: 'Нет контакта в контактной группе',
						active: false,
					},
					{
						id: 'p.2.4.2.3',
						name: 'Залипший контакт в контактной группе',
						active: false,
					},
				],
			},
		],
		{
			id: 'p.2.5',
			name: 'Фаза В от пускателя до двигателя',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.2.5.1',
					name: 'Короткое замыкание с фазой А',
					active: false,
				},
				{
					id: 'p.2.5.2',
					name: 'Короткое замыкание с фазой B',
					active: false,
				},
				{ id: 'p.2.5.3', name: 'Обрыв', active: false },
				{
					id: 'p.2.5.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
			],
		},
		{
			id: 'p.2.6',
			name: 'Электродвигатель задвижки, обмотка фазы В',
			resistance: 4.1,
			malfunctions: [
				{ id: 'p.2.6.1', name: 'Обрыв фазы', active: false },
				{
					id: 'p.2.6.2',
					name: 'Короткое замыкание между фазами',
					active: false,
				},
				{
					id: 'p.2.6.3',
					name: 'Короткое замыкание обмотки на землю',
					active: false,
				},
			],
		},
	],
	[
		{
			id: 'p.3.1',
			name: 'Провод от фазы С до автомата',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.3.1.1',
					name: 'Короткое замыкание с фазой A',
					active: false,
				},
				{
					id: 'p.3.1.2',
					name: 'Короткое замыкание с фазой B',
					active: false,
				},
				{ id: 'p.3.1.3', name: 'Обрыв', active: false },
				{
					id: 'p.3.1.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{ id: 'p.3.1.5', name: 'Обрыв провода', active: false },
			],
		},
		{
			id: INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID,
			name: 'Сухой контакт фазы С автомата',
			resistance: 0,
			malfunctions: [
				{
					id: 'p.3.2.1',
					name: 'Плохой контакт на клемме, нет фазы',
					active: false,
				},
				{ id: 'p.3.2.2', name: 'Ложно выбивает', active: false },
				{
					id: 'p.3.2.3',
					name: 'Механическая сборка есть, но нет коммутации',
					active: false,
				},
			],
		},
		{
			id: 'p.3.3',
			name: 'Провод фазы C от автомата до пускателей',
			resistance: 0.1,
			malfunctions: [
				{
					id: 'p.3.3.1',
					name: 'Короткое замыкание с фазой A',
					active: false,
				},
				{
					id: 'p.3.3.2',
					name: 'Короткое замыкание с фазой B',
					active: false,
				},
				{ id: 'p.3.3.3', name: 'Обрыв', active: false },
				{
					id: 'p.3.3.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
			],
		},
		[
			[
				{
					id: 'p.3.4.1.1',
					name: 'Контакты пускателя открыть фаза С',
					resistance: 1000000000,
					malfunctions: [
						{
							id: 'p.3.4.1.1.1',
							name: 'Неисправна катушка, пускатель не срабатывает',
							active: false,
						},
						{
							id: 'p.3.4.1.1.2',
							name: 'Нет контакта в группе',
							active: false,
						},
						{
							id: 'p.3.4.1.1.3',
							name: 'Залипание контактов',
							active: false,
						},
					],
				},
				{
					id: 'p.3.4.1.2',
					name: 'Фаза С от пускателя до двигателя',
					resistance: 0.1,
					malfunctions: [
						{
							id: 'p.3.4.1.2.1',
							name: 'Короткое замыкание с фазой A',
							active: false,
						},
						{
							id: 'p.3.4.1.2.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{ id: 'p.3.4.1.2.3', name: 'Обрыв', active: false },
						{
							id: 'p.3.4.1.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'p.3.4.1.3',
					name: 'Электродвигатель задвижки, обмотка фазы C',
					resistance: 4.1,
					malfunctions: [
						{
							id: 'p.3.4.1.3.1',
							name: 'Обрыв фазы',
							active: false,
						},
						{
							id: 'p.3.4.1.3.2',
							name: 'Короткое замыкание между фазами',
							active: false,
						},
						{
							id: 'p.3.4.1.3.3',
							name: 'Короткое замыкание обмотки на корпус',
							active: false,
						},
					],
				},
			],
			[
				{
					id: 'p.3.4.2.1',
					name: 'Контакты пускателя закрыть фаза A',
					resistance: 1000000000,
					malfunctions: [
						{
							id: 'p.3.4.2.1.1',
							name: 'Неисправна катушка, пускатель не подтягивается',
							active: false,
						},
						{
							id: 'p.3.4.2.1.2',
							name: 'Нет контакта в контактной группе',
							active: false,
						},
						{
							id: 'p.3.4.2.1.3',
							name: 'Залипший контакт в контактной группе',
							active: false,
						},
					],
				},
				{
					id: 'p.3.4.2.2',
					name: 'Фаза A от пускателя до двигателя',
					resistance: 0.1,
					malfunctions: [
						{
							id: 'p.3.4.2.2.1',
							name: 'Короткое замыкание с фазой C',
							active: false,
						},
						{
							id: 'p.3.4.2.2.2',
							name: 'Короткое замыкание с фазой B',
							active: false,
						},
						{ id: 'p.3.4.2.2.3', name: 'Обрыв', active: false },
						{
							id: 'p.3.4.2.2.4',
							name: 'Короткое замыкание на землю',
							active: false,
						},
					],
				},
				{
					id: 'p.3.4.2.3',
					name: 'Электродвигатель задвижки, обмотка фазы А',
					resistance: 4.1,
					malfunctions: [
						{
							id: 'p.3.4.2.3.1',
							name: 'Обрыв фазы',
							active: false,
						},
						{
							id: 'p.3.4.2.3.2',
							name: 'Короткое замыкание между фазами',
							active: false,
						},
						{
							id: 'p.3.4.2.3.3',
							name: 'Короткое замыкание обмотки на землю',
							active: false,
						},
					],
				},
			],
		],
	],
];

export const controlCircuit: CircuitBranch[] = [
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	avtomatPitaniyaSkhemyUpravleniya,
	provodOtAvtomataDoSoyedinitelnojKorobki,
	[
		[
			provodVSoyedinitelnojKorobkeNaVetkuOtkrytiya,
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			kontsevojVyklyuchatelOtkryto,
			provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZA_P,
			[
				provodOtKRUZA_PDoVstavkiNDIOtkryto,
				vstavkaNDIOtkryto,
				provodOtVstavkiNDIOtkrytoDoNejtrali,
			],
			[
				provodOtKRUZA_PDoVstavkiNDOOtkryt,
				vstavkaNDOOtkryt,
				provodOtVstavkiNDOOtkrytDoKlemmikaKRUZA_P,
			],
			[
				provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyOtkrytiyaPuskatelyaZakryto,
				kontaktyBlokirovkiPuskatelyaZakryto,
				provodOtKontaktovBlokirovkiPuskatelyaZakrytoNaKatushechkuPuskatelyaOtkryto,
				katushechkaPuskatelyaOtkryt,
			],
			[
				provodOtKlemmikaKRUZA_PDoKnopkiOtkryt,
				knopkaOtkryt,
				provodOtKnopkiOtkrytDoKlemmikaKRUZA_P,
			],
			[
				provodOtKlemmikaKRUZA_PDoLampyZakryto,
				lampaZakryto,
				provodOtLampyZakrytoDoNejtrali,
			],
		],
		[
			provodVSoyedinitelnojKorobkeNaVetkuZakrytiya,
			provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			kontsevojVyklyuchatelZakryto,
			provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZA_P,
			[
				provodOtKRUZA_PDoVstavkiNDIZakryto,
				vstavkaNDIZakryto,
				provodOtVstavkiNDIZakrytoDoNejtrali,
			],
			[
				provodOtKRUZA_PDoVstavkiNDOZakryt,
				vstavkaNDOZakryt,
				provodOtVstavkiNDOZakrytDoKlemmikaKRUZA_P,
			],
			[
				provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyZakrytiyaPuskatelyaOtkryto,
				kontaktyBlokirovkiPuskatelyaOtkryto,
				provodOtKontaktovBlokirovkiPuskatelyaOtkrytoNaKatushechkuPuskatelyaZakryto,
				katushechkaPuskatelyaZakryt,
			],
			[
				provodOtKlemmikaKRUZA_PDoKnopkiZakryt,
				knopkaZakryt,
				provodOtKnopkiZakrytDoKlemmikaKRUZA_P,
			],
			[
				provodOtKlemmikaKRUZA_PDoLampyOtkryto,
				lampaOtkryto,
				provodOtLampyOtkrytoDoNejtrali,
			],
		],
	],
];

export const initialStateScheme: InitialStateScheme = {
	powerCircuit: powerCircuit,
	controlCircuit: controlCircuit,
};
