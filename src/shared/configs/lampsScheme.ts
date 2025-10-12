import type { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';

export interface LampColumn {
	id: 'closed' | 'open';
	title: string;
	pointIds: string[];
	elementId: string;
	colors: {
		on: LampIndicatorColor;
		off: LampIndicatorColor;
	};
	position: 'left' | 'right';
}

export const pins: { code: MarkerName }[] = [
	{ code: 'A' as const },
	{ code: 'N' as const },
];

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Лампа закрыто',
		pointIds: ['p.c.3.1.2'], // контакт цепи индикации «закрыто»
		elementId: 'c.3.2.3.3',
		colors: {
			on: 'lamp_white_on',
			off: 'lamp_white_off',
		},
		position: 'left',
	},
	{
		id: 'open',
		title: 'Лампа открыто',
		pointIds: ['p.c.3.2.2'], // контакт цепи индикации «открыто»
		elementId: 'c.3.1.3.3',
		colors: {
			on: 'lamp_green_on',
			off: 'lamp_green_off',
		},
		position: 'right',
	},
];
