import {
	GATE_STATE_TYPE,
	GatePosition,
	GateStates,
	IGate,
	TriangleColor,
} from '../types/gate';
import { IconTransform } from '../types/icon';
import { ICON_COLOR } from './icon';

export const GATES: Record<string, IGate> = {
	// TA
	// left_top
	g1: {
		name: 'ГП3-Б',
		states: GATE_STATE_TYPE.open,
		position: 100,
		malfunctions: ['p.1.2.1', 'p.1.1.1'], // необязательный параметр, если нет массива неисправностей, значит задвижка исправна
		controlSwitch: false,
		powerSwitch: false,
	},

	// left_mid
	g2: {
		name: 'ГП3-А',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g3: {
		name: '1ПВ-5',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	// left_down
	g6: {
		name: '1ПВ-4',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g7: {
		name: '1ПВ-21',
		states: GATE_STATE_TYPE.close,
		position: 0,
		controlSwitch: false,
		powerSwitch: false,
	},
	g8: {
		name: '1ПЭНА-2',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	//mid_mid
	g4: {
		name: '1Кпсг2–3',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g5: {
		name: '1Кпсг1–3',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	// mid_down
	g9: {
		name: '1ПЭНБ-2',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g10: {
		name: '1ПЭНВ-2',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	//KA
	//left_top
	g11: {
		name: '1АСБ-1',
		states: GATE_STATE_TYPE.close,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g12: {
		name: '1АСБ-2',
		states: GATE_STATE_TYPE.open,
		position: 0,
		controlSwitch: false,
		powerSwitch: false,
	},


	//left_down 
	g13: {
		name: '',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	//right_top
	g14: {
		name: '1ПП-4',
		states: GATE_STATE_TYPE.noPower,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g15: {
		name: '1ПП-5',
		states: GATE_STATE_TYPE.noPower,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g16: {
		name: '',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g17: {
		name: '',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g18: {
		name: '',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},
	g19: {
		name: '',
		states: GATE_STATE_TYPE.open,
		position: 100,
		controlSwitch: false,
		powerSwitch: false,
	},

	//right_mid
		g20: {
		name: '1РВЭК-1',
		states: GATE_STATE_TYPE.close,
		position: 0,
		controlSwitch: false,
		powerSwitch: false,
	},
};

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
