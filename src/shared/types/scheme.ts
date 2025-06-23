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

export interface SchemeElementBtn {
	id: string;
	text: string;
}

export interface ISchemeElement {
	id: string;
	title: string;
	icon: SchemeIconType;
	buttons?: SchemeElementBtn[];
}

export interface IPoint {
	x: number;
	y: number;
}
