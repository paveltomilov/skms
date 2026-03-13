import { useEffect, useMemo, useState } from 'react';
import { MALF_TPL_BREAKER } from '../configs/malfunctionTemplates';
import {
	INPUT_BREAKER_CONTACT_PHASE_A_ID,
	INPUT_BREAKER_CONTACT_PHASE_B_ID,
	INPUT_BREAKER_CONTACT_PHASE_C_ID,
	INPUT_CIRCUIT_BREAKER_ID,
} from '../configs/powerCircuit/constants';
import { getMalfunctionCombinedElements } from '../utils/getMalfunctionCombinedElements/getMalfunctionCombinedElements';
import { MalfTpl } from '../types/scheme';
import { useAppSelector } from './store';

const [
	malfunctionBadContact,
	malfunctionFalseTriggers,
	malfunctionNoSwitching,
] = MALF_TPL_BREAKER;

const [A, B, C] = INPUT_CIRCUIT_BREAKER_ID;

interface MalfunctionContact {
	[key: string]: boolean;
}
interface MalfunctionContactsInputBreaker {
	hasMalfunctionBadContactPhasesInputBreaker: MalfunctionContact;
	hasMalfunctionFalseTriggersPhasesInputBreaker: MalfunctionContact;
	hasMalfunctionNoSwitchingPhasesInputBreaker: MalfunctionContact;
}

const defaultObj: MalfunctionContactsInputBreaker = {
	hasMalfunctionBadContactPhasesInputBreaker: {
		A: false,
		B: false,
		C: false,
	},
	hasMalfunctionFalseTriggersPhasesInputBreaker: {
		A: false,
		B: false,
		C: false,
	},
	hasMalfunctionNoSwitchingPhasesInputBreaker: {
		A: false,
		B: false,
		C: false,
	},
};

export const useGetMalfunctionsInputBreaker =
	(): MalfunctionContactsInputBreaker => {
		const [malfunctionsObj, setMalfunctionsObj] =
			useState<MalfunctionContactsInputBreaker>(defaultObj);

		const circuit = useAppSelector(state => state.circuit);

		const listActiveMalfunction = useMemo(() => {
			return getMalfunctionCombinedElements(
				INPUT_CIRCUIT_BREAKER_ID,
				circuit,
			);
		}, [circuit]);

		useEffect(() => {
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
			const buildPhaseStates = (template: MalfTpl) => {
				return {
					[A]: checkMalfunction(
						INPUT_BREAKER_CONTACT_PHASE_A_ID,
						template,
					),
					[B]: checkMalfunction(
						INPUT_BREAKER_CONTACT_PHASE_B_ID,
						template,
					),
					[C]: checkMalfunction(
						INPUT_BREAKER_CONTACT_PHASE_C_ID,
						template,
					),
				};
			};

			setMalfunctionsObj({
				hasMalfunctionBadContactPhasesInputBreaker: buildPhaseStates(
					malfunctionBadContact,
				),
				hasMalfunctionFalseTriggersPhasesInputBreaker: buildPhaseStates(
					malfunctionFalseTriggers,
				),
				hasMalfunctionNoSwitchingPhasesInputBreaker: buildPhaseStates(
					malfunctionNoSwitching,
				),
			});
		}, [listActiveMalfunction]);

		return malfunctionsObj;
	};
