import { GATE_STATE_TYPE } from '@/shared/types/gate';

export type GateControlMode = 'ptk' | 'kruzap';
export type GateDirection = 'open' | 'close';

export interface GateRuleContext {
	direction: GateDirection;
	mode: GateControlMode;
	reachedBoundary: boolean;
	hasStuckMalfunctionAtBoundary: boolean;
}

export interface GateRuleResult {
	nextPosition: number;
	gateState: GATE_STATE_TYPE;
	limitSwitchOpenResistance: number;
	limitSwitchCloseResistance: number;
	shouldStop: boolean;
	shouldTriggerInputBreakerShutdownTimer: boolean;
}

export type GateRuleModifier = (
	result: GateRuleResult,
	context: GateRuleContext,
) => GateRuleResult;

export interface GateTickSnapshot {
	currentPosition: number;
	step: number;
	positionOpen: number;
	positionClose: number;
	defaultLimitSwitchResistance: number;
	highResistance: number;
	hasMalfunctionStuckContactSwitchOpenElement: boolean;
	hasMalfunctionStuckContactSwitchCloseElement: boolean;
	mode: GateControlMode;
}

export interface GateStopSnapshot {
	currentPosition: number;
	positionOpen: number;
	positionClose: number;
	defaultLimitSwitchResistance: number;
	highResistance: number;
	hasMalfunctionStuckContactSwitchOpenElement: boolean;
	hasMalfunctionStuckContactSwitchCloseElement: boolean;
}

export type SimulationCommand =
	| {
			type: 'tick';
			payload: { direction: GateDirection; snapshot: GateTickSnapshot };
	  }
	| { type: 'stop'; payload: { snapshot: GateStopSnapshot } };
