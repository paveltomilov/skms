import { WINDOWS } from '@/shared/configs/window';

type TildaConfig = {
	color?: 'white' | 'green';
	disabled?: boolean;
};

export const firstWindowsTop = [
	WINDOWS.w96,
	WINDOWS.w97,
	WINDOWS.w98,
	WINDOWS.w99,
	WINDOWS.w100,
	WINDOWS.w101,
];

export const secondWindowsTop = [
	WINDOWS.w102,
	WINDOWS.w103,
	WINDOWS.w104,
	WINDOWS.w105,
	WINDOWS.w106,
	WINDOWS.w107,
];

export const thirdWindowsTop = [WINDOWS.w108, WINDOWS.w109, WINDOWS.w110];

export const tildaConfigTop: TildaConfig[] = [
	{ color: 'white', disabled: true },
	{},
	{},
	{},
	{},
	{ color: 'white' },
];

export const buttonsConfigTop = [
	{ text: 'РСП', bgClass: 'btn__bgGreen' },
	{ text: 'Корр-тор', bgClass: 'btn__bgGreen' },
	{ text: 'КРМ', bgClass: 'btn__bgGreen' },
];

export const lettersConfigTop = ['А', 'Б', 'В', 'Г', 'Д', 'Е'];
