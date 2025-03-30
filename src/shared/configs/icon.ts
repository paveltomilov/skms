import { IconColor, IconSize, IconTransform } from '../types/icon';

export const ICON_SIZE: IconSize = {
	xs: {
		width: '16',
		height: '16',
		viewBox: '0 0 16 16',
	},
	sm: {
		width: '20',
		height: '20',
		viewBox: '0 0 20 20',
	},
	md: {
		width: '26',
		height: '26',
		viewBox: '0 0 26 26',
	},
	lg: {
		width: '28',
		height: '28',
		viewBox: '0 0 28 28',
	},
};

export const ICON_TRANSFORM: IconTransform = {
	mirror: 'rotate(180) scale(1 -1)',
	rotate45: 'rotate(45)',
	rotate90: 'rotate(90)',
	rotate180: 'rotate(180)',
	rotateLeft45: 'rotate(-45)',
	rotateLeft90: 'rotate(-90)',
};

export const ICON_COLOR: IconColor = {
	default: 'black',
	disabled: '#8A8A8A',
	white: 'white',
	white_opacity: '#FFFFFFB2',
	magenta: '#E00671',
	red: '#8F1313',
	orange: '#FF7E22',
	blue: '#110F93',
	green: '#0AB700',
	electric_green: '#0BF40E',
	dark_green: '#005C00',
};

export const STATUS_ICON_SIZE = {
	longWave: {
		width: '45',
		height: '42',
		viewBox: '0 0 45 42',
	},
	shortWave: {
		width: '26',
		height: '44',
		viewBox: '0 0 26 44',
	},
	crash: {
		width: '42',
		height: '42',
		viewBox: '0 0 42 42',
	},
};

export const RECTANGLE_ICON_SIZE = {
	default: {
		width: '37',
		height: '25',
		viewBox: '0 0 37 25',
	},
	outlined: {
		width: '40',
		height: '28',
		viewBox: '0 0 40 28',
	},
};

export const TILDE_CROSS_ICON_SIZE = {
	small: {
		width: 22,
		height: 22,
	},
	big: {
		width: 30,
		height: 30,
	},
};
