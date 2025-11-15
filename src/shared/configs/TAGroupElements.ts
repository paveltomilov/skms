import { KeyWindows } from '@/shared/configs/window';

interface GroupElements {
	color: 'blue' | 'yellow' | 'transparent';
	id: KeyWindows;
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
		id: 'w75',
	},
	{
		color: 'blue',
		id: 'w77',
	},
	{
		color: 'blue',
		id: 'w80',
	},
	{
		color: 'blue',
		id: 'w82',
	},
];

export const rightMidTwo: GroupElements[] = [
	{
		color: 'blue',
		id: 'w76',
	},
	{
		color: 'blue',
		id: 'w78',
	},
	{
		color: 'blue',
		id: 'w81',
	},
	{
		color: 'blue',
		id: 'w83',
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
