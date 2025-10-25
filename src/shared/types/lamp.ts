import { LampIndicatorColor } from './icon';

export type LampVisualConfig = {
	showGlow: boolean;
	showTop: boolean;
	topOpacity: number;
};

export type LampVisualConfigMap = Record<LampIndicatorColor, LampVisualConfig>;
