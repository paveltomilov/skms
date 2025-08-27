import { WINDOWS } from '@/shared/configs/window';
import { Prefix, UnitsMeasurement } from '@/shared/types/window';

interface GroupElements {
	color: 'blue' | 'yellow' | 'transparent';
	value: number | null;
	text: UnitsMeasurement;
	prefix?: Prefix;
	minValue?: number;
	maxValue?: number;
}

// KA mid top
export const midTopGroupUp: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w140.currentValue,
		text: WINDOWS.w140.unitsMeasurement,
		prefix: WINDOWS.w140.prefix,
		minValue: WINDOWS.w140.minValue,
		maxValue: WINDOWS.w140.maxValue,
	},
	{
		color: 'transparent',
		value: WINDOWS.w146.currentValue,
		text: WINDOWS.w146.unitsMeasurement,
		minValue: WINDOWS.w146.minValue,
		maxValue: WINDOWS.w146.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w150.currentValue,
		text: WINDOWS.w150.unitsMeasurement,
		minValue: WINDOWS.w150.minValue,
		maxValue: WINDOWS.w150.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w154.currentValue,
		text: WINDOWS.w154.unitsMeasurement,
		minValue: WINDOWS.w154.minValue,
		maxValue: WINDOWS.w154.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w158.currentValue,
		text: WINDOWS.w158.unitsMeasurement,
		prefix: WINDOWS.w158.prefix,
		minValue: WINDOWS.w158.minValue,
		maxValue: WINDOWS.w158.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w141.currentValue,
		text: WINDOWS.w141.unitsMeasurement,
		prefix: WINDOWS.w141.prefix,
		minValue: WINDOWS.w141.minValue,
		maxValue: WINDOWS.w141.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w147.currentValue,
		text: WINDOWS.w147.unitsMeasurement,
		minValue: WINDOWS.w147.minValue,
		maxValue: WINDOWS.w147.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w151.currentValue,
		text: WINDOWS.w151.unitsMeasurement,
		minValue: WINDOWS.w151.minValue,
		maxValue: WINDOWS.w151.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w155.currentValue,
		text: WINDOWS.w155.unitsMeasurement,
		minValue: WINDOWS.w155.minValue,
		maxValue: WINDOWS.w155.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w159.currentValue,
		text: WINDOWS.w159.unitsMeasurement,
		prefix: WINDOWS.w159.prefix,
		minValue: WINDOWS.w159.minValue,
		maxValue: WINDOWS.w159.maxValue,
	},
];

export const midTopGroupDown: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w142.currentValue,
		text: WINDOWS.w142.unitsMeasurement,
		minValue: WINDOWS.w142.minValue,
		maxValue: WINDOWS.w142.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w144.currentValue,
		text: WINDOWS.w144.unitsMeasurement,
		minValue: WINDOWS.w144.minValue,
		maxValue: WINDOWS.w144.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w148.currentValue,
		text: WINDOWS.w148.unitsMeasurement,
		minValue: WINDOWS.w148.minValue,
		maxValue: WINDOWS.w148.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w152.currentValue,
		text: WINDOWS.w152.unitsMeasurement,
		minValue: WINDOWS.w152.minValue,
		maxValue: WINDOWS.w152.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w156.currentValue,
		text: WINDOWS.w156.unitsMeasurement,
		minValue: WINDOWS.w156.minValue,
		maxValue: WINDOWS.w156.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w160.currentValue,
		text: WINDOWS.w160.unitsMeasurement,
		minValue: WINDOWS.w160.minValue,
		maxValue: WINDOWS.w160.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w143.currentValue,
		text: WINDOWS.w143.unitsMeasurement,
		minValue: WINDOWS.w143.minValue,
		maxValue: WINDOWS.w143.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w145.currentValue,
		text: WINDOWS.w145.unitsMeasurement,
		minValue: WINDOWS.w145.minValue,
		maxValue: WINDOWS.w145.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w149.currentValue,
		text: WINDOWS.w149.unitsMeasurement,
		minValue: WINDOWS.w149.minValue,
		maxValue: WINDOWS.w149.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w153.currentValue,
		text: WINDOWS.w153.unitsMeasurement,
		minValue: WINDOWS.w153.minValue,
		maxValue: WINDOWS.w153.maxValue,
	},
	{
		color: 'yellow',
		value: WINDOWS.w157.currentValue,
		text: WINDOWS.w157.unitsMeasurement,
		minValue: WINDOWS.w157.minValue,
		maxValue: WINDOWS.w157.maxValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w161.currentValue,
		text: WINDOWS.w161.unitsMeasurement,
		minValue: WINDOWS.w161.minValue,
		maxValue: WINDOWS.w161.maxValue,
	},
];
