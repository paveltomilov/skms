import {
	getMultimeterModeConfig,
	type MultimeterMode,
	type MultimeterModeHandlerKey,
} from '@/shared/configs/multimeterModes';
import {
	MultimeterModePropPayload,
	powerOff,
	setACV750,
} from '@/store/multimeterSlice';
import { UnknownAction } from '@reduxjs/toolkit';

type MultimeterModeExecutor = (
	payload?: MultimeterModePropPayload,
) => UnknownAction;

const actionsByHandlerKey: Record<
	MultimeterModeHandlerKey,
	MultimeterModeExecutor
> = {
	powerOff: () => powerOff(),
	setACV750: payload => {
		if (!payload) {
			throw new Error('Payload is required for setACV750 action');
		}
		return setACV750(payload);
	},
};

/**
 * Получить экшен по режиму мультиметра
 * @param mode {MultimeterMode} режим мультиметра
 */
export const getMultimeterAction = <M extends MultimeterMode>(
	mode: M,
): MultimeterModeExecutor => {
	const modeConfig = getMultimeterModeConfig(mode);
	return actionsByHandlerKey[modeConfig.handlerKey];
};
