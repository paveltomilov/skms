import type { LampIndicatorColor } from '../types/icon';
import { MarkerName } from '../types/markers';
import {
	LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_OPEN_ID,
	CLOSED_LAMP_BRANCH_POINT_ID,
	OPEN_LAMP_BRANCH_POINT_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
} from './controlCircuit/constants';

export interface Connection {
	marker: MarkerName;
	elementId: string;
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
	elementIds: Connection[];
	position: 'left' | 'right';
}

export const columns: LampColumn[] = [
	{
		id: 'closed',
		title: 'Закрыто',
		color: 'white',
		pointIds: [CLOSED_LAMP_BRANCH_POINT_ID], // А19 - p.c.3.0.4.2.0 (к лампе "закрыто")
		elementId: LAMP_KRUZA_P_CLOSED_ID,
		colors: {
			on: 'lamp_white_on',
			off: 'lamp_white_off',
		},
		elementIds: [
			{ marker: 'A', elementId: WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID }, // c.3.0.4.2.0
			{ marker: 'N', elementId: WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID }, // c.3.0.4.2.2
		],
		position: 'left',
	},
	{
		id: 'open',
		title: 'Открыто',
		color: 'lamp_green',
		pointIds: [OPEN_LAMP_BRANCH_POINT_ID], // А11 - p.c.3.1.4.2.0 (к лампе "открыто")
		elementId: LAMP_KRUZA_P_OPEN_ID,
		colors: {
			on: 'lamp_green_on',
			off: 'lamp_green_off',
		},
		elementIds: [
			{ marker: 'A', elementId: WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID }, // c.3.1.4.2.0
			{ marker: 'N', elementId: WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID }, // c.3.1.4.2.2
		],
		position: 'right',
	},
];
