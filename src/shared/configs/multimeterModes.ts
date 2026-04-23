export const MULTIMETER_MODES = [
	{
		id: 'OFF',
		angle: 0,
		group: 'OFF',
		handlerKey: 'powerOff',
		autoAttachNeutralBlack: false,
	},
	{
		id: 'ACV_750',
		angle: 18,
		group: 'ACV',
		handlerKey: 'setACV750',
		autoAttachNeutralBlack: true,
	},
] as const;

export type MultimeterModeConfig = (typeof MULTIMETER_MODES)[number];
export type MultimeterMode = MultimeterModeConfig['id'];
export type MultimeterModeGroup = MultimeterModeConfig['group'];
export type MultimeterModeHandlerKey = MultimeterModeConfig['handlerKey'];

export const MULTIMETER_MODE_IDS: MultimeterMode[] = MULTIMETER_MODES.map(
	mode => mode.id,
);

export const MULTIMETER_MODE_BY_ID: Record<MultimeterMode, MultimeterModeConfig> =
	MULTIMETER_MODES.reduce(
		(acc, mode) => {
			acc[mode.id] = mode;
			return acc;
		},
		{} as Record<MultimeterMode, MultimeterModeConfig>,
	);

export const getMultimeterModeConfig = (
	mode: MultimeterMode,
): MultimeterModeConfig => MULTIMETER_MODE_BY_ID[mode];
