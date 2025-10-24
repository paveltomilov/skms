import type { LampIndicatorColor } from '@/shared/types/icon';
import { LampBottomGradient, LampBottomGradientMap, LampVisualConfig, LampVisualConfigMap } from '../types/lamp';


const WHITE_BOTTOM_GRADIENT: LampBottomGradient = {
    start: '#FFFFFF',
    end: '#E8E8E8',
};

const GREEN_ACTIVE_BOTTOM_GRADIENT: LampBottomGradient = {
    start: '#FFFFFF',
    end: '#E8E8E8',
};

const GREEN_INACTIVE_BOTTOM_GRADIENT: LampBottomGradient = {
    start: '#E8E8E8',
    end: '#FFFFFF',
};

export const LAMP_VISUAL_CONFIG: LampVisualConfigMap = {
    lamp_white_off: { showGlow: false, showTop: true, topOpacity: 1 },
    lamp_white_on: { showGlow: false, showTop: true, topOpacity: 1 },
    lamp_green_on: { showGlow: true, showTop: true, topOpacity: 1 },
    lamp_green_off: { showGlow: false, showTop: true, topOpacity: 0.6 },
};

export const LAMP_BOTTOM_GRADIENT: LampBottomGradientMap = {
    lamp_white_off: WHITE_BOTTOM_GRADIENT,
    lamp_white_on: WHITE_BOTTOM_GRADIENT,
    lamp_green_on: GREEN_ACTIVE_BOTTOM_GRADIENT,
    lamp_green_off: GREEN_INACTIVE_BOTTOM_GRADIENT,
};

export const getBottomGradientByColor = (color: LampIndicatorColor): LampBottomGradient =>
    LAMP_BOTTOM_GRADIENT[color] ?? WHITE_BOTTOM_GRADIENT;

export const getVisualConfigByColor = (color: LampIndicatorColor): LampVisualConfig =>
    LAMP_VISUAL_CONFIG[color] ?? LAMP_VISUAL_CONFIG.lamp_white_off;
