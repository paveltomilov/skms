export interface IconSize {
	xs: {
		width: string;
		height: string;
		viewBox: string;
	};
	sm: {
		width: string;
		height: string;
		viewBox: string;
	};
	md: {
		width: string;
		height: string;
		viewBox: string;
	};
	lg: {
		width: string;
		height: string;
		viewBox: string;
	};
}

export interface IconColor {
	default: string;
	disabled: string;
	white: string;
	white_opacity: string;
	magenta: string;
	red: string;
	orange: string;
	blue: string;
	green: string;
	electric_green: string;
	dark_green: string;
}

export interface IconTransform {
	rotate90: string;
	rotateLeft90: string;
	rotate180: string;
	mirror: string;
}

export interface OtherSizes {
	width: number;
	height: number;
}
