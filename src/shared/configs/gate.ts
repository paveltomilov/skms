import { GatePosition, GateStates, TriangleColor } from '../types/gate';
import { IconTransform } from '../types/icon';
import { ICON_COLOR } from './icon';

export const TRIANGLE_COLOR: TriangleColor = {
	green: {
		stroke: ICON_COLOR.dark_green,
		fill: ICON_COLOR.electric_green,
	},
	grey: {
		stroke: ICON_COLOR.default,
		fill: ICON_COLOR.disabled,
	},
	black_white: {
		stroke: ICON_COLOR.default,
		fill: ICON_COLOR.white,
	},
	magenta_white: {
		stroke: ICON_COLOR.magenta,
		fill: ICON_COLOR.white,
	},
};

export const GATE_STATE: GateStates = {
	open: {
		left: {
			color: 'green' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'green' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
	close: {
		left: {
			color: 'black_white' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'black_white' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
	noPower: {
		left: {
			color: 'grey' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'grey' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
	intermediate: {
		left: {
			color: 'black_white' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'green' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
	toOpen: {
		left: {
			color: 'black_white' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'green' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: true,
		},
	},
	toClose: {
		left: {
			color: 'black_white' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: true,
		},
		right: {
			color: 'green' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
	magenta: {
		left: {
			color: 'magenta_white' as keyof TriangleColor,
			transform: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
		right: {
			color: 'magenta_white' as keyof TriangleColor,
			transform: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
			animation: false,
		},
	},
};

export const GATE_POSITION: GatePosition = {
	horizontal: {
		left: 'rotateLeft90' as keyof Omit<IconTransform, 'mirror'>,
		right: 'rotate90' as keyof Omit<IconTransform, 'mirror'>,
	},
	vertical: {
		left: '' as keyof Omit<IconTransform, 'mirror'>,
		right: 'rotate180' as keyof Omit<IconTransform, 'mirror'>,
	},
};
