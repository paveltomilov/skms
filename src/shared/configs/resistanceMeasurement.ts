import { HIGH_RESISTANCE } from './scheme';

export interface ResistanceMeasurement {
	elementId: string;
	points: [string, string];
	maxRange?: number;
}

export const RESISTANCE_MEASUREMENTS: ResistanceMeasurement[] = [
	{
		elementId: 'c.3.1.1',
		points: ['p.c.3.1.1', 'p.c.3.1.2'],
	},
	{
		elementId: 'c.3.2.1',
		points: ['p.c.3.2.1', 'p.c.3.2.2'],
	},
	{
		elementId: 'p.1.3',
		points: ['p.p.1.3.1', 'p.p.1.3.2'],
	},
	{
		elementId: 'p.2.3',
		points: ['p.p.2.3.1', 'p.p.2.3.2'],
	},
	{
		elementId: 'p.3.3',
		points: ['p.p.3.3.1', 'p.p.3.3.2'],
	},
	{
		elementId: 'p.1.4.1.1',
		points: ['p.p.1.4.1.1', 'p.p.1.4.2.1'],
	},
	{
		elementId: 'p.2.4.1',
		points: ['p.p.2.4.1', 'p.p.2.4.2'],
	},
	{
		elementId: 'p.3.4.1.1',
		points: ['p.p.3.4.1.1', 'p.p.3.4.2.1'],
	},
	{
		elementId: 'c.3.1.3.2.2',
		points: ['p.c.3.1.3.2.1', 'p.c.3.1.3.2.2'],
	},
	{
		elementId: 'c.3.1.3.2.3',
		points: ['p.c.3.1.3.2.2', 'p.c.n'],
	},
	{
		elementId: 'c.3.2.3.2.2',
		points: ['p.c.3.2.3.2.1', 'p.c.3.2.3.2.2'],
	},
	{
		elementId: 'c.3.2.3.2.3',
		points: ['p.c.3.2.3.2.2', 'p.c.n'],
	},
	{
		elementId: 'c.3.1.3.3',
		points: ['p.c.3.1.2', 'p.c.n'],
	},
	{
		elementId: 'c.3.2.3.3',
		points: ['p.c.3.2.2', 'p.c.n'],
	},
	{
		elementId: 'p.1.4.1.2',
		points: ['p.p.1.4.1.2', 'p.p.n'],
	},
	{
		elementId: 'p.2.5',
		points: ['p.p.2.5', 'p.p.n'],
	},
	{
		elementId: 'p.3.4.1.2',
		points: ['p.p.3.4.1.2', 'p.p.n'],
	},
];

export const OHM_200_MAX_VALUE = 200;
export const OHM_OPEN_LINE = HIGH_RESISTANCE;
