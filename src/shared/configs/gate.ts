import { Color } from '../types/gate';
import { Transform } from '../types/icon';
import { ICON_COLOR } from './icon';

export const TRIANGLE_COLOR = {
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

export const GATE_STATE = {
	open: {
		left: {
			color: 'green' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'green' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
	close: {
		left: {
			color: 'black_white' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'black_white' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
	noPower: {
		left: {
			color: 'grey' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'grey' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
	intermediate: {
		left: {
			color: 'black_white' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'green' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
	toOpen: {
		left: {
			color: 'black_white' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'green' as Color,
			transform: 'rotate90' as Transform,
			animation: true,
		},
	},
	toClose: {
		left: {
			color: 'black_white' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: true,
		},
		right: {
			color: 'green' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
	magenta: {
		left: {
			color: 'magenta_white' as Color,
			transform: 'rotateLeft90' as Transform,
			animation: false,
		},
		right: {
			color: 'magenta_white' as Color,
			transform: 'rotate90' as Transform,
			animation: false,
		},
	},
};
