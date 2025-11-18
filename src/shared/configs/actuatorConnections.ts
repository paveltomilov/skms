import { MarkerName } from '../types/markers';
import {
	CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	COMMANDS_CLOSE_POINT_ID,
	OPEN_INTERLOCK_OUTPUT_POINT_ID,
	CONTROL_CIRCUIT_NEUTRAL_ID,
	COMANDS_OPEN_POINT_ID,
} from './controlCircuit/constants';
import {
	POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,
} from './powerCircuit/constants';

export interface Connection {
	marker: MarkerName;
	point: string;
}

export const actuatorsConnectionsLeft: Connection[] = [
	{
		marker: 'A1',
		point: POINT_BEFORE_STARTER_OPEN_PHASE_A_ID,
	},
	{
		marker: 'B1',
		point: POINT_BEFORE_STARTER_OPEN_PHASE_B_ID,
	},
	{
		marker: 'C1',
		point: POINT_BEFORE_STARTER_OPEN_PHASE_C_ID,
	},
	{
		marker: 'A4',
		point: COMMANDS_CLOSE_POINT_ID,
	},
	{
		marker: 'A13',
		point: OPEN_INTERLOCK_OUTPUT_POINT_ID,
	},
	{
		marker: 'A21',
		point: POINT_AFTER_STARTER_OPEN_PHASE_A_ID,
	},
	{
		marker: 'B21',
		point: POINT_AFTER_STARTER_OPEN_PHASE_B_ID,
	},
	{
		marker: 'C21',
		point: POINT_AFTER_STARTER_OPEN_PHASE_C_ID,
	},
	{
		marker: 'A21',
		point: CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	},
	{
		marker: 'N',
		point: CONTROL_CIRCUIT_NEUTRAL_ID,
	},
];

export const actuatorsConnectionsRight: Connection[] = [
	{
		marker: 'L1',
		point: POINT_BEFORE_STARTER_CLOSE_PHASE_A_ID,
	},
	{
		marker: 'L2',
		point: POINT_BEFORE_STARTER_CLOSE_PHASE_B_ID,
	},
	{
		marker: 'L3',
		point: POINT_BEFORE_STARTER_CLOSE_PHASE_C_ID,
	},
	{
		marker: 'A2',
		point: COMANDS_OPEN_POINT_ID,
	},
	{
		marker: 'A21',
		point: CLOSE_INTERLOCK_OUTPUT_POINT_ID,
	},
	{
		marker: 'A21',
		point: POINT_AFTER_STARTER_CLOSE_PHASE_A_ID,
	},
	{
		marker: 'B21',
		point:POINT_AFTER_STARTER_CLOSE_PHASE_B_ID,
	},
	{
		marker: 'C21',
		point: POINT_AFTER_STARTER_CLOSE_PHASE_C_ID,	
	},
	{
		marker: 'A13',
		point: OPEN_INTERLOCK_OUTPUT_POINT_ID,
	},
	{
		marker: 'N',
		point: CONTROL_CIRCUIT_NEUTRAL_ID,
	},
];
