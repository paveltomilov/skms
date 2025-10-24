import { LampIndicatorColor } from './icon';

export type LampVisualConfig = {
	showGlow: boolean;
	showTop: boolean;
	topOpacity: number;
};

export type LampBottomGradient = {
	start: string;
	end: string;
};

export type LampVisualConfigMap = Record<LampIndicatorColor, LampVisualConfig>;
export type LampBottomGradientMap = Record<
	LampIndicatorColor,
	LampBottomGradient
>;

export type LampIndicatorCssVars = {
	'--lamp-bottom-start': string;
	'--lamp-bottom-end': string;
};
