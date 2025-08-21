import { WINDOWS } from '@/shared/configs/window';
import { Prefix, UnitsMeasurement } from '@/shared/types/window';

interface GroupElements {
	color: 'blue' | 'yellow' | 'transparent';
	value: number | null;
	text: UnitsMeasurement;
	prefix?: Prefix;
}

// KA mid top
export const midTopGroupUp: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w140.currentValue,
		text: WINDOWS.w140.unitsMeasurement,
		prefix: WINDOWS.w140.prefix,
	},
	{
		color: 'transparent',
		value: WINDOWS.w146.currentValue,
		text: WINDOWS.w146.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w150.currentValue,
		text: WINDOWS.w150.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w154.currentValue,
		text: WINDOWS.w154.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w158.currentValue,
		text: WINDOWS.w158.unitsMeasurement,
		prefix: WINDOWS.w158.prefix,
	},
	{
		color: 'blue',
		value: WINDOWS.w141.currentValue,
		text: WINDOWS.w141.unitsMeasurement,
		prefix: WINDOWS.w141.prefix,
	},
	{
		color: 'blue',
		value: WINDOWS.w147.currentValue,
		text: WINDOWS.w147.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w151.currentValue,
		text: WINDOWS.w151.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w155.currentValue,
		text: WINDOWS.w155.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w159.currentValue,
		text: WINDOWS.w159.unitsMeasurement,
		prefix: WINDOWS.w159.prefix,
	},
];

export const midTopGroupDown: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w142.currentValue,
		text: WINDOWS.w142.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w144.currentValue,
		text: WINDOWS.w144.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w148.currentValue,
		text: WINDOWS.w148.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w152.currentValue,
		text: WINDOWS.w152.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w156.currentValue,
		text: WINDOWS.w156.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w160.currentValue,
		text: WINDOWS.w160.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w143.currentValue,
		text: WINDOWS.w143.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w145.currentValue,
		text: WINDOWS.w145.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w149.currentValue,
		text: WINDOWS.w149.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w153.currentValue,
		text: WINDOWS.w153.unitsMeasurement,
	},
	{
		color: 'yellow',
		value: WINDOWS.w157.currentValue,
		text: WINDOWS.w157.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w161.currentValue,
		text: WINDOWS.w161.unitsMeasurement,
	},
];
