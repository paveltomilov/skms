import { IconTransform } from './icon';

// перечисление состояний задвижки
export enum GATE_STATE_TYPE {
	close = 'close',
	toClose = 'toClose',
	open = 'open',
	toOpen = 'toOpen',
	intermediate = 'intermediate',

	noPower = 'noPower',
	automatDisassembled = 'automatDisassembled', // состояние когда какой то автомат разобран

	// поменять название когда станет известно состояние(придумано для UI kit)
	magenta = 'magenta',
}

export interface IGate {
	name: string;
	states: GATE_STATE_TYPE;
	position: number;
}

export interface TriangleColor {
	green: {
		stroke: string;
		fill: string;
	};
	grey: {
		stroke: string;
		fill: string;
	};
	black_white: {
		stroke: string;
		fill: string;
	};
	magenta_white: {
		stroke: string;
		fill: string;
	};
}

interface GateState {
	left: {
		color: keyof TriangleColor;
		transform: keyof Omit<IconTransform, 'mirror'>;
		animation: boolean;
	};
	right: {
		color: keyof TriangleColor;
		transform: keyof Omit<IconTransform, 'mirror'>;
		animation: boolean;
	};
}

export interface GateStates {
	open: GateState;
	close: GateState;
	noPower: GateState;
	automatDisassembled: GateState;
	intermediate: GateState;
	toOpen: GateState;
	toClose: GateState;
	magenta: GateState;
}

export interface GatePosition {
	horizontal: {
		left: keyof Omit<IconTransform, 'mirror'>;
		right: keyof Omit<IconTransform, 'mirror'>;
	};
	vertical: {
		left: keyof Omit<IconTransform, 'mirror'>;
		right: keyof Omit<IconTransform, 'mirror'>;
	};
}
