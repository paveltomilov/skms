/**
 * Ð¨Ð°Ð±Ð»Ð¾Ð½Ñ‹ Ð½ÐµÐ¸ÑÐ¿Ñ€Ð°Ð²Ð½Ð¾ÑÑ‚ÐµÐ¹ Ð´Ð»Ñ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² ÑÑ…ÐµÐ¼Ñ‹ ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ.
 * ÐšÐ°Ð¶Ð´Ñ‹Ð¹ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚ Ð¸Ð¼ÐµÐµÑ‚ Ñ‚Ð¸Ð¿ (kind) Ð¸ Ð½Ð°Ð±Ð¾Ñ€ ÑˆÐ°Ð±Ð»Ð¾Ð½Ð¾Ð² Ð½ÐµÐ¸ÑÐ¿Ñ€Ð°Ð²Ð½Ð¾ÑÑ‚ÐµÐ¹.
 */

import { ElementKind } from '../../types/scheme';
import {
	BUTTON_KRUZA_P_CLOSE_ID,
	BUTTON_KRUZA_P_OPEN_ID,
	COIL_CLOSE_ID,
	COIL_OPEN_ID,
	CONTROL_CIRCUIT_BREAKER_ID,
	INSERT_NDI_CMD_CLOSE_PTK_ID,
	INSERT_NDI_CMD_OPEN_PTK_ID,
	INSERT_NDI_NOT_CLOSED_ID,
	INSERT_NDI_NOT_OPEN_ID,
	INTERLOCK_CONTACT_CLOSE_ID,
	INTERLOCK_CONTACT_OPEN_ID,
	LAMP_KRUZA_P_CLOSED_ID,
	LAMP_KRUZA_P_OPEN_ID,
	LIMIT_SWITCH_CLOSE_ID,
	LIMIT_SWITCH_OPEN_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID,
	WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID,
	WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID,
	WIRE_BEFORE_INTERLOCK_CLOSE_ID,
	WIRE_BEFORE_INTERLOCK_OPEN_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID,
	WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID,
	WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID,
	WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID,
	WIRE_BEFORE_NDI_NOT_CLOSED_ID,
	WIRE_BEFORE_NDI_NOT_OPEN_ID,
	WIRE_BOX_TO_LIMIT_CLOSE_ID,
	WIRE_BOX_TO_LIMIT_OPEN_ID,
	WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID,
	WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID,
	WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID,
	WIRE_LIMIT_CLOSE_TO_TERMINAL_ID,
	WIRE_LIMIT_OPEN_TO_TERMINAL_ID,
	WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID,
	WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID,
	WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID,
	WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID,
	WIRE_PHASE_AFTER_BREAKER_ID,
	WIRE_POWER_TO_CONTROL_BREAKER_ID,
	WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID,
	WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID,
} from '@/shared/constants';

type MalfTpl = { suffix: string; name: string };

export const POINT_MALFUNCTION_TEMPLATES: Record<
	string,
	{ kind: ElementKind; templates: MalfTpl[] }
> = {
	// ======================== ÐžÐ±Ñ‰Ð°Ñ Ñ‡Ð°ÑÑ‚ÑŒ ========================
	[WIRE_POWER_TO_CONTROL_BREAKER_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[CONTROL_CIRCUIT_BREAKER_ID]: {
		kind: 'breaker',
		templates: [
			{ suffix: '.1', name: 'ÐŸÐ»Ð¾Ñ…Ð¾Ð¹ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚ Ð½Ð° ÐºÐ»ÐµÐ¼Ð¼Ðµ, Ð½ÐµÑ‚ Ñ„Ð°Ð·Ñ‹' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ Ð²Ñ‹Ð±Ð¸Ð²Ð°ÐµÑ‚' },
			{
				suffix: '.3',
				name: 'ÐœÐµÑ…Ð°Ð½Ð¸Ñ‡ÐµÑÐºÐ°Ñ Ð¿Ñ€Ð¾Ð±Ð»ÐµÐ¼Ð°, Ð½ÐµÑ‚ ÐºÐ¾Ð¼Ð¼ÑƒÑ‚Ð°Ñ†Ð¸Ð¸',
			},
		],
	},
	[WIRE_PHASE_AFTER_BREAKER_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// ======================== Ð’ÐµÑ‚ÐºÐ° ÐžÐ¢ÐšÐ Ð«Ð¢Ð¬ (c.3.0.*) ========================
	[WIRE_BOX_TO_LIMIT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[LIMIT_SWITCH_OPEN_ID]: {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Ð—Ð°Ð»Ð¸Ð¿ÑˆÐ¸Ð¹ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚' },
			{ suffix: '.2', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°' },
			{ suffix: '.3', name: 'ÐÐµ Ð½Ð°ÑÑ‚Ñ€Ð¾ÐµÐ½' },
		],
	},
	[WIRE_LIMIT_OPEN_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[WIRE_TERMINAL_TO_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð’ÑÑ‚Ð°Ð²ÐºÐ° NDI (ÑÐ¸Ð³Ð½Ð°Ð» Ð½Ðµ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾)
	[WIRE_BEFORE_NDI_NOT_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INSERT_NDI_NOT_OPEN_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, Ñ†ÐµÐ¿ÑŒ Ð½Ðµ Ð·Ð°Ð¼Ñ‹ÐºÐ°ÐµÑ‚ÑÑ' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, Ñ†ÐµÐ¿ÑŒ Ð½Ðµ Ñ€Ð°Ð·Ð¼Ñ‹ÐºÐ°ÐµÑ‚ÑÑ' },
		],
	},
	[WIRE_NDI_NOT_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð’ÑÑ‚Ð°Ð²ÐºÐ° NDI (ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚ÑŒ Ñ ÐŸÐ¢Ðš)
	[WIRE_BEFORE_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INSERT_NDI_CMD_OPEN_PTK_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ðµ ÑƒÑ…Ð¾Ð´Ð¸Ñ‚' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿Ð¾ÑÑ‚Ð¾ÑÐ½Ð½Ð¾ Ð²Ð¸ÑÐ¸Ñ‚' },
		],
	},
	[WIRE_NDI_CMD_OPEN_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð‘Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÐ° Ð¸ ÐºÐ°Ñ‚ÑƒÑˆÐºÐ° (Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ)

	// Ð‘Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÐ° Ð¸ ÐºÐ°Ñ‚ÑƒÑˆÐºÐ° (Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ) - c.3.0.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INTERLOCK_CONTACT_OPEN_ID]: {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ Ð·Ð°Ð¼ÐºÐ½ÑƒÑ‚Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚' },
		],
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[COIL_OPEN_ID]: {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'ÐÐµÐ¸ÑÐ¿Ñ€Ð°Ð²Ð½Ð° ÐºÐ°Ñ‚ÑƒÑˆÐºÐ°, Ð¿ÑƒÑÐºÐ°Ñ‚ÐµÐ»ÑŒ Ð½Ðµ Ð¿Ð¾Ð´Ñ‚ÑÐ³Ð¸Ð²Ð°ÐµÑ‚ÑÑ',
			},
		],
	},

	// ÐšÐ½Ð¾Ð¿ÐºÐ° ÐšÐ Ð£Ð—Ð-ÐŸ (Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚ÑŒ) - c.3.0.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[BUTTON_KRUZA_P_OPEN_ID]: {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ðµ ÑƒÑ…Ð¾Ð´Ð¸Ñ‚' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿Ð¾ÑÑ‚Ð¾ÑÐ½Ð½Ð¾ Ð²Ð¸ÑÐ¸Ñ‚' },
		],
	},
	[WIRE_BUTTON_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð›Ð°Ð¼Ð¿Ð° Ð² ÐšÐ Ð£Ð—Ð-ÐŸ (Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¾)
	[WIRE_BEFORE_LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[LAMP_KRUZA_P_CLOSED_ID]: {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'ÐŸÐµÑ€ÐµÐ³Ð¾Ñ€ÐµÐ»Ð°' }],
	},
	[WIRE_LAMP_KRUZA_P_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// ======================== Ð’ÐµÑ‚ÐºÐ° Ð—ÐÐšÐ Ð«Ð¢Ð¬ (c.3.1.*) ========================
	[WIRE_BOX_TO_LIMIT_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[LIMIT_SWITCH_CLOSE_ID]: {
		kind: 'limitSwitch',
		templates: [
			{ suffix: '.1', name: 'Ð—Ð°Ð»Ð¸Ð¿ÑˆÐ¸Ð¹ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚' },
			{ suffix: '.2', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°' },
			{ suffix: '.3', name: 'ÐÐµ Ð½Ð°ÑÑ‚Ñ€Ð¾ÐµÐ½' },
		],
	},
	[WIRE_LIMIT_CLOSE_TO_TERMINAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[WIRE_TERMINAL_TO_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð’ÑÑ‚Ð°Ð²ÐºÐ° NDI (ÑÐ¸Ð³Ð½Ð°Ð» Ð½Ðµ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¾)
	[WIRE_BEFORE_NDI_NOT_CLOSED_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INSERT_NDI_NOT_CLOSED_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, Ñ†ÐµÐ¿ÑŒ Ð½Ðµ Ð·Ð°Ð¼Ñ‹ÐºÐ°ÐµÑ‚ÑÑ' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, Ñ†ÐµÐ¿ÑŒ Ð½Ðµ Ñ€Ð°Ð·Ð¼Ñ‹ÐºÐ°ÐµÑ‚ÑÑ' },
		],
	},
	[WIRE_NDI_NOT_CLOSED_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð’ÑÑ‚Ð°Ð²ÐºÐ° NDI (ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð·Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ Ñ ÐŸÐ¢Ðš)
	[WIRE_BEFORE_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INSERT_NDI_CMD_CLOSE_PTK_ID]: {
		kind: 'insert',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ðµ ÑƒÑ…Ð¾Ð´Ð¸Ñ‚' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿Ð¾ÑÑ‚Ð¾ÑÐ½Ð½Ð¾ Ð²Ð¸ÑÐ¸Ñ‚' },
		],
	},
	[WIRE_NDI_CMD_CLOSE_PTK_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð‘Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÐ° Ð¸ ÐºÐ°Ñ‚ÑƒÑˆÐºÐ° (Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ)

	// Ð‘Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÐ° Ð¸ ÐºÐ°Ñ‚ÑƒÑˆÐºÐ° (Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ) - c.3.1.4.1.1.*
	[WIRE_BEFORE_INTERLOCK_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[INTERLOCK_CONTACT_CLOSE_ID]: {
		kind: 'blockingContact',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ Ð·Ð°Ð¼ÐºÐ½ÑƒÑ‚Ñ‹Ð¹ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚' },
		],
	},
	[WIRE_AFTER_INTERLOCK_TO_COIL_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ— Ð½Ð° Ð·ÐµÐ¼Ð»ÑŽ' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[COIL_CLOSE_ID]: {
		kind: 'coil',
		templates: [
			{
				suffix: '.1',
				name: 'ÐÐµÐ¸ÑÐ¿Ñ€Ð°Ð²Ð½Ð° ÐºÐ°Ñ‚ÑƒÑˆÐºÐ°, Ð¿ÑƒÑÐºÐ°Ñ‚ÐµÐ»ÑŒ Ð½Ðµ Ð¿Ð¾Ð´Ñ‚ÑÐ³Ð¸Ð²Ð°ÐµÑ‚ÑÑ',
			},
		],
	},

	// ÐšÐ½Ð¾Ð¿ÐºÐ° ÐšÐ Ð£Ð—Ð-ÐŸ (Ð·Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ) - c.3.1.4.1.2.*
	[WIRE_BEFORE_BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[BUTTON_KRUZA_P_CLOSE_ID]: {
		kind: 'button',
		templates: [
			{ suffix: '.1', name: 'ÐÐµÑ‚ ÐºÐ¾Ð½Ñ‚Ð°ÐºÑ‚Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð½Ðµ ÑƒÑ…Ð¾Ð´Ð¸Ñ‚' },
			{ suffix: '.2', name: 'Ð›Ð¾Ð¶Ð½Ð¾ ÑÑ€Ð°Ð±Ð¾Ñ‚Ð°Ð»Ð°, ÐºÐ¾Ð¼Ð°Ð½Ð´Ð° Ð¿Ð¾ÑÑ‚Ð¾ÑÐ½Ð½Ð¾ Ð²Ð¸ÑÐ¸Ñ‚' },
		],
	},
	[WIRE_BUTTON_KRUZA_P_CLOSE_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},

	// Ð›Ð°Ð¼Ð¿Ð° Ð² ÐšÐ Ð£Ð—Ð-ÐŸ (Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾)
	[WIRE_BEFORE_LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
	[LAMP_KRUZA_P_OPEN_ID]: {
		kind: 'lamp',
		templates: [{ suffix: '.1', name: 'ÐŸÐµÑ€ÐµÐ³Ð¾Ñ€ÐµÐ»Ð°' }],
	},
	[WIRE_LAMP_KRUZA_P_OPEN_TO_NEUTRAL_ID]: {
		kind: 'wire',
		templates: [
			{ suffix: '.1', name: 'ÐžÐ±Ñ€Ñ‹Ð² Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð°' },
			{ suffix: '.2', name: 'ÐšÐ—' },
			{ suffix: '.3', name: 'ÐšÐ— Ñ ÑÐ¾ÑÐµÐ´Ð½Ð¸Ð¼ Ð¿Ñ€Ð¾Ð²Ð¾Ð´Ð¾Ð¼' },
		],
	},
};



