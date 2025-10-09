import { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from './points';

export const LAMP_PALETTES = {
	white: { on: 'lamp_open_on', off: 'lamp_white_off' },
	green: { on: 'lamp_green_on', off: 'lamp_closed_off' },
} as const;

export type LampPalette = keyof typeof LAMP_PALETTES;

export interface LampPin {
	code: MarkerName;
	pointId: string;
}

export interface LampColumn {
	id: 'closed' | 'open';
	title: string;
	pins: LampPin[];
	elementId: string;
	palette: LampPalette;
	position: 'left' | 'right';
}

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Закрыто',
		pins: [
			{ code: 'A', pointId: 'p.c.3.1.2' },
			{ code: 'N', pointId: CONTROL_CIRCUIT_NEUTRAL_ID },
		],
		elementId: 'c.3.1.3.3',
		palette: 'white',
		position: 'left',
	},
	{
		id: 'open',
		title: 'Открыто',
		pins: [
			{ code: 'A', pointId: 'p.c.3.2.2' },
			{ code: 'N', pointId: CONTROL_CIRCUIT_NEUTRAL_ID },
		],
		elementId: 'c.3.2.3.3',
		palette: 'green',
		position: 'right',
	},
];

export type LampColorConfig = {
	on: LampIndicatorColor;
	off: LampIndicatorColor;
};
export type LampVariant = 'white' | 'green';

export const PALETTES: Record<LampVariant, LampColorConfig> = {
	white: { on: 'lamp_open_on', off: 'lamp_white_off' },
	green: { on: 'lamp_green_on', off: 'lamp_closed_off' },
};

// Отображение ламп по состоянию; если нужно — поменять цвет:
export const lampVariants: Record<'closed' | 'open', LampVariant> = {
	closed: 'white', // можно заменить на 'green', если понадобится
	open: 'green', // и наоборот
};

// Тип точки: boolean или объект, содержащий состояние
export type PointObj = { state?: boolean; voltage?: number };
export const isPointObj = (v: unknown): v is PointObj =>
	!!v && typeof v === 'object';
