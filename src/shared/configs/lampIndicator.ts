import type { LampIndicatorColor } from '@/shared/types/icon';
import { LampVisualConfig, LampVisualConfigMap } from '../types/lamp';

export const LAMP_VISUAL_CONFIG: LampVisualConfigMap = {
	lamp_white_off: { showGlow: false, showTop: true, topOpacity: 1 },
	lamp_white_on: { showGlow: false, showTop: true, topOpacity: 1 },
	lamp_green_on: { showGlow: true, showTop: true, topOpacity: 1 },
	lamp_green_off: { showGlow: false, showTop: true, topOpacity: 0.6 },
};

export const getVisualConfigByColor = (color: LampIndicatorColor): LampVisualConfig =>
	LAMP_VISUAL_CONFIG[color] ?? LAMP_VISUAL_CONFIG.lamp_white_off;
