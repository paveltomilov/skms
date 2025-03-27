// типы для возможных назвваний иконок
export type Name =
	| 'accept'
	| 'exclamation'
	| 'question'
	| 'search'
	| 'chevron'
	| 'side'
	| 'micro'
	| 'ellipseClose'
	| 'close'
	| 'curvedArrow'
	| 'sharp'
	| 'filter'
	| 'arrow'
	| 'home'
	| 'training'
	| 'ptk'
	| 'simulator'
	| 'scheme'
	| 'attention'
	| 'feedback'
	| 'success'
	| 'error'
	| 'power';

// типы для возможных размеров иконок
export interface OtherSizes {
	width: number;
	height: number;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | OtherSizes;

// типы для возможных цветов
export type Color =
	| 'default'
	| 'disabled'
	| 'white'
	| 'magenta'
	| 'red'
	| 'green'
	| 'electric_green'
	| 'dark_green';

// типы для возможных трансформаций
export type Transform =
	| 'mirror'
	| 'rotate45'
	| 'rotateLeft45'
	| 'rotate90'
	| 'rotateLeft90'
	| 'rotate180';
