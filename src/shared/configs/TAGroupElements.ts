import { WINDOWS } from '@/shared/configs/window';
import { UnitsMeasurement } from '@/shared/types/window';

interface GroupElements {
	color: 'blue' | 'yellow' | 'white';
	value: number;
	text: UnitsMeasurement;
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
	},
	{
		color: 'blue',
		value: WINDOWS.w77.currentValue,
		text: WINDOWS.w77.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w80.currentValue,
		text: WINDOWS.w80.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w82.currentValue,
		text: WINDOWS.w82.unitsMeasurement,
	},
];

export const rightMidTwo: GroupElements[] = [
	{
		color: 'blue',
		value: WINDOWS.w76.currentValue,
		text: WINDOWS.w76.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w78.currentValue,
		text: WINDOWS.w78.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w81.currentValue,
		text: WINDOWS.w81.unitsMeasurement,
	},
	{
		color: 'blue',
		value: WINDOWS.w83.currentValue,
		text: WINDOWS.w83.unitsMeasurement,
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
