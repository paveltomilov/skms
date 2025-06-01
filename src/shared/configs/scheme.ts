import { IPoint, ISchemeElement } from '../types/scheme';

// id элементов схемы
export const LIMIT_SWITCH_OPEN_ID = 'c.3.1.1';
export const LIMIT_SWITCH_CLOSE_ID = 'c.3.2.1';
export const OPEN_FROM_KRUZAP_ID = 'c.3.1.3.2.1.2';
export const CLOSE_FROM_KRUZAP_ID = 'c.3.2.3.2.1.2';
export const OPEN_FROM_PTK_ID = 'c.3.1.3.2.1.1';
export const CLOSE_FROM_PTK_ID = 'c.3.2.3.2.1.1';

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
	{
		title: 'Какое-то название',
		icon: 'engine',
		id: 'p.5',
	},
	{
		title: 'Какое-то название',
		icon: 'f01',
		id: 'c.1',
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
	'p.p.0.1': { x: 87, y: 12 },
	'p.p.0.2': { x: 129, y: 27 },
	'p.p.0.3': { x: 171, y: 42 },

	'p.p.1.1': { x: 87, y: 150 },
	'p.p.2.1': { x: 129, y: 150 },
	'p.p.3.1': { x: 171, y: 150 },

	'p.p.1.2': { x: 86, y: 188 },
	'p.p.2.2': { x: 129, y: 187 },
	'p.p.3.2': { x: 170, y: 187 },

	'p.p.1.3.1': { x: 86, y: 355 },
	'p.p.2.3.1': { x: 129, y: 355 },
	'p.p.3.3.1': { x: 170, y: 355 },
	'p.p.1.3.2': { x: 208, y: 355 },
	'p.p.2.3.2': { x: 242, y: 355 },
	'p.p.3.3.2': { x: 276, y: 355 },

	'p.p.4.1.1': { x: 87, y: 398 },
	'p.p.4.1.2': { x: 128, y: 398 },
	'p.p.4.1.3': { x: 171, y: 398 },
	'p.p.4.2.1': { x: 200, y: 398 },
	'p.p.4.2.2': { x: 240, y: 398 },
	'p.p.4.2.3': { x: 272, y: 398 },

	'p.p.1.5': { x: 87, y: 578 },
	'p.p.2.5': { x: 128, y: 578 },
	'p.p.3.5': { x: 171, y: 578 },

	'p.p.n': { x: 129, y: 647 },

	'p.c.0': { x: 86, y: 217 },
	'p.c.1': { x: 320, y: 215 },
	'p.c.2': { x: 370, y: 215 },

	'p.с.3.1.1': { x: 518, y: 215 },
	'p.с.3.1.2': { x: 595, y: 215 },
	'p.с.3.1.3.2.1': { x: 776, y: 216 },
	'p.с.3.1.3.2.2': { x: 849, y: 215 },

	'p.c.n': { x: 947, y: 215 },

	'p.с.3.2.1': { x: 518, y: 480 },
	'p.с.3.2.2': { x: 594, y: 480 },
	'p.с.3.2.3.2.1': { x: 766, y: 480 },
	'p.с.3.2.3.2.2': { x: 847, y: 480 },
};

// Значение сопротивления при обрыве или при размыкании цепи
export const HIGH_RESISTANCE = 1_000_000_000;

// Значение сопротивления элементов схемы в нормальном состоянии
export const BASE_RESISTANCE = {
	'p.1.1': 0.1,
	'p.1.2': 0,
	'p.1.3': 0.1,
	'p.1.4.1.1': 0,
	'p.1.4.1.2': 0.1,
	'p.1.4.1.3': 4100,
	'p.2.1': 0.1,
	'p.2.2': 0,
	'p.2.3': 0.1,
	'p.2.4.1': 0,
	'p.2.4.2': 0,
	'p.2.5': 0.1,
	'p.2.6': 4100,
	'p.3.1': 0.1,
	'p.3.2': 0,
	'p.3.3': 0.1,
	'p.3.4.1': 0,
	'p.3.4.1.2': 0.1,
	'p.3.4.1.3': 4100,
	'c.1': 0,
	'c.2': 0.1,
	[LIMIT_SWITCH_OPEN_ID]: 0,
	'c.3.1.2': 0.1,
	'c.3.1.3.1': 0,
	[OPEN_FROM_PTK_ID]: 0,
	[OPEN_FROM_KRUZAP_ID]: 0,
	'c.3.1.3.2.2': 0,
	'c.3.1.3.2.3': 6420,
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
