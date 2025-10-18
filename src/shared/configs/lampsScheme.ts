import { MarkerName } from '../types/markers';

interface Connection {
	marker: MarkerName;
	point: string;
}

interface Columns {
	title: 'Закрыто' | 'Открыто';
	color: 'white' | 'lamp_green';
	points: Connection[];
}

export const columns: Columns[] = [
	{
		title: 'Закрыто',
		color: 'white' as const,
		points: [
			{
				marker: 'A',
				point: 'p.c.3.1.2',
			},
			{
				marker: 'N',
				point: 'p.c.n',
			},
		],
	},
	{
		title: 'Открыто',
		color: 'lamp_green' as const,
		points: [
			{
				marker: 'A',
				point: 'p.c.3.2.2',
			},
			{
				marker: 'N',
				point: 'p.c.n',
			},
		],
	},
];
