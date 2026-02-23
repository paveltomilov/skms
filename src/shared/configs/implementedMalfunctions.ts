import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from './controlCircuit/constants';

export interface ImplementedMalfunctionsConfigItem {
	elementId: string;
	malfunctionIds: string[];
}

export const implementedMalfunctions: ImplementedMalfunctionsConfigItem[] = [
	{
		elementId: 'c.0',
		malfunctionIds: ['c.0.1'],
	},
	{
		elementId: 'c.3.0.4.2.1',
		malfunctionIds: ['c.3.0.4.2.1.1'],
	},
	{
		elementId: 'c.3.1.4.2.1',
		malfunctionIds: ['c.3.1.4.2.1.1'],
	},
	{
		elementId: LIMIT_SWITCH_OPEN_ID,
		malfunctionIds: [
			`${LIMIT_SWITCH_OPEN_ID}.1`,
			`${LIMIT_SWITCH_OPEN_ID}.2`,
		],
	},
	{
		elementId: LIMIT_SWITCH_CLOSE_ID,
		malfunctionIds: [
			`${LIMIT_SWITCH_CLOSE_ID}.1`,
			`${LIMIT_SWITCH_CLOSE_ID}.2`,
		],
	},
];

export const highResistanceMalfunctionIds: string[] = [
	'c.0.1',
	'c.3.0.4.2.1.1',
	'c.3.1.4.2.1.1',
];
