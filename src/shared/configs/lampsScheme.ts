import { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';

export const LAMP_PALETTES = {
	white: { on: 'lamp_open_on', off: 'lamp_white_off' },
	green: { on: 'lamp_green_on', off: 'lamp_closed_off' },
} as const;

export type LampPalette = keyof typeof LAMP_PALETTES;

export interface LampColumn {
	id: 'closed' | 'open';
	title: string;
	pointId: string;
	elementId: string;
	palette: LampPalette;
	position: 'left' | 'right';
}

export const pins: { code: MarkerName }[] = [
	{ code: 'A' as const },
	{ code: 'N' as const },
];

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Закрыто',
		pointId: 'p.c.3.1.2',
		elementId: 'c.3.1.3.3',
		palette: 'white',
		position: 'left',
	},
	{
		id: 'open',
		title: 'Открыто',
		pointId: 'p.c.3.2.2',
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

// можно брать из стора/настроек; пока — простая мапа:
export const lampVariants: Record<'closed' | 'open', LampVariant> = {
	closed: 'white', // ← поменяешь на 'green', если нужно
	open: 'green', // ← и тут независимо
};

// точка может быть boolean или объектом
export type PointObj = { state?: boolean; voltage?: number };
export const isPointObj = (v: unknown): v is PointObj =>
	!!v && typeof v === 'object';
