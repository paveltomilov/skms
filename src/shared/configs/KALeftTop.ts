import { KeyWindows } from './window';

type TildaConfig = {
	color?: 'white' | 'green';
	disabled?: boolean;
};

export const firstWindowsTop: KeyWindows[] = [
	'w96',
	'w97',
	'w98',
	'w99',
	'w100',
	'w101',
];

export const secondWindowsTop: KeyWindows[] = [
	'w102',
	'w103',
	'w104',
	'w105',
	'w106',
	'w107',
];

export const thirdWindowsTop: KeyWindows[] = ['w108', 'w109', 'w110'];

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
