import { useMemo } from 'react';
import { MALF_TPL_BREAKER } from '../configs/malfunctionTemplates';
import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
	INPUT_CIRCUIT_BREAKER_ID,
} from '../configs/powerCircuit/constants';
import { useGetMalfunctionCombinedElements } from './useGetMalfunctionCombinedElements';
import { MalfTpl } from '../types/scheme';

const [
	malfunctionBadContact,
	malfunctionFalseTriggers,
	malfunctionNoSwitching,
] = MALF_TPL_BREAKER;

export const useGetMalfunctionInputBreaker = () => {
	const listActiveMalfunction = useGetMalfunctionCombinedElements(
		INPUT_CIRCUIT_BREAKER_ID,
	);

	/**
	 * Проверка наличия неисправности по шаблону
	 * @param contactId ID контакта (например, "p.0.7")
	 * @param template Шаблон неисправности с полями { name: string; suffix: string }
	 * @returns true если найдена неисправность, соответствующая шаблону
	 */
	const checkMalfunction = (phaseId: string, template: MalfTpl) => {
		return (
			listActiveMalfunction[phaseId]?.some(
				mal =>
					mal.name === template.name ||
					mal.id.slice(-2) === template.suffix,
			) ?? false
		);
	};

	// Оптимизированная генерация состояний по фазам
	const useBuildPhaseStates = (template: MalfTpl) =>
		useMemo(
			() => ({
				A: checkMalfunction(INPUT_BREAKER_CONTACT_PHASE_A_ID, template),
				B: checkMalfunction(INPUT_BREAKER_CONTACT_PHASE_B_ID, template),
				C: checkMalfunction(INPUT_BREAKER_CONTACT_PHASE_C_ID, template),
			}),
			[template],
		);

	const hasMalfunctionBadContactPhasesInputBreaker = useBuildPhaseStates(
		malfunctionBadContact,
	);
	const hasMalfunctionFalseTriggersPhasesInputBreaker = useBuildPhaseStates(
		malfunctionFalseTriggers,
	);
	const hasMalfunctionNoSwitchingPhasesInputBreaker = useBuildPhaseStates(
		malfunctionNoSwitching,
	);

	return {
		hasMalfunctionBadContactPhasesInputBreaker,
		hasMalfunctionFalseTriggersPhasesInputBreaker,
		hasMalfunctionNoSwitchingPhasesInputBreaker,
	};
};
