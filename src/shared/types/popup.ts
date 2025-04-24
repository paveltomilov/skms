import { SchemeIconType } from './scheme';

export interface PopupBtn {
	id: string;
	width: number;
	height: number;
	text: string;
	onClick?: () => void;
}

export interface PopupContent {
	id: string;
	icon: SchemeIconType;
	title: string;
	buttons?: PopupBtn[];
}
