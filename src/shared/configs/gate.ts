import {
	GATE_STATE_TYPE,
	GatePosition,
	GateStates,
	IGate,
	TriangleColor,
} from '../types/gate';
import { IconTransform } from '../types/icon';
import { ICON_COLOR } from './icon';
/** Положение задвижки 0 */
export const PositionClose: number = 0;
/** Положение задвижки 100 */
export const PositionOpen: number = 100;

export const GATES: Record<string, IGate> = {
	// TA
	// left_top
	g1: {
		name: 'ГПЗ-Б',
		description: 'ГП3-Б',
		kks: 'M1LAB50AA001',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [], //массив неисправностей
		controlSwitch: false,
		powerSwitch: false,
	},

	// left_mid
	g2: {
		name: 'ГП3-А',
		description: 'ГП3-А',
		kks: 'M1LAB10AA001',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [], // если массив неисправностей пустой, значит задвижка исправна
		controlSwitch: false,
		powerSwitch: false,
	},
	g3: {
		name: '1ПВ-5',
		description: 'Здв 1 на пит воде до гр. ПВД',
		kks: 'M1LAB10AA004',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	// left_down
	g6: {
		name: '1ПВ-4',
		description: 'Здв 2 на пит воде до гр. ПВД',
		kks: 'M1LAB10AA002',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g7: {
		name: '1ПВ-21',
		description: 'Здв на обводе ПВД по пит воде',
		kks: 'M1LAB11AA001',
		states: GATE_STATE_TYPE.close,
		position: PositionClose,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g8: {
		name: '1ПЭНА-2',
		description: 'Здв 1 на напоре ПЭН-1А',
		kks: 'M1LAB01AA002',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	//mid_mid
	g4: {
		name: '1Кпсг2–3',
		description: 'Здв на отборе из ПСГ-2 за ПНД-1',
		kks: 'M1NAB23AA001',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g5: {
		name: '1Кпсг1–3',
		description: 'Здв на отборе из ПСГ-1 за ПНД-1',
		kks: 'M1NAB13AA001',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	// mid_down
	g9: {
		name: '1ПЭНБ-2',
		description: 'Здв 1 на напоре ПЭН-1Б',
		kks: 'M1LAB02AA002',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g10: {
		name: '1ПЭНВ-2',
		description: 'Здв 1 на напоре ПЭН-1В',
		kks: 'M1LAB03AA002',
		states: GATE_STATE_TYPE.open,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	//KA
	//left_top
	g11: {
		name: '1АСБ-1',
		description: 'Здв 1 на авар сбросе из бар-н',
		kks: 'H1HAN10AA001',
		states: GATE_STATE_TYPE.close,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g12: {
		name: '1АСБ-2',
		description: 'Здв 2 на авар сбросе из бар-н',
		kks: 'H1HAN10AA002',
		states: GATE_STATE_TYPE.open,
		position: PositionClose,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	//right_top
	g14: {
		name: '1ПП-4',
		description: 'Здв 1 продувки пароперегревателя',
		kks: 'M1LBA91AA001',
		states: GATE_STATE_TYPE.noPower,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},
	g15: {
		name: '1ПП-5',
		description: 'Здв 2 продувки пароперегревателя',
		kks: 'M1LBA91AA002',
		states: GATE_STATE_TYPE.noPower,
		position: PositionOpen,
		malfunctions: [],
		controlSwitch: false,
		powerSwitch: false,
	},

	//right_mid
	g16: {
		name: '1РВЭК-1',
		description: 'Регулятор воды экономайзера ',
		kks: 'M1LAB10AA005',
		states: GATE_STATE_TYPE.close,
		position: PositionClose,
		malfunctions: [],
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


