import {
	InitialStateScheme,
	CircuitElement,
	CircuitBranch,
} from '@/shared/types/scheme';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import {
	COIL_OPEN_ID,
	COIL_CLOSE_ID,
	OPEN_COIL_INPUT_POINT_ID,
	CLOSE_COIL_INPUT_POINT_ID,
} from '@/shared/configs/controlCircuit/constants';
import {
	STARTER_CONTACT_OPEN_PHASE_A_ID,
	STARTER_CONTACT_OPEN_PHASE_B_ID,
	STARTER_CONTACT_OPEN_PHASE_C_ID,
	STARTER_CONTACT_CLOSE_PHASE_A_ID,
	STARTER_CONTACT_CLOSE_PHASE_B_ID,
	STARTER_CONTACT_CLOSE_PHASE_C_ID,
} from '@/shared/configs/powerCircuit/constants';

/**
 * Рекурсивно извлекает все элементы схемы из ветвей.
 */
function extractElements(branches: CircuitBranch[]): CircuitElement[] {
	const elements: CircuitElement[] = [];

	for (const branch of branches) {
		if (Array.isArray(branch)) {
			elements.push(...extractElements(branch));
		} else {
			elements.push(branch);
		}
	}

	return elements;
}

/**
 * Создает карту элементов схемы по их ID для быстрого доступа.
 */
function buildElementsMap(
	scheme: InitialStateScheme,
): Record<string, CircuitElement> {
	const allElements = [
		...extractElements(scheme.powerCircuit),
		...extractElements(scheme.controlCircuit),
	];

	const elementsMap: Record<string, CircuitElement> = {};
	for (const element of allElements) {
		elementsMap[element.id] = element;
	}

	return elementsMap;
}

/**
 * Проверяет, имеет ли катушка активные неисправности.
 */
function hasActiveMalfunctions(coil: CircuitElement): boolean {
	if (!Array.isArray(coil.malfunctions)) {
		return false;
	}
	return coil.malfunctions.some(malfunction => malfunction.active);
}

/**
 * Обновляет сопротивление контактов пускателя на основе состояния катушки.
 *
 * Правила:
 * - Если в точке входа катушки есть напряжение И катушка не имеет активных неисправностей
 *   → контакты пускателя замыкаются (resistance = 0)
 * - Если напряжение пропадает ИЛИ появляется неисправность
 *   → контакты пускателя размыкаются (resistance = highResistance)
 *
 * @param scheme - схема с элементами
 * @param points - текущее состояние точек (Record<pointId, state>)
 * @returns объект с изменениями сопротивлений { elementId: newResistance }
 */
export function updateStarterContacts(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
): Record<string, number> {
	const elementsMap = buildElementsMap(scheme);
	const resistanceChanges: Record<string, number> = {};

	// Обработка катушки открытия и её контактов
	const coilOpen = elementsMap[COIL_OPEN_ID];
	if (coilOpen) {
		const hasVoltage = points[OPEN_COIL_INPUT_POINT_ID] === true;
		const hasMalfunctions = hasActiveMalfunctions(coilOpen);
		const shouldBeClosed = hasVoltage && !hasMalfunctions;

		// Определяем новое сопротивление для контактов открытия
		const newResistance = shouldBeClosed
			? 0
			: BASE_RESISTANCE_CONSTANT.highResistance;

		// Обновляем контакты пускателя открытия (фазы A, B, C)
		const openContacts = [
			STARTER_CONTACT_OPEN_PHASE_A_ID,
			STARTER_CONTACT_OPEN_PHASE_B_ID,
			STARTER_CONTACT_OPEN_PHASE_C_ID,
		];

		for (const contactId of openContacts) {
			const contact = elementsMap[contactId];
			if (contact && contact.resistance !== newResistance) {
				resistanceChanges[contactId] = newResistance;
			}
		}
	}

	// Обработка катушки закрытия и её контактов
	const coilClose = elementsMap[COIL_CLOSE_ID];
	if (coilClose) {
		const hasVoltage = points[CLOSE_COIL_INPUT_POINT_ID] === true;
		const hasMalfunctions = hasActiveMalfunctions(coilClose);
		const shouldBeClosed = hasVoltage && !hasMalfunctions;

		// Определяем новое сопротивление для контактов закрытия
		const newResistance = shouldBeClosed
			? 0
			: BASE_RESISTANCE_CONSTANT.highResistance;

		// Обновляем контакты пускателя закрытия (фазы A, B, C)
		const closeContacts = [
			STARTER_CONTACT_CLOSE_PHASE_A_ID,
			STARTER_CONTACT_CLOSE_PHASE_B_ID,
			STARTER_CONTACT_CLOSE_PHASE_C_ID,
		];

		for (const contactId of closeContacts) {
			const contact = elementsMap[contactId];
			if (contact && contact.resistance !== newResistance) {
				resistanceChanges[contactId] = newResistance;
			}
		}
	}

	return resistanceChanges;
}
