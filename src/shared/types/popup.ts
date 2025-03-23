export interface PopupBtn {
	id: string;
	width: number;
	height: number;
	text: string;
	onClick?: () => void;
}

export interface PopupContent {
	id: string;
	icon: number /* подумать как передавать иконки */;
	title: string;
	buttons?: PopupBtn[];
}
