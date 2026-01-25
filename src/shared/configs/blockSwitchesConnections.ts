import { MarkerName } from '../types/markers';
import {
	CLOSE_TERMINAL_BLOCK_POINT_ID,
	CONTROL_BREAKER_INPUT_POINT_ID,
	OPEN_TERMINAL_BLOCK_POINT_ID,
} from './controlCircuit/constants';

interface Connection {
	point: string;
	provodLocation: 'bottom' | 'left' | 'top' | 'right';
	textTop?: MarkerName;
}

const blockSwitchesConnections: Connection[] = [
	{
		point: OPEN_TERMINAL_BLOCK_POINT_ID,
		provodLocation: 'left',
		textTop: 'A11',
	},
	{
		point: CONTROL_BREAKER_INPUT_POINT_ID,
		provodLocation: 'right',
		textTop: 'A1',
	},
	{
		point: CLOSE_TERMINAL_BLOCK_POINT_ID,
		provodLocation: 'left',
		textTop: 'A19',
	},
	{
		point: CONTROL_BREAKER_INPUT_POINT_ID,
		provodLocation: 'right',
	},
];

export default blockSwitchesConnections;
