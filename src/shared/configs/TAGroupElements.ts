import { WINDOWS } from '@/shared/configs/window';
import { UnitsMeasurement } from '@/shared/types/window';

interface GroupElements {
	color: 'blue' | 'yellow' | 'transparent';
	value: number;
	text: UnitsMeasurement;
	maxValue?: number;
	minValue?: number;
}

interface GroupElementsArrow {
	state: 'off' | 'on' | 'no power';
	transform: 'rotate90' | 'rotateLeft90' | 'rotate180';
	disabled: boolean;
	text: string;
}

// TA Right mid
export const rightMidOne: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w75.currentValue,
		text: WINDOWS.w75.unitsMeasurement,
		maxValue: WINDOWS.w75.maxValue,
		minValue: WINDOWS.w75.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w77.currentValue,
		text: WINDOWS.w77.unitsMeasurement,
		maxValue: WINDOWS.w77.maxValue,
		minValue: WINDOWS.w77.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w80.currentValue,
		text: WINDOWS.w80.unitsMeasurement,
		maxValue: WINDOWS.w80.maxValue,
		minValue: WINDOWS.w80.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w82.currentValue,
		text: WINDOWS.w82.unitsMeasurement,
		maxValue: WINDOWS.w82.maxValue,
		minValue: WINDOWS.w82.minValue,
	},
];

export const rightMidTwo: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w76.currentValue,
		text: WINDOWS.w76.unitsMeasurement,
		maxValue: WINDOWS.w76.maxValue,
		minValue: WINDOWS.w76.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w78.currentValue,
		text: WINDOWS.w78.unitsMeasurement,
		maxValue: WINDOWS.w78.maxValue,
		minValue: WINDOWS.w78.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w81.currentValue,
		text: WINDOWS.w81.unitsMeasurement,
		maxValue: WINDOWS.w81.maxValue,
		minValue: WINDOWS.w81.minValue,
	},
	{
		color: 'blue',
		value: WINDOWS.w83.currentValue,
		text: WINDOWS.w83.unitsMeasurement,
		maxValue: WINDOWS.w83.maxValue,
		minValue: WINDOWS.w83.minValue,
	},
];

export const rightMidThree: GroupElementsArrow[] = [
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: true,
		text: 'КЭН-1Г',
	},
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'КЭН-1В',
	},
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'КЭН-1Б',
	},
	{
		state: 'on',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'КЭН-1А',
	},
];

// TA Right bottom
export const rightBottomOne: GroupElementsArrow[] = [
	{
		state: 'on',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'МНС-1Б',
	},
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'МНС-1А',
	},
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'АМН-1А',
	},
	{
		state: 'off',
		transform: 'rotateLeft90',
		disabled: false,
		text: 'АМН-1Б',
	},
];
