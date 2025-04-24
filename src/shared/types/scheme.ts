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

export interface ISchemeElement {
	id: string;
	icon: SchemeIconType;
	title: string;
}
