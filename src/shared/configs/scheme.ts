import { Modals } from '@/store/modalSlice';
import { CircuitBranch, CircuitElement, InitialStateScheme } from '../types/scheme';
import { controlCircuitElements } from './controlCircuit.vars';

export const controlCircuitElementsMap = {
	provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya: controlCircuitElements.C0,
	avtomatPitaniyaSkhemyUpravleniya: controlCircuitElements.C1,
	provodOtAvtomataDoSoyedinitelnojKorobki: controlCircuitElements.C2,
	provodVSoyedinitelnojKorobkeNaVetkuOtkrytiya: controlCircuitElements.C3_0_0,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto: controlCircuitElements.C3_0_1,
	kontsevojVyklyuchatelOtkryto: controlCircuitElements.C3_0_2,
	provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZA_P: controlCircuitElements.C3_0_3,
	provodOtKRUZA_PDoVstavkiNDIOtkryto: controlCircuitElements.C3_0_4_0_0,
	vstavkaNDIOtkryto: controlCircuitElements.C3_0_4_0_1,
	provodOtVstavkiNDIOtkrytoDoNejtrali: controlCircuitElements.C3_0_4_0_2,
	provodOtKRUZA_PDoVstavkiNDOOtkryt: controlCircuitElements.C3_0_4_1_0_0_0,
	vstavkaNDOOtkryt: controlCircuitElements.C3_0_4_1_0_0_1,
	provodOtVstavkiNDOOtkrytDoKlemmikaKRUZA_P: controlCircuitElements.C3_0_4_1_0_0_2,
	provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyOtkrytiyaPuskatelyaZakryto: controlCircuitElements.C3_0_0_1_0,
	kontaktyBlokirovkiPuskatelyaZakryto: controlCircuitElements.C3_0_0_1_1,
	provodOtKontaktovBlokirovkiPuskatelyaZakrytoNaKatushechkuPuskatelyaOtkryto: controlCircuitElements.C3_0_0_1_2,
	katushechkaPuskatelyaOtkryt: controlCircuitElements.C3_0_0_1_4,
	provodOtKlemmikaKRUZA_PDoKnopkiOtkryt: controlCircuitElements.C3_0_4_1_0_1_0,
	knopkaOtkryt: controlCircuitElements.C3_0_4_1_0_1_1,
	provodOtKnopkiOtkrytDoKlemmikaKRUZA_P: controlCircuitElements.C3_0_4_1_0_1_2,
	provodOtKlemmikaKRUZA_PDoLampyZakryto: controlCircuitElements.C3_0_4_2_0,
	lampaZakryto: controlCircuitElements.C3_0_4_2_1,
	provodOtLampyZakrytoDoNejtrali: controlCircuitElements.C3_0_4_2_2,
	provodVSoyedinitelnojKorobkeNaVetkuZakrytiya: controlCircuitElements.C3_1_0,
	provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto: controlCircuitElements.C3_1_1,
	kontsevojVyklyuchatelZakryto: controlCircuitElements.C3_1_2,
	provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZA_P: controlCircuitElements.C3_1_3,
	provodOtKRUZA_PDoVstavkiNDIZakryto: controlCircuitElements.C3_1_4_0_0,
	vstavkaNDIZakryto: controlCircuitElements.C3_1_4_0_1,
	provodOtVstavkiNDIZakrytoDoNejtrali: controlCircuitElements.C3_1_4_0_2,
	provodOtKRUZA_PDoVstavkiNDOZakryt: controlCircuitElements.C3_1_4_1_0_0_0,
	vstavkaNDOZakryt: controlCircuitElements.C3_1_4_1_0_0_1,
	provodOtVstavkiNDOZakrytDoKlemmikaKRUZA_P: controlCircuitElements.C3_1_4_1_0_0_2,
	provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyZakrytiyaPuskatelyaOtkryto: controlCircuitElements.C3_1_0_1_0,
	kontaktyBlokirovkiPuskatelyaOtkryto: controlCircuitElements.C3_1_0_1_1,
	provodOtKontaktovBlokirovkiPuskatelyaOtkrytoNaKatushechkuPuskatelyaZakryto: controlCircuitElements.C3_1_0_1_2,
	katushechkaPuskatelyaZakryt: controlCircuitElements.C3_1_0_1_4,
	provodOtKlemmikaKRUZA_PDoKnopkiZakryt: controlCircuitElements.C3_1_4_1_0_1_0,
	knopkaZakryt: controlCircuitElements.C3_1_4_1_0_1_1,
	provodOtKnopkiZakrytDoKlemmikaKRUZA_P: controlCircuitElements.C3_1_4_1_0_1_2,
	provodOtKlemmikaKRUZA_PDoLampyOtkryto: controlCircuitElements.C3_1_4_2_0,
	lampaOtkryto: controlCircuitElements.C3_1_4_2_1,
	provodOtLampyOtkrytoDoNejtrali: controlCircuitElements.C3_1_4_2_2,
} as const satisfies Record<string, CircuitElement>;

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

export const controlCircuit = [
	controlCircuitElementsMap.provodOtSilovojChastiSkhemyKAvtomatuPitaniyaUpravleniya,
	controlCircuitElementsMap.avtomatPitaniyaSkhemyUpravleniya,
	controlCircuitElementsMap.provodOtAvtomataDoSoyedinitelnojKorobki,
	[
		[
			controlCircuitElementsMap.provodVSoyedinitelnojKorobkeNaVetkuOtkrytiya,
			controlCircuitElementsMap.provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaOtkryto,
			controlCircuitElementsMap.kontsevojVyklyuchatelOtkryto,
			controlCircuitElementsMap.provodOtKontsevogoVyklyuchatelyaOtkrytoDoKlemmikaKRUZA_P,
			[
				controlCircuitElementsMap.provodOtKRUZA_PDoVstavkiNDIOtkryto,
				controlCircuitElementsMap.vstavkaNDIOtkryto,
				controlCircuitElementsMap.provodOtVstavkiNDIOtkrytoDoNejtrali,
			],
			[
				controlCircuitElementsMap.provodOtKRUZA_PDoVstavkiNDOOtkryt,
				controlCircuitElementsMap.vstavkaNDOOtkryt,
				controlCircuitElementsMap.provodOtVstavkiNDOOtkrytDoKlemmikaKRUZA_P,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyOtkrytiyaPuskatelyaZakryto,
				controlCircuitElementsMap.kontaktyBlokirovkiPuskatelyaZakryto,
				controlCircuitElementsMap.provodOtKontaktovBlokirovkiPuskatelyaZakrytoNaKatushechkuPuskatelyaOtkryto,
				controlCircuitElementsMap.katushechkaPuskatelyaOtkryt,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoKnopkiOtkryt,
				controlCircuitElementsMap.knopkaOtkryt,
				controlCircuitElementsMap.provodOtKnopkiOtkrytDoKlemmikaKRUZA_P,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoLampyZakryto,
				controlCircuitElementsMap.lampaZakryto,
				controlCircuitElementsMap.provodOtLampyZakrytoDoNejtrali,
			],
		],
		[
			controlCircuitElementsMap.provodVSoyedinitelnojKorobkeNaVetkuZakrytiya,
			controlCircuitElementsMap.provodOtSoyedinitelnojKorobkiDoKontsevogoVyklyuchatelyaZakryto,
			controlCircuitElementsMap.kontsevojVyklyuchatelZakryto,
			controlCircuitElementsMap.provodOtKontsevogoVyklyuchatelyaZakrytoDoKlemmikaKRUZA_P,
			[
				controlCircuitElementsMap.provodOtKRUZA_PDoVstavkiNDIZakryto,
				controlCircuitElementsMap.vstavkaNDIZakryto,
				controlCircuitElementsMap.provodOtVstavkiNDIZakrytoDoNejtrali,
			],
			[
				controlCircuitElementsMap.provodOtKRUZA_PDoVstavkiNDOZakryt,
				controlCircuitElementsMap.vstavkaNDOZakryt,
				controlCircuitElementsMap.provodOtVstavkiNDOZakrytDoKlemmikaKRUZA_P,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoKontaktovBlokirovkiSkhemyZakrytiyaPuskatelyaOtkryto,
				controlCircuitElementsMap.kontaktyBlokirovkiPuskatelyaOtkryto,
				controlCircuitElementsMap.provodOtKontaktovBlokirovkiPuskatelyaOtkrytoNaKatushechkuPuskatelyaZakryto,
				controlCircuitElementsMap.katushechkaPuskatelyaZakryt,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoKnopkiZakryt,
				controlCircuitElementsMap.knopkaZakryt,
				controlCircuitElementsMap.provodOtKnopkiZakrytDoKlemmikaKRUZA_P,
			],
			[
				controlCircuitElementsMap.provodOtKlemmikaKRUZA_PDoLampyOtkryto,
				controlCircuitElementsMap.lampaOtkryto,
				controlCircuitElementsMap.provodOtLampyOtkrytoDoNejtrali,
			],
		],
	],
] satisfies CircuitBranch[];

export const initialStateScheme: InitialStateScheme = {
	powerCircuit: powerCircuit,
	controlCircuit: controlCircuit,
};
