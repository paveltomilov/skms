import { SchemeElementBtn, SchemeIconType } from './scheme';

export interface PopupContent {
	id: string;
	icon: SchemeIconType;
	title: string;
	buttons?: SchemeElementBtn[];
}
