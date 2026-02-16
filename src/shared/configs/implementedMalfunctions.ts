import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
} from './powerCircuit/constants';

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
		elementId: INPUT_BREAKER_CONTACT_PHASE_A_ID,
		malfunctionIds: [`${INPUT_BREAKER_CONTACT_PHASE_A_ID}.3`],
	},
	{
		elementId: INPUT_BREAKER_CONTACT_PHASE_B_ID,
		malfunctionIds: [`${INPUT_BREAKER_CONTACT_PHASE_B_ID}.3`],
	},
	{
		elementId: INPUT_BREAKER_CONTACT_PHASE_C_ID,
		malfunctionIds: [`${INPUT_BREAKER_CONTACT_PHASE_C_ID}.3`],
	},
];

export const highResistanceMalfunctionIds: string[] = [
	'c.0.1',
	'c.3.0.4.2.1.1',
	'c.3.1.4.2.1.1',
];
