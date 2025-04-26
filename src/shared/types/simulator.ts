import { DndItemType } from '@/shared/configs/simulator.constants';

import { UniqueIdentifier, Active, Over } from '@dnd-kit/core';
import { RefObject, CSSProperties } from 'react';

export type ProbeColor = 'red' | 'black';

interface BaseDragData {
	type: DndItemType;
}

export interface ProbeDragData extends BaseDragData {
	type: DndItemType.PROBE;
	probeColor: ProbeColor;
}

export interface PointData {
	id: string;
	label?: string;
	position: {
		top?: string | number;
		left?: string | number;
		x?: number;
		y?: number;
	};
	// accepts?: string[];
	// voltage?: number;
	// isActive?: boolean;
}

export interface ConnectionPointDropData {
	type: DndItemType.NODE;
	nodeId: string;
	accepts: DndItemType[];
	// expectedVoltage?: number;
}

export type ProbePosition = { top: string; left: string } | { x: number; y: number };

export type ProbePositionsState = Record<ProbeColor, ProbePosition>;

export type ActiveDragData = ProbeDragData | null; 

export interface UseProbesProps {
	activeId: UniqueIdentifier | null;
	environmentRef: RefObject<HTMLDivElement | null>;
}

export interface UseProbesReturn {
	handleProbeDragEndLogic: (active: Active, over: Over | null) => void;
	getProbeStyle: (color: ProbeColor) => CSSProperties;
}