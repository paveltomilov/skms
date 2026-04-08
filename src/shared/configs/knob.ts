import {
	MULTIMETER_MODES,
	type MultimeterMode,
} from '@/shared/configs/multimeterModes';

export const MULTIMETER_ANGLES: Record<MultimeterMode, number> =
	MULTIMETER_MODES.reduce(
		(acc, mode) => {
			acc[mode.id] = mode.angle;
			return acc;
		},
		{} as Record<MultimeterMode, number>,
	);

export const SWITCHER_ANGLES = {
	on: 0,
	off: 270,
};

export const TUMBLER_POSITIONS = {
	on: -12,
	off: 24,
};
