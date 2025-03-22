import { PopupBtn } from '../types/popupBtn';

// Кастомные кнопки для передачи в PopUp
export const customButtons: PopupBtn[] = [
	{
		id: 'custom1',
		width: 238,
		height: 35,
		text: 'Кнопка 1 (Props)',
		onClick: () => console.log('Custom action 1'),
	},
	{
		id: 'custom2',
		width: 238,
		height: 35,
		text: 'Кнопка 2 (Props)',
		onClick: () => console.log('Custom action 2'),
	},
	{
		id: 'custom3',
		width: 238,
		height: 35,
		text: 'Кнопка 3 (Props)',
		onClick: () => console.log('Custom action 2'),
	},
];

export const defaultButtons: PopupBtn[] = [
	{ id: 'btn1', width: 238, height: 35, text: 'Замерить напряжение' },
	{ id: 'btn2', width: 238, height: 35, text: 'Замерить ток' },
	{ id: 'btn3', width: 238, height: 35, text: 'Замерить сопротивление' },
];
