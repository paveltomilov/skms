import { KeyWindows } from '@/shared/configs/window';

type TildaConfig = {
	color?: 'white' | 'green';
	disabled?: boolean;
};

export const firstWindows: KeyWindows[] = [
	'w113',
	'w114',
	'w115',
	'w116',
	'w117',
	'w118',
];
export const secondWindows: KeyWindows[] = [
	'w119',
	'w120',
	'w121',
	'w122',
	'w123',
	'w124',
];
export const thirdWindows: KeyWindows[] = [
	'w125',
	'w126',
	'w127',
	'w128',
	'w129',
	'w130',
];
export const fourthWindows: KeyWindows[] = [
	'w131',
	'w132',
	'w133',
	'w134',
	'w135',
	'w136',
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
