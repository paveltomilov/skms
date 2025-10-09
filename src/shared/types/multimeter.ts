import { UniqueIdentifier } from '@dnd-kit/core';

export type MultimeterMode =
	| 'OFF'
	| 'ACV_750'
	| 'ACV_200'
	| 'DCA_200u'
	| 'DCA_2000u'
	| 'DCA_20m'
	| 'DCA_200m'
	| 'DCA_10A'
	| 'HFE'
	| 'DIODE'
	| 'OHM_2000k'
	| 'OHM_200k'
	| 'OHM_20k'
	| 'OHM_2000'
	| 'OHM_200'
	| 'DCV_1000'
	| 'DCV_200'
	| 'DCV_20'
	| 'DCV_2000m'
	| 'DCV_200m';

export interface ProbeAttachment {
	pointId: UniqueIdentifier | null;
	dropId: string | null;
}

export interface ProbeConnection {
	red: ProbeAttachment;
	black: ProbeAttachment;
}

/** Состояние щупа */
export interface ProbStateProps {
	isNeutral: boolean;
	isPower: boolean;
	pointId: UniqueIdentifier | null;
}

export interface MultimeterState {
	currentMode: MultimeterMode;
	displayValue: number | string | null;
	probeConnections: ProbeConnection;
	activeProb: UniqueIdentifier | null;
}

export type ProbeColor = 'red' | 'black';
