import type { AppDispatch } from '@/store/store';
import { setResistance } from '@/store/circuitSlice';
import {
	CONTROL_CIRCUIT_BREAKER_ID,
} from '@/shared/configs/controlCircuit/constants';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { dispatchInputBreakerSwitchCommand } from '@/store/inputBreakerSlice';

export type UniversalCommand =
	| { type: 'turn_on'; target: 'input_breaker' | 'control_breaker' }
	| { type: 'turn_off'; target: 'input_breaker' | 'control_breaker' }
	| { type: 'press_open'; target: 'kruzap' | 'ptk' }
	| { type: 'press_close'; target: 'kruzap' | 'ptk' }
	| { type: 'release'; target: 'kruzap' | 'ptk' };

export const dispatchAutomationCommand = (
	dispatch: AppDispatch,
	command: UniversalCommand,
	handlers: {
		press?: (target: 'kruzap' | 'ptk', button: 'open' | 'close') => void;
		release?: (target: 'kruzap' | 'ptk') => void;
	},
): void => {
	if (command.type === 'turn_on' || command.type === 'turn_off') {
		if (command.target === 'input_breaker') {
			dispatch(
				dispatchInputBreakerSwitchCommand(
					command.type === 'turn_on' ? 'on' : 'off',
				),
			);
			return;
		}

		dispatch(
			setResistance({
				id: CONTROL_CIRCUIT_BREAKER_ID,
				value:
					command.type === 'turn_on'
						? BASE_RESISTANCE[CONTROL_CIRCUIT_BREAKER_ID]
						: BASE_RESISTANCE_CONSTANT.highResistance,
			}),
		);
		return;
	}

	if (
		(command.type === 'press_open' || command.type === 'press_close') &&
		handlers.press
	) {
		handlers.press(
			command.target,
			command.type === 'press_open' ? 'open' : 'close',
		);
		return;
	}

	if (command.type === 'release' && handlers.release) {
		handlers.release(command.target);
	}
};
