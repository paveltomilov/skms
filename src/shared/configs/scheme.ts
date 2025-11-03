import { Modals } from '@/store/modalSlice';
import { InitialStateScheme } from '../types/scheme';
import { controlCircuit } from './controlCircuit/controlCircuit';
import {
	CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
	CLOSE_COMMAND_FROM_PTK_INSERT_ID,
	CLOSE_STARTER_COIL_ID,
	CLOSE_STARTER_INTERLOCK_CONTACT_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	KRUZAP_CLOSED_STATUS_LAMP_ID,
	KRUZAP_OPEN_STATUS_LAMP_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	NDI_NOT_CLOSED_INSERT_ID,
	NDI_NOT_OPEN_INSERT_ID,
	OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
	OPEN_COMMAND_FROM_PTK_INSERT_ID,
	OPEN_STARTER_COIL_ID,
	OPEN_STARTER_INTERLOCK_CONTACT_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
} from './controlCircuit/constants';

export { controlCircuit } from './controlCircuit/controlCircuit';
export {
	CONTROL_CIRCUIT_BREAKER_ID,
	LIMIT_SWITCH_OPEN_ID,
	LIMIT_SWITCH_CLOSE_ID,
	OPEN_COMMAND_FROM_PTK_INSERT_ID,
	OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
	CLOSE_COMMAND_FROM_PTK_INSERT_ID,
	CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
} from './controlCircuit/constants';

export const INPUT_CIRCUIT_BREAKER_ID_PHASE_A_ID = 'p.1.2';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_B_ID = 'p.2.2';
export const INPUT_CIRCUIT_BREAKER_ID_PHASE_C_ID = 'p.3.2';
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
	[NDI_NOT_OPEN_INSERT_ID]: 0,
	[OPEN_COMMAND_FROM_PTK_INSERT_ID]: 0,
	[OPEN_COMMAND_FROM_KRUZAP_INSERT_ID]: 0,
	[OPEN_STARTER_INTERLOCK_CONTACT_ID]: 0,
	[OPEN_STARTER_COIL_ID]: 6400,
	[KRUZAP_CLOSED_STATUS_LAMP_ID]: 4800,
	[LIMIT_SWITCH_CLOSE_ID]: 0,
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: 0.1,
	[NDI_NOT_CLOSED_INSERT_ID]: 0,
	[CLOSE_COMMAND_FROM_PTK_INSERT_ID]: 0,
	[CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID]: 0,
	[CLOSE_STARTER_INTERLOCK_CONTACT_ID]: 0,
	[CLOSE_STARTER_COIL_ID]: 6400,
	[KRUZAP_OPEN_STATUS_LAMP_ID]: 4800,
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
		id: NDI_NOT_OPEN_INSERT_ID,
		aria: 'Вставка NDI (сигнал «не открыто»)',
		type: 'fusible_insert',
	},
	{
		id: OPEN_COMMAND_FROM_PTK_INSERT_ID,
		aria: 'Вставка NDI (команда открыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: OPEN_COMMAND_FROM_KRUZAP_INSERT_ID,
		aria: 'Кнопка КРУЗА-П (команда открыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: OPEN_STARTER_INTERLOCK_CONTACT_ID,
		aria: 'Блокировка включения пускателя на открытие',
		type: 'blocking_activation',
	},
	{
		id: OPEN_STARTER_COIL_ID,
		aria: 'Катушка пускателя открыть',
		type: 'starter_coil',
	},
	{
		id: KRUZAP_CLOSED_STATUS_LAMP_ID,
		aria: 'Лампа в КРУЗА-П закрыто',
		type: 'lamps',
	},
	{
		id: NDI_NOT_CLOSED_INSERT_ID,
		aria: 'Вставка NDI (сигнал «не закрыто»)',
		type: 'fusible_insert',
	},
	{
		id: CLOSE_COMMAND_FROM_PTK_INSERT_ID,
		aria: 'Вставка NDI (команда закрыть с ПТК)',
		type: 'fusible_insert',
	},
	{
		id: CLOSE_COMMAND_FROM_KRUZAP_INSERT_ID,
		aria: 'Кнопка КРУЗА-П (команда закрыть с КРУЗА-П)',
		type: 'button',
	},
	{
		id: CLOSE_STARTER_INTERLOCK_CONTACT_ID,
		aria: 'Блокировка включения пускателя на закрыть',
		type: 'blocking_activation',
	},
	{
		id: CLOSE_STARTER_COIL_ID,
		aria: 'Катушка пускателя закрыть',
		type: 'starter_coil',
	},
	{
		id: KRUZAP_OPEN_STATUS_LAMP_ID,
		aria: 'Лампа в КРУЗА-П открыто',
		type: 'lamps',
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
					name: '???????? ????????? ? ????? B',
					active: false,
				},
				{ id: 'p.3.1.3', name: 'Обрыв', active: false },
				{
					id: 'p.3.1.4',
					name: 'Короткое замыкание на землю',
					active: false,
				},
				{ id: 'p.3.1.5', name: '????? ???????', active: false },
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
		{
			id: 'p.3.4.1',
			name: 'Зажим фаза C',
			resistance: 0,
			malfunctions: [],
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

export const initialStateScheme: InitialStateScheme = {
	powerCircuit: powerCircuit,
	controlCircuit: controlCircuit,
};
