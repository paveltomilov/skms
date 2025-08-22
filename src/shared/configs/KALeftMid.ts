import { WINDOWS } from '@/shared/configs/window';

type TildaConfig = {
	color?: 'white' | 'green';
	disabled?: boolean;
};

export const firstWindows = [
	WINDOWS.w113,
	WINDOWS.w114,
	WINDOWS.w115,
	WINDOWS.w116,
	WINDOWS.w117,
	WINDOWS.w118,
];
export const secondWindows = [
	WINDOWS.w119,
	WINDOWS.w120,
	WINDOWS.w121,
	WINDOWS.w122,
	WINDOWS.w123,
	WINDOWS.w124,
];
export const thirdWindows = [
	WINDOWS.w125,
	WINDOWS.w126,
	WINDOWS.w127,
	WINDOWS.w128,
	WINDOWS.w129,
	WINDOWS.w130,
];
export const fourthWindows = [
	WINDOWS.w131,
	WINDOWS.w132,
	WINDOWS.w133,
	WINDOWS.w134,
	WINDOWS.w135,
	WINDOWS.w136,
];

export const buttonsConfig = [
	{ text: 'РЗМ 1МВ-А', bgClass: 'btn__bgWhite' },
	{ text: 'РЗМ 1МВ-Б', bgClass: 'btn__bgGreen' },
	{ text: 'РЗМ 1МВ-В', bgClass: 'btn__bgGreen' },
	{ text: 'РЗМ 1МВ-Г', bgClass: 'btn__bgGreen' },
	{ text: 'РЗМ 1МВ-Д', bgClass: 'btn__bgWhite' },
	{ text: 'РЗМ 1МВ-Е', bgClass: 'btn__bgWhite' },
];

export const tildaConfig: TildaConfig[] = [
	{ color: 'white', disabled: true },
	{},
	{},
	{},
	{},
	{ color: 'white' },
];
