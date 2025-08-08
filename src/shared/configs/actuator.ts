import { IActuator } from '../types/actuators';

export const ACTUATORS: Record<string, IActuator> = {
	// left_down
	a1: { name: 'ПЭН-1А', state: 'off' },

	// mid_mid
	a2: { name: 'КНБ-1В', state: 'off' },
	a3: { name: 'КНБ-1Г', state: 'off' },
	a4: { name: 'КНБ-1А', state: 'on' },
	a5: { name: 'КНБ-1Б', state: 'off' },

	// mid_down
	a6: { name: 'ПЭН-1Б', state: 'off' },
	a7: { name: 'ПЭН-1В', state: 'on' },

	//right_mid
	a8: { name: 'КЭН-1Г', state: 'off' },
	a9: { name: 'КЭН-1В', state: 'off' },
	a10: { name: 'КЭН-1Б', state: 'off' },
	a11: { name: 'КЭН-1А', state: 'on' },

	// right_down
	a12: { name: 'МНС-1Б', state: 'on' },
	a13: { name: 'МНС-1А', state: 'off' },
	a14: { name: 'АМН-1А', state: 'off' },
	a15: { name: 'АМН-1Б', state: 'off' },
	a16: { name: 'МНР-1А', state: 'on' },
	a17: { name: 'МНР-1Б', state: 'off' },
	a18: { name: 'НГП-1А', state: 'off' },
	a19: { name: 'НГП-1Б', state: 'off' },
};
