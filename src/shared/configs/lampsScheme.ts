import { MarkerName } from '../types/markers';

export const pins: { code: MarkerName }[] = [
	{ code: 'A' as const },
	{ code: 'N' as const },
];

interface Column {
	title: 'Закрыто' | 'Открыто',
	color: 'white' | 'red' | 'lamp_green',
	point: string
};

export const columns: Column[] = [
	{ 
		title: 'Закрыто', 
		color: 'white' as const ,
		point: 'p.c.3.1.2'
	},
	{ 
		title: 'Открыто', 
		color: 'lamp_green' as const , 
		point: 'p.c.3.2.2'
	},
];
