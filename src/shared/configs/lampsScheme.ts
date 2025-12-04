import type { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';
import {
	CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_OPEN_ID,
	OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID,
} from './controlCircuit/constants';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from './points';

export interface Connection {
	marker: MarkerName;
	point: string;
}

export interface LampColumn {
	id: 'closed' | 'open';
	title: 'Закрыто' | 'Открыто';
	color: 'white' | 'lamp_green';
	pointIds: string[];
	elementId: string;
	colors: {
		on: LampIndicatorColor;
		off: LampIndicatorColor;
	};
	points: Connection[];
	position: 'left' | 'right';
}

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Закрыто',
		color: 'white',
		pointIds: [OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID], // А19 - p.c.3.0.2 (выход концевика "Открыто")
		elementId: LAMP_KRUZA_P_CLOSED_ID,
		colors: {
			on: 'lamp_white_on',
			off: 'lamp_white_off',
		},
		points: [
			{ marker: 'A', point: OPEN_LIMIT_SWITCH_OUTPUT_POINT_ID }, // А19
			{ marker: 'N', point: CONTROL_CIRCUIT_NEUTRAL_ID },
		],
		position: 'left',
	},
	{
		id: 'open',
		title: 'Открыто',
		color: 'lamp_green',
		pointIds: [CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID], // А11 - p.c.3.1.2 (выход концевика "Закрыто")
		elementId: LAMP_KRUZA_P_OPEN_ID,
		colors: {
			on: 'lamp_green_on',
			off: 'lamp_green_off',
		},
		points: [
			{ marker: 'A', point: CLOSE_LIMIT_SWITCH_OUTPUT_POINT_ID }, // А11
			{ marker: 'N', point: CONTROL_CIRCUIT_NEUTRAL_ID },
		],
		position: 'right',
	},
];
