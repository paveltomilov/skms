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
	| 'blockingContact'
	| 'coil'
	| 'lamp'
	| 'starterContact'
	| 'motorWinding';

// Типы шаблонов для генерации неисправностей и метаданных визуализации
export type MalfTpl = { suffix: string; name: string };

export interface MetaInfo {
	color?: string;
	shape?: 'rect' | 'circle' | 'rounded-rect' | 'diamond';
	label?: string;
}

export interface Malfunction {
	id: string;
	name: string;
	active: boolean;
}

export interface CircuitElement {
	id: string;
	name: string;

	// Логические точки подключения (ID точек на схеме)
	startPoint?: string;
	endPoint?: string;
	// Электрические характеристики
	resistance: number;
	// Привязанные неисправности для этого элемента
	malfunctions: Malfunction[];
	// Дополнительные метаданные для визуализации
	meta?: MetaInfo;
}

export type CircuitBranch = CircuitElement | CircuitGroup;
export interface CircuitGroup extends Array<CircuitBranch> {}

export interface InitialStateScheme {
	powerCircuit: CircuitBranch[];
	controlCircuit: CircuitBranch[];
}
