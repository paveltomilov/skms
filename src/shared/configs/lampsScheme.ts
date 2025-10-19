import type { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';

export interface Connection {
	marker: MarkerName;
	point: string;
}

export interface LampColumn {
	id: 'closed' | 'open';
	title: 'Закрыто' | 'Открыто';
	color: 'white' | 'lamp_green';
	pointIds: string[];
	elementId: string;
	colors: {
		on: LampIndicatorColor;
		off: LampIndicatorColor;
	};
	points: Connection[];
	position: 'left' | 'right';
}

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Закрыто',
		color: 'white',
	pointIds: ['p.c.3.1.2'],
	elementId: 'c.3.2.3.3',
		colors: {
			on: 'lamp_white_on',
			off: 'lamp_white_off',
		},
		points: [
			{ marker: 'A', point: 'p.c.3.1.2' },
			{ marker: 'N', point: 'p.c.n' },
		],
		position: 'left',
	},
	{
		id: 'open',
		title: 'Открыто',
		color: 'lamp_green',
	pointIds: ['p.c.3.2.2'],
	elementId: 'c.3.1.3.3',
		colors: {
			on: 'lamp_green_on',
			off: 'lamp_green_off',
		},
		points: [
			{ marker: 'A', point: 'p.c.3.2.2' },
			{ marker: 'N', point: 'p.c.n' },
		],
		position: 'right',
	},
];
