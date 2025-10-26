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

export type ElementKind =
	| 'wire'
	| 'breaker'
	| 'limitSwitch'
	| 'insert'
	| 'button'
	| 'blockingContact'
	| 'coil'
	| 'lamp';

// Template types for generating malfunctions and visualization metadata
export type MalfTpl = { suffix: string; name: string };

export interface MetaInfo {
	color?: string;
	shape?: 'rect' | 'circle' | 'rounded-rect' | 'diamond';
	label?: string;
}

interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

export interface CircuitElement {
	id: string;
	name: string;
	// Auto-generated or explicitly provided variable name used in code (camelCase)
	varName?: string;
	// Semantic kind of the element for UI and behavior
	kind?: ElementKind;
	// Logical connection points (IDs of points on the drawing)
	startPoint?: string;
	endPoint?: string;
	// Electrical characteristics
	resistance: number;
	// Attached malfunctions for this element
	malfunctions: Malfunction[];
	// Extra metadata for visuals
	meta?: MetaInfo;
}

export type CircuitBranch = CircuitElement | CircuitGroup;
export interface CircuitGroup extends Array<CircuitBranch> {}

export interface InitialStateScheme {
	powerCircuit: CircuitBranch[][];
	controlCircuit: CircuitBranch[];
}
