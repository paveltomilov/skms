import {
	GATE_STATE_TYPE,
	GatePosition,
	GateStates,
	TriangleColor,
} from '../types/gate';
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
	automatDisassembled: {
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

export const GATES = {
	// TA
	// left_top
	g1: { name: 'ГП3-Б', state: GATE_STATE_TYPE.open },

	// left_mid
	g2: { name: 'ГП3-А', state: GATE_STATE_TYPE.open },
	g3: { name: '1ПВ-5', state: GATE_STATE_TYPE.open },

	// left_down
	g6: { name: '1ПВ-4', state: GATE_STATE_TYPE.open },
	g7: { name: '1ПВ-21', state: GATE_STATE_TYPE.close },
	g8: { name: '1ПЭНА-2', state: GATE_STATE_TYPE.open },

	//mid_mid
	g4: { name: '1Кпсг2-3', state: GATE_STATE_TYPE.open },
	g5: { name: '1Кпсг1-3', state: GATE_STATE_TYPE.open },

	// mid_down
	g9: { name: '1ПЭНБ-2', state: GATE_STATE_TYPE.open },
	g10: { name: '1ПЭНВ-2', state: GATE_STATE_TYPE.open },
};
