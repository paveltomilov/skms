import { MarkerName } from '../types/markers';

interface Connection {
	point: string;
	provodLocation: 'bottom' | 'left' | 'top' | 'right';
	textTop?: MarkerName;
}

const blockSwitchesConnections: Connection[] = [
	{
		point: 'p.c.3.1.2',
		provodLocation: 'left',
		textTop: 'A11',
	},
	{
		point: 'p.c.3.1.1',
		provodLocation: 'right',
		textTop: 'A1',
	},
	{
		point: 'p.c.3.2.2',
		provodLocation: 'left',
		textTop: 'A19',
	},
	{
		point: 'p.c.3.2.1',
		provodLocation: 'right',
	},
];

export default blockSwitchesConnections;
