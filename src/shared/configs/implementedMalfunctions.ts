import {
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
} from './controlCircuit/constants';
import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
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
	// TODO Реализовать логигу работы средств защиты эл.двигателя при данных неисправностях
	// {
	// 	elementId: INPUT_BREAKER_CONTACT_PHASE_B_ID,
	// 	malfunctionIds: [`${INPUT_BREAKER_CONTACT_PHASE_B_ID}.3`],
	// },
	// {
	// 	elementId: INPUT_BREAKER_CONTACT_PHASE_C_ID,
	// 	malfunctionIds: [`${INPUT_BREAKER_CONTACT_PHASE_C_ID}.3`],
	// },
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
