export interface PopupBtn {
	id: string;
	width: number;
	height: number;
	text: string;
	onClick?: () => void;
}

export interface PopupContent {
	id: string;
	icon: string;
	title: string;
	buttons?: PopupBtn[];
}
