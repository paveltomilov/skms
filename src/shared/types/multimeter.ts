import { UniqueIdentifier } from '@dnd-kit/core';
import type { MultimeterMode as ConfigMultimeterMode } from '@/shared/configs/multimeterModes';

export type MultimeterMode = ConfigMultimeterMode;

export interface ProbeConnItem {
	pointId: UniqueIdentifier | null;
	dropId: UniqueIdentifier | null;
}

export interface ProbeConnection {
	red: ProbeConnItem | null;
	black: ProbeConnItem | null;
}

/** Состояние щупа */
export interface ProbStateProps {
	isNeutral: boolean;
	isPower: boolean;
}

export interface MultimeterState {
	currentMode: MultimeterMode;
	displayValue: number | null;
	probeConnections: ProbeConnection;
	activeProb: UniqueIdentifier | null;
}

export type ProbeColor = 'red' | 'black';
