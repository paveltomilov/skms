import { GATE_STATE_TYPE } from '@/shared/types/gate';
import { gateControlPresets } from '../presets/gateControlPreset';
import type {
	GateDirection,
	GateRuleContext,
	GateRuleResult,
	GateStopSnapshot,
	SimulationCommand,
} from '../types';

const getClampedPosition = (
	position: number,
	positionClose: number,
	positionOpen: number,
): number => Math.max(positionClose, Math.min(position, positionOpen));

const getNextPosition = (
	direction: GateDirection,
	currentPosition: number,
	step: number,
	positionClose: number,
	positionOpen: number,
): number =>
	getClampedPosition(
		direction === 'open' ? currentPosition + step : currentPosition - step,
		positionClose,
		positionOpen,
	);

const getLimitSwitchResistance = (args: {
	position: number;
	positionOpen: number;
	positionClose: number;
	defaultLimitSwitchResistance: number;
	highResistance: number;
	hasMalfunctionStuckContactSwitchOpenElement: boolean;
	hasMalfunctionStuckContactSwitchCloseElement: boolean;
}): { limitSwitchOpenResistance: number; limitSwitchCloseResistance: number } => {
	const {
		position,
		positionOpen,
		positionClose,
		defaultLimitSwitchResistance,
		highResistance,
		hasMalfunctionStuckContactSwitchOpenElement,
		hasMalfunctionStuckContactSwitchCloseElement,
	} = args;

	const limitSwitchOpenResistance =
		position >= positionOpen && !hasMalfunctionStuckContactSwitchOpenElement
			? highResistance
			: defaultLimitSwitchResistance;
	const limitSwitchCloseResistance =
		position <= positionClose && !hasMalfunctionStuckContactSwitchCloseElement
			? highResistance
			: defaultLimitSwitchResistance;

	return { limitSwitchOpenResistance, limitSwitchCloseResistance };
};

const createStopResult = (snapshot: GateStopSnapshot): GateRuleResult => {
	const { limitSwitchOpenResistance, limitSwitchCloseResistance } =
		getLimitSwitchResistance({
			position: snapshot.currentPosition,
			positionOpen: snapshot.positionOpen,
			positionClose: snapshot.positionClose,
			defaultLimitSwitchResistance: snapshot.defaultLimitSwitchResistance,
			highResistance: snapshot.highResistance,
			hasMalfunctionStuckContactSwitchOpenElement:
				snapshot.hasMalfunctionStuckContactSwitchOpenElement,
			hasMalfunctionStuckContactSwitchCloseElement:
				snapshot.hasMalfunctionStuckContactSwitchCloseElement,
		});

	return {
		nextPosition: snapshot.currentPosition,
		gateState: GATE_STATE_TYPE.intermediate,
		limitSwitchOpenResistance,
		limitSwitchCloseResistance,
		shouldStop: true,
		shouldTriggerInputBreakerShutdownTimer: false,
	};
};

export const dispatchSimulationCommand = (
	command: SimulationCommand,
): GateRuleResult => {
	if (command.type === 'stop') {
		return createStopResult(command.payload.snapshot);
	}

	const { direction, snapshot } = command.payload;
	const nextPosition = getNextPosition(
		direction,
		snapshot.currentPosition,
		snapshot.step,
		snapshot.positionClose,
		snapshot.positionOpen,
	);

	const reachedBoundary =
		direction === 'open'
			? nextPosition >= snapshot.positionOpen
			: nextPosition <= snapshot.positionClose;
	const hasStuckMalfunctionAtBoundary =
		direction === 'open'
			? snapshot.hasMalfunctionStuckContactSwitchOpenElement
			: snapshot.hasMalfunctionStuckContactSwitchCloseElement;

	let result: GateRuleResult = {
		nextPosition,
		gateState:
			direction === 'open' ? GATE_STATE_TYPE.toOpen : GATE_STATE_TYPE.toClose,
		...getLimitSwitchResistance({
			position: nextPosition,
			positionOpen: snapshot.positionOpen,
			positionClose: snapshot.positionClose,
			defaultLimitSwitchResistance: snapshot.defaultLimitSwitchResistance,
			highResistance: snapshot.highResistance,
			hasMalfunctionStuckContactSwitchOpenElement:
				snapshot.hasMalfunctionStuckContactSwitchOpenElement,
			hasMalfunctionStuckContactSwitchCloseElement:
				snapshot.hasMalfunctionStuckContactSwitchCloseElement,
		}),
		shouldStop: reachedBoundary,
		shouldTriggerInputBreakerShutdownTimer: false,
	};

	const context: GateRuleContext = {
		direction,
		mode: snapshot.mode,
		reachedBoundary,
		hasStuckMalfunctionAtBoundary,
	};

	for (const modifier of gateControlPresets[snapshot.mode].modifiers) {
		result = modifier(result, context);
	}

	return result;
};
