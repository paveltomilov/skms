import { SchemePartType } from '../types/icon';

export interface SchemePart {
	id: string;
	icon: SchemePartType;
	title: string;
}

export interface Point {
	id: string;
	// добавить проп для аварийного состояния
}

export const Parts: Array<SchemePart> = [
	{
		title: 'Какое-то название',
		icon: 'yb08',
		id: 'YB08',
	},
	{
		title: 'Какое-то название',
		icon: 'xb10',
		id: 'XB10',
	},
	{
		title: 'Какое-то название',
		icon: 'cabinet',
		id: 'CABINET',
	},
	{
		title: 'Какое-то название',
		icon: 'lamp',
		id: 'LAMP',
	},
	{
		title: 'Какое-то название',
		icon: 'engine',
		id: 'engine',
	},
	{
		title: 'Какое-то название',
		icon: 'f01',
		id: 'f01',
	},
	{
		title: 'Какое-то название',
		icon: 'n322',
		id: 'n322',
	},
	{
		title: 'Какое-то название',
		icon: 'p31',
		id: 'p31',
	},
	{
		title: 'Какое-то название',
		icon: 'q01',
		id: 'q01',
	},
	{
		title: 'Какое-то название',
		icon: 's01',
		id: 's01',
	},
	{
		title: 'Какое-то название',
		icon: 'sq3',
		id: 'sq3',
	},
];

export const Points: Array<Point> = [
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
	{ id: 'p.c.n' },
];
