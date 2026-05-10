import { MALF_TPL_BREAKER } from '@/shared/configs/malfunctionTemplates';
import { INPUT_CIRCUIT_BREAKER_ID } from '@/shared/configs/powerCircuit/constants';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import type { InitialStateScheme, Malfunction } from '@/shared/types/scheme';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';

export type InputBreakerMechanicalState =
	| 'off'
	| 'turning_on'
	| 'on'
	| 'turning_off';
export type InputBreakerTransitionStatus =
	| 'idle'
	| 'assembled'
	| 'disassembled'
	| 'assemble_failed';

export interface InputBreakerFaultState {
	hasFalseTrigger: boolean;
	closeFailByPhase: Record<string, boolean>;
	openFailByPhase: Record<string, boolean>;
}

export const getInputBreakerFaultState = (
	scheme: InitialStateScheme,
): InputBreakerFaultState => {
	const [badContactTemplate, falseTriggerTemplate, noSwitchingTemplate] =
		MALF_TPL_BREAKER;

	const closeFailByPhase: Record<string, boolean> = {};
	const openFailByPhase: Record<string, boolean> = {};
	let hasFalseTrigger = false;

	for (const phaseId of INPUT_CIRCUIT_BREAKER_ID) {
		const malfunctions = findElementByID(phaseId, scheme).malfunctions;
		closeFailByPhase[phaseId] = hasTemplateMalfunction(
			malfunctions,
			noSwitchingTemplate.name,
			noSwitchingTemplate.suffix,
		);
		openFailByPhase[phaseId] = hasTemplateMalfunction(
			malfunctions,
			badContactTemplate.name,
			badContactTemplate.suffix,
		);
		if (
			hasTemplateMalfunction(
				malfunctions,
				falseTriggerTemplate.name,
				falseTriggerTemplate.suffix,
			)
		) {
			hasFalseTrigger = true;
		}
	}

	return {
		hasFalseTrigger,
		closeFailByPhase,
		openFailByPhase,
	};
};

export const projectInputBreakerContacts = (
	mechanicalState: InputBreakerMechanicalState,
	faultState: InputBreakerFaultState,
): Record<string, number> => {
	const shouldBeOn =
		mechanicalState === 'on' || mechanicalState === 'turning_on';
	const projectedContacts: Record<string, number> = {};

	for (const phaseId of INPUT_CIRCUIT_BREAKER_ID) {
		if (shouldBeOn) {
			const hasCloseFail = Boolean(faultState.closeFailByPhase[phaseId]);
			projectedContacts[phaseId] = hasCloseFail
				? BASE_RESISTANCE_CONSTANT.highResistance
				: BASE_RESISTANCE[phaseId];
			continue;
		}

		const hasOpenFail = Boolean(faultState.openFailByPhase[phaseId]);
		projectedContacts[phaseId] = hasOpenFail
			? BASE_RESISTANCE[phaseId]
			: BASE_RESISTANCE_CONSTANT.highResistance;
	}

	return projectedContacts;
};

export const shouldFalseTrip = (
	mechanicalState: InputBreakerMechanicalState,
	faultState: InputBreakerFaultState,
): boolean => {
	const isNotOffState = mechanicalState !== 'off';

	return faultState.hasFalseTrigger && isNotOffState;
};

const hasTemplateMalfunction = (
	malfunctions: Malfunction[],
	name: string,
	suffix: string,
): boolean =>
	malfunctions.some(
		malfunction =>
			malfunction.active &&
			(malfunction.name === name || malfunction.id.endsWith(suffix)),
	);
