import { GATE_STATE_TYPE } from '../types/gate';

export const GATE_ACTIONS = {
	open: {
		state: GATE_STATE_TYPE.toOpen,
		value: 18.8,
		disabled: ['openBtn', 'closeBtn'],
		enabled: ['stopBtn'],
	},
	close: {
		state: GATE_STATE_TYPE.toClose,
		value: 18.8,
		disabled: ['openBtn', 'closeBtn'],
		enabled: ['stopBtn'],
	},
	stop: {
		state: GATE_STATE_TYPE.intermediate,
		value: 18.8,
		disabled: ['stopBtn'],
		enabled: ['openBtn', 'closeBtn'],
	},
};

export const DISABLED_BUTTONS_MAP = {
	open: ['openBtn', 'stopBtn'],
	close: ['closeBtn', 'stopBtn'],
	toOpen: ['openBtn', 'closeBtn'],
	toClose: ['closeBtn', 'openBtn'],
	intermediate: ['stopBtn'],
	noPower: ['stopBtn', 'openBtn', 'closeBtn'],
};
