export interface ButtonListFooter {
	width: number;
	height: number;
	text?: string;
	ariaLabel?: string;
	href?: string;
	disabled?: boolean;
}

export const configButtonListTop: ButtonListFooter[] = [
	{
		width: 72,
		height: 28,
		text: 'КА',
		ariaLabel: 'Кнопка КА',
		href: '/ptk/boiler',
	},
	{
		width: 88,
		height: 28,
		ariaLabel: 'Кнопка ТА',
		text: 'ТА',
		href: '/ptk',
	},
    ...Array(6).fill(null).map(()=> ({
		width: 88,
		height: 28,
		disabled: true,
	}))
	
];

export const configButtonListBottom: ButtonListFooter[] = [
	 ...Array(8).fill(null).map(()=> ({
		width: 88,
		height: 28,
		disabled: true,
	}))
];
