import { SchemePartType } from '../types/icon';

export interface ICircuitElement {
	id: string;
	icon: SchemePartType;
	title: string;
}

export const CircuitElements: Array<ICircuitElement> = [
	{
		title: 'Какое-то название',
		icon: 'yb08',
		id: 'c.3.2.3.2.1.1',
	},
	{
		title: 'Какое-то название',
		icon: 'yb08',
		id: 'c.3.1.3.2.1.1',
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
		id: 'c.3.1.3.2.1.2',
	},
	{
		title: 'Какое-то название',
		icon: 's01',
		id: 'c.3.2.3.2.1.2',
	},
	{
		title: 'Какое-то название',
		icon: 'sq3',
		id: 'c.3.2.1',
	},
	{
		title: 'Какое-то название',
		icon: 'sq3',
		id: 'c.3.1.1',
	},
];

export const Points = [
	{ id: 'p.p.0.1' },
	{ id: 'p.p.0.2' },
	{ id: 'p.p.0.3' },
	{ id: 'p.p.2.1' },
	{ id: 'p.p.2.2' },
	{ id: 'p.p.2.3' },
	{ id: 'p.c.0' },
	{ id: 'p.c.1' },
	{ id: 'p.c.2' },
	{ id: 'p.p.3.1' },
	{ id: 'p.p.3.2' },
	{ id: 'p.p.3.3' },
	{ id: 'p.p.4.1' },
	{ id: 'p.p.4.2' },
	{ id: 'p.p.4.3' },
	{ id: 'p.p.5.1' },
	{ id: 'p.p.5.2' },
	{ id: 'p.p.5.3' },
	{ id: 'p.c.3.2.1' },
	{ id: 'p.c.3.2.2' },
	{ id: 'p.c.3.2.3.2.1' },
	{ id: 'p.c.3.2.3.2.2' },
	{ id: 'p.c.n' },
];
