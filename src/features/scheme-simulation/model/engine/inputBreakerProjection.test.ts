import {
	getInputBreakerFaultState,
	projectInputBreakerContacts,
} from './inputBreakerProjection';
import { initialStateScheme } from '@/shared/configs/scheme';
import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
} from '@/shared/configs/powerCircuit/constants';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';

const cloneScheme = () =>
	JSON.parse(JSON.stringify(initialStateScheme)) as typeof initialStateScheme;

describe('inputBreakerProjection', () => {
	it('detects false-trigger malfunction on any breaker phase', () => {
		const scheme = cloneScheme();
		const phaseC = findElementByID(INPUT_BREAKER_CONTACT_PHASE_C_ID, scheme);
		phaseC.malfunctions[1].active = true;

		const faultState = getInputBreakerFaultState(scheme);

		expect(faultState.hasFalseTrigger).toBe(true);
	});

	it('keeps all phases closed in ON state without malfunctions', () => {
		const scheme = cloneScheme();
		const faultState = getInputBreakerFaultState(scheme);
		const result = projectInputBreakerContacts('on', faultState);

		expect(result[INPUT_BREAKER_CONTACT_PHASE_A_ID]).toBe(
			BASE_RESISTANCE[INPUT_BREAKER_CONTACT_PHASE_A_ID],
		);
		expect(result[INPUT_BREAKER_CONTACT_PHASE_B_ID]).toBe(
			BASE_RESISTANCE[INPUT_BREAKER_CONTACT_PHASE_B_ID],
		);
		expect(result[INPUT_BREAKER_CONTACT_PHASE_C_ID]).toBe(
			BASE_RESISTANCE[INPUT_BREAKER_CONTACT_PHASE_C_ID],
		);
	});

	it('opens only faulty phase when "no switching" malfunction is active', () => {
		const scheme = cloneScheme();
		const phaseA = findElementByID(INPUT_BREAKER_CONTACT_PHASE_A_ID, scheme);
		phaseA.malfunctions[2].active = true;

		const faultState = getInputBreakerFaultState(scheme);
		const result = projectInputBreakerContacts('on', faultState);

		expect(result[INPUT_BREAKER_CONTACT_PHASE_A_ID]).toBe(
			BASE_RESISTANCE_CONSTANT.highResistance,
		);
		expect(result[INPUT_BREAKER_CONTACT_PHASE_B_ID]).toBe(
			BASE_RESISTANCE[INPUT_BREAKER_CONTACT_PHASE_B_ID],
		);
	});

	it('keeps phase closed in OFF state when "bad contact" malfunction is active', () => {
		const scheme = cloneScheme();
		const phaseB = findElementByID(INPUT_BREAKER_CONTACT_PHASE_B_ID, scheme);
		phaseB.malfunctions[0].active = true;

		const faultState = getInputBreakerFaultState(scheme);
		const result = projectInputBreakerContacts('off', faultState);

		expect(result[INPUT_BREAKER_CONTACT_PHASE_B_ID]).toBe(
			BASE_RESISTANCE[INPUT_BREAKER_CONTACT_PHASE_B_ID],
		);
		expect(result[INPUT_BREAKER_CONTACT_PHASE_C_ID]).toBe(
			BASE_RESISTANCE_CONSTANT.highResistance,
		);
	});
});
