export type SchemeIconType =
	| 'yb08'
	| 'xb10'
	| 'cabinet'
	| 'lamp'
	| 'engine'
	| 'f01'
	| 'n322'
	| 'p31'
	| 'q01'
	| 's01'
	| 'sq3';

export interface IPoint {
	x: number;
	y: number;
	state: boolean;
}

interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

export interface CircuitElement {
	id: string;
	name: string;
	resistance: number;
	malfunctions: Malfunction[];
}

export type CircuitBranch = CircuitElement | CircuitGroup;
export interface CircuitGroup extends Array<CircuitBranch> {}

export interface InitialStateScheme {
	powerCircuit: CircuitBranch[][];
	controlCircuit: CircuitBranch[];
}
