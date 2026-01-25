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
];

export const highResistanceMalfunctionIds: string[] = [
	'c.0.1',
	'c.3.0.4.2.1.1',
	'c.3.1.4.2.1.1',
];
