import { PositionClose, PositionOpen } from '@/shared/configs/gate';
import { BASE_RESISTANCE_CONSTANT, ELEMENT_KIND } from '@/shared/configs/elementKind';
import { getResistanceByKind } from '@/shared/utils/getResistanceByKind/getResistanceByKind';
import type {
	GateControlMode,
	GateRuleModifier,
	GateTickSnapshot,
} from '../types';

export interface GateControlPreset {
	mode: GateControlMode;
	positionOpen: number;
	positionClose: number;
	step: number;
	highResistance: number;
	defaultLimitSwitchResistance: number;
	modifiers: GateRuleModifier[];
}

const createBoundaryModifier = (): GateRuleModifier => (result, context) => {
	if (!context.reachedBoundary) {
		return result;
	}

	if (context.hasStuckMalfunctionAtBoundary) {
		return {
			...result,
			shouldStop: false,
			shouldTriggerInputBreakerShutdownTimer: true,
		};
	}

	return {
		...result,
		shouldStop: true,
		shouldTriggerInputBreakerShutdownTimer: false,
	};
};

const basePreset = (
	mode: GateControlMode,
	step = 1,
): Omit<GateControlPreset, 'mode'> => ({
	positionOpen: PositionOpen,
	positionClose: PositionClose,
	step,
	highResistance: BASE_RESISTANCE_CONSTANT.highResistance,
	defaultLimitSwitchResistance: getResistanceByKind(ELEMENT_KIND.LIMIT_SWITCH),
	modifiers: [createBoundaryModifier()],
});

export const gateControlPresets: Record<GateControlMode, GateControlPreset> = {
	ptk: { mode: 'ptk', ...basePreset('ptk') },
	kruzap: { mode: 'kruzap', ...basePreset('kruzap') },
};

export const createTickSnapshotFromPreset = (
	mode: GateControlMode,
	currentPosition: number,
	malfunctions: Pick<
		GateTickSnapshot,
		| 'hasMalfunctionStuckContactSwitchOpenElement'
		| 'hasMalfunctionStuckContactSwitchCloseElement'
	>,
): GateTickSnapshot => {
	const preset = gateControlPresets[mode];

	return {
		currentPosition,
		step: preset.step,
		positionOpen: preset.positionOpen,
		positionClose: preset.positionClose,
		defaultLimitSwitchResistance: preset.defaultLimitSwitchResistance,
		highResistance: preset.highResistance,
		mode,
		...malfunctions,
	};
};
