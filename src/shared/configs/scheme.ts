import { IPoint, ISchemeElement, InitialStateScheme } from '../types/scheme';

// id элементов схемы
export const LIMIT_SWITCH_OPEN_ID = 'c.3.1.1';
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.2.1';

export const OPEN_FROM_KRUZAP_ID = 'c.3.1.3.2.1.2';
export const CLOSE_FROM_KRUZAP_ID = 'c.3.2.3.2.1.2';
export const OPEN_FROM_PTK_ID = 'c.3.1.3.2.1.1';
export const CLOSE_FROM_PTK_ID = 'c.3.2.3.2.1.1';

export const INPUT_CIRCUIT_BREAKER_PHASE_A = 'p.1.2';
export const INPUT_CIRCUIT_BREAKER_PHASE_B = 'p.2.2';
export const INPUT_CIRCUIT_BREAKER_PHASE_C = 'p.3.2';
export const INPUT_CIRCUIT_BREAKER = [
	INPUT_CIRCUIT_BREAKER_PHASE_A,
	INPUT_CIRCUIT_BREAKER_PHASE_B,
	INPUT_CIRCUIT_BREAKER_PHASE_C,
]; //вводной автомат состоит из 3 элементов
export const CONTROL_CIRCUIT_BREAKER = 'c.1'; // автомат питания цепей управления

// Значение сопротивления при обрыве или при размыкании цепи
export const HIGH_RESISTANCE = 1_000_000_000;

export const BASE_RESISTANCE: Record<string, number> = {
	'p.1.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_PHASE_A]: 0,
	'p.1.3': 0.1,
	'p.1.4.1.1': 0,
	'p.1.4.1.2': 0.1,
	'p.1.4.1.3': 4100,
	'p.2.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_PHASE_B]: 0,
	'p.2.3': 0.1,
	'p.2.4.1': 0,
	'p.2.4.2': 0,
	'p.2.5': 0.1,
	'p.2.6': 4100,
	'p.3.1': 0.1,
	[INPUT_CIRCUIT_BREAKER_PHASE_C]: 0,
	'p.3.3': 0.1,
	'p.3.4.1': 0,
	'p.3.4.1.2': 0.1,
	'p.3.4.1.3': 4100,
	[CONTROL_CIRCUIT_BREAKER]: 0,
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
export const SCHEME_ELEMENTS: ISchemeElement[] = [
	{
		title: 'Какое-то название',
		icon: 'yb08',
		id: CLOSE_FROM_PTK_ID,
	},
	{
		title: 'Какое-то название',
		icon: 'yb08',
		id: OPEN_FROM_PTK_ID,
		buttons: [
			{
				id: 'btn4',
				text: 'ОК',
			},
			{
				id: 'btn5',
				text: 'дополнительная кнопка',
			},
		],
	},
	{
		title: 'Какое-то название',
		icon: 'xb10',
		id: 'c.3.2.3.1',
	},
	{
		title: 'Какое-то название',
		icon: 'xb10',
		id: 'c.3.1.3.1',
	},
	{
		title: 'Какое-то название',
		icon: 'cabinet',
		id: 'c.3.2.3.2.3',
		buttons: [
			{
				id: 'btn6',
				text: 'ОК',
			},
			{
				id: 'btn7',
				text: 'дополнительная кнопка',
			},
		],
	},
	{
		title: 'Какое-то название',
		icon: 'cabinet',
		id: 'c.3.1.3.2.3',
	},
	{
		title: 'Какое-то название',
		icon: 'lamp',
		id: 'c.3.1.3.3',
		buttons: [
			{
				id: 'btn6',
				text: 'lamp',
			},
		],
	},
	{
		title: 'Какое-то название',
		icon: 'lamp',
		id: 'c.3.2.3.3',
	},
	// {
	// 	title: 'Какое-то название',
	// 	icon: 'engine',
	// 	id: 'p.5',
	// },
	{
		title: 'Какое-то название',
		icon: 'f01',
		id: CONTROL_CIRCUIT_BREAKER,
	},
	{
		title: 'Какое-то название',
		icon: 'n322',
		id: 'c.3.1.3.2.2',
	},
	{
		title: 'Какое-то название',
		icon: 'n322',
		id: 'c.3.2.3.2.2',
	},
	{
		title: 'Какое-то название',
		icon: 'p31',
		id: 'p.3.1',
	},
	{
		title: 'Какое-то название',
		icon: 'q01',
		id: 'p.1',
	},
	{
		title: 'Какое-то название',
		icon: 's01',
		id: OPEN_FROM_KRUZAP_ID,
	},
	{
		title: 'Какое-то название',
		icon: 's01',
		id: CLOSE_FROM_KRUZAP_ID,
	},
	{
		title: 'Какое-то название',
		icon: 'sq3',
		id: LIMIT_SWITCH_CLOSE_ID,
	},
	{
		title: 'Какое-то название',
		icon: 'sq3',
		id: LIMIT_SWITCH_OPEN_ID,
	},
];

// Точки для подключения щупов на схеме
export const SCHEME_POINTS: Record<string, IPoint> = {
	'p.p.1.0': { x: 87, y: 12, state: true },
	'p.p.2.0': { x: 129, y: 27, state: true },
	'p.p.3.0': { x: 171, y: 42, state: true },

	'p.p.1.1': { x: 87, y: 150, state: true },
	'p.p.2.1': { x: 129, y: 150, state: true },
	'p.p.3.1': { x: 171, y: 150, state: true },

	'p.p.1.2': { x: 86, y: 188, state: true },
	'p.p.2.2': { x: 129, y: 187, state: true },
	'p.p.3.2': { x: 170, y: 187, state: true },

	'p.p.1.3.1': { x: 86, y: 355, state: true },
	'p.p.2.3.1': { x: 129, y: 355, state: true },
	'p.p.3.3.1': { x: 170, y: 355, state: true },
	'p.p.1.3.2': { x: 208, y: 355, state: true },
	'p.p.2.3.2': { x: 242, y: 355, state: true },
	'p.p.3.3.2': { x: 276, y: 355, state: true },

	'p.p.1.4.1.1': { x: 87, y: 398, state: false },
	'p.p.2.4.1': { x: 128, y: 398, state: false },
	'p.p.3.4.1.1': { x: 171, y: 398, state: false },
	'p.p.1.4.2.1': { x: 200, y: 398, state: false },
	'p.p.2.4.2': { x: 240, y: 398, state: false },
	'p.p.3.4.2.1': { x: 272, y: 398, state: false },

	'p.p.1.4.1.2': { x: 87, y: 578, state: false },
	'p.p.2.5': { x: 128, y: 578, state: false },
	'p.p.3.4.1.2': { x: 171, y: 578, state: false },

	'p.p.n': { x: 129, y: 647, state: false },

	'p.c.0': { x: 86, y: 217, state: true },
	'p.c.1': { x: 320, y: 215, state: true },
	'p.c.2': { x: 370, y: 215, state: true },

	'p.с.3.1.1': { x: 518, y: 215, state: true },
	'p.с.3.1.2': { x: 595, y: 215, state: true },
	'p.с.3.1.3.2.1': { x: 776, y: 216, state: false },
	'p.с.3.1.3.2.2': { x: 849, y: 215, state: false },

	'p.с.3.2.1': { x: 518, y: 480, state: true },
	'p.с.3.2.2': { x: 594, y: 480, state: true },
	'p.с.3.2.3.2.1': { x: 766, y: 480, state: false },
	'p.с.3.2.3.2.2': { x: 847, y: 480, state: false },

	'p.c.n': { x: 947, y: 215, state: false },
};

export const pointsState = extractStates(SCHEME_POINTS);

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
			id: INPUT_CIRCUIT_BREAKER_PHASE_A,
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
			id: INPUT_CIRCUIT_BREAKER_PHASE_B,
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
			id: INPUT_CIRCUIT_BREAKER_PHASE_C,
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

const controlCircuit = [
	{
		id: CONTROL_CIRCUIT_BREAKER,
		name: 'Автомат питания цепей управления',
		resistance: 0,
		malfunctions: [
			{
				id: 'c.1.1',
				name: 'Плохой контакт на клемме, нет фазы',
				active: false,
			},
			{
				id: 'c.1.2',
				name: 'Ложно выбивает',
				active: false,
			},
			{
				id: 'c.1.3',
				name: 'Собирается механически, но нет коммутации',
				active: false,
			},
		],
	},
	{
		id: 'c.2',
		name: 'Провод фазы после автомата',
		resistance: 0.1,
		malfunctions: [
			{
				id: 'c.2.1',
				name: 'Обрыв провода',
				active: false,
			},
			{
				id: 'c.2.2',
				name: 'Короткое замыкание на землю',
				active: false,
			},
			{
				id: 'c.2.3',
				name: 'Короткое замыкание с проводом от фазы на концевой выключатель закрыто',
				active: false,
			},
			{
				id: 'c.2.4',
				name: 'Короткое замыкание с проводом фазы двигателя',
				active: false,
			},
		],
	},
	[
		[
			//ветка открыть
			{
				id: LIMIT_SWITCH_OPEN_ID,
				name: 'Концевой выключатель открыто',
				resistance: 0,
				malfunctions: [
					{
						id: 'c.3.1.1.1',
						name: 'Залипший контакт',
						active: false,
					},
					{
						id: 'c.3.1.1.2',
						name: 'Нет контакта',
						active: false,
					},
					{
						id: 'c.3.1.1.3',
						name: 'Не настроен',
						active: false,
					},
				],
			},
			{
				id: 'c.3.1.2',
				name: 'Провод концевого выключателя открыто до клемника КРУЗА-П',
				resistance: 0.1,
				malfunctions: [
					{
						id: 'c.3.1.2.1',
						name: 'Обрыв провода',
						active: false,
					},
					{
						id: 'c.3.1.2.2',
						name: 'Короткое замыкание на землю',
						active: false,
					},
					{
						id: 'c.3.1.2.3',
						name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
						active: false,
					},
					{
						id: 'c.3.1.2.4',
						name: 'Короткое замыкание с проводом фазы двигателя',
						active: false,
					},
				],
			},
			[
				{
					id: 'c.3.1.3.1',
					name: 'Вставка NDI (сигнал «не открыто»)',
					resistance: 0,
					malfunctions: [
						{
							id: 'c.3.1.3.1.1',
							name: 'Нет контакта, сигнал не проходит',
							active: false,
						},
						{
							id: 'c.3.1.3.1.2',
							name: 'Ложно сработанная, сигнал не снимается',
							active: false,
						},
					],
				},
				[
					[
						{
							id: OPEN_FROM_PTK_ID,
							name: 'Вставка NDI (команда открыть с ПТК)',
							resistance: 1000000000,
							malfunctions: [
								{
									id: 'c.3.1.3.2.1.1.1',
									name: 'Нет контакта, команда не уходит',
									active: false,
								},
								{
									id: 'c.3.1.3.2.1.1.2',
									name: 'Ложно сработанная, команда постоянно висит',
									active: false,
								},
							],
						},
						{
							id: OPEN_FROM_KRUZAP_ID,
							name: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
							resistance: 1000000000,
							malfunctions: [
								{
									id: 'c.3.1.3.2.1.2.1',
									name: 'Нет контакта, команда не уходит',
									active: false,
								},
								{
									id: 'c.3.1.3.2.1.2.2',
									name: 'Ложно сработанная, команда постоянно висит',
									active: false,
								},
							],
						},
					],
					{
						id: 'c.3.1.3.2.2',
						name: 'Блокировка включения пускателя на открытие',
						resistance: BASE_RESISTANCE['c.3.1.3.2.2'],
						malfunctions: [
							{
								id: 'c.3.1.3.2.2.1',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'c.3.1.3.2.2.2',
								name: 'Ложно сработанный контакт',
								active: false,
							},
						],
					},
					{
						id: 'c.3.1.3.2.3',
						name: 'Катушка пускателя открыть',
						resistance: BASE_RESISTANCE['c.3.1.3.2.3'],
						malfunctions: [
							{
								id: 'c.3.1.3.2.3.1',
								name: 'Неисправна катушка, пускатель не подтягивается',
								active: false,
							},
						],
					},
				],
				{
					id: 'c.3.1.3.3',
					name: 'Лампа в КРУЗА-П закрыто',
					resistance: 4800,
					malfunctions: [
						{
							id: 'c.3.1.3.3.1',
							name: 'Перегорела',
							active: false,
						},
					],
				},
			],
		],
		[
			//ветка закрыть
			{
				id: LIMIT_SWITCH_CLOSE_ID,
				name: 'Концевой выключатель закрыто',
				resistance: 0,
				malfunctions: [
					{
						id: 'c.3.2.1.1',
						name: 'Залипший контакт',
						active: false,
					},
					{
						id: 'c.3.2.1.2',
						name: 'Нет контакта',
						active: false,
					},
					{
						id: 'c.3.2.1.3',
						name: 'Не настроен',
						active: false,
					},
				],
			},
			{
				id: 'c.3.2.2',
				name: 'Провод концевого выключателя закрыто до клемника КРУЗА-П',
				resistance: 0.1,
				malfunctions: [
					{
						id: 'c.3.2.2.1',
						name: 'Обрыв провода',
						active: false,
					},
					{
						id: 'c.3.2.2.2',
						name: 'Короткое замыкание на землю',
						active: false,
					},
					{
						id: 'c.3.2.2.3',
						name: 'Короткое замыкание с проводом концевого выключателя закрыто до клемника КРУЗА-П',
						active: false,
					},
					{
						id: 'c.3.2.2.4',
						name: 'Короткое замыкание с проводом фазы двигателя',
						active: false,
					},
				],
			},
			[
				{
					id: 'c.3.2.3.1',
					name: 'Вставка NDI (сигнал «не закрыто»)',
					resistance: 0,
					malfunctions: [
						{
							id: 'c.3.2.3.1.1',
							name: 'Нет контакта, сигнал не проходит',
							active: false,
						},
						{
							id: 'c.3.2.3.1.2',
							name: 'Ложно сработанная, сигнал не снимается',
							active: false,
						},
					],
				},
				[
					[
						{
							id: CLOSE_FROM_PTK_ID,
							name: 'Вставка NDI (команда закрыть с ПТК)',
							resistance: 1000000000,
							malfunctions: [
								{
									id: 'c.3.2.3.2.1.1.1',
									name: 'Нет контакта, команда не уходит',
									active: false,
								},
								{
									id: 'c.3.2.3.2.1.1.2',
									name: 'Ложно сработанная, команда постоянно висит',
									active: false,
								},
							],
						},
						{
							id: CLOSE_FROM_KRUZAP_ID,
							name: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
							resistance: 1000000000,
							malfunctions: [
								{
									id: 'c.3.2.3.2.1.2.1',
									name: 'Нет контакта, команда не уходит',
									active: false,
								},
								{
									id: 'c.3.2.3.2.1.2.2',
									name: 'Ложно сработанная, команда постоянно висит',
									active: false,
								},
							],
						},
					],
					{
						id: 'c.3.2.3.2.2',
						name: 'Блокировка включения пускателя на закрыть',
						resistance: BASE_RESISTANCE['c.3.1.3.2.2'],
						malfunctions: [
							{
								id: 'c.3.2.3.2.2.1',
								name: 'Нет контакта',
								active: false,
							},
							{
								id: 'c.3.2.3.2.2.2',
								name: 'Ложно сработанный контакт',
								active: false,
							},
						],
					},
					{
						id: 'c.3.2.3.2.3',
						name: 'Катушка пускателя закрыть',
						resistance: BASE_RESISTANCE['c.3.1.3.2.3'],
						malfunctions: [
							{
								id: 'c.3.2.3.2.3.1',
								name: 'Неисправна катушка, пускатель не подтягивается',
								active: false,
							},
						],
					},
				],
				{
					id: 'c.3.2.3.3',
					name: 'Лампа в КРУЗА-П открыто',
					resistance: 4800,
					malfunctions: [
						{
							id: 'c.3.2.3.3.1',
							name: 'Перегорела',
							active: false,
						},
					],
				},
			],
		],
	],
];

export const initialStateScheme: InitialStateScheme = {
	powerCircuit: powerCircuit,
	controlCircuit: controlCircuit,
};
function extractStates(SCHEME_POINTS: Record<string, IPoint>) {
	const result: Record<string, boolean> = {};

	for (const key in SCHEME_POINTS) {
		if (SCHEME_POINTS.hasOwnProperty(key)) {
			result[key] = SCHEME_POINTS[key].state;
		}
	}
	return result;
}
