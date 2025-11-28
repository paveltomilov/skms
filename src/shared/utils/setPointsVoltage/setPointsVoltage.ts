import { InitialStateScheme } from '@/shared/types/scheme';

import { SCHEME_POINTS } from '@/shared/configs/points';
import {
	PHASE_A_POINT_ID,
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/powerCircuit/constants';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/controlCircuit/constants';

/**
 * Обновляет состояние напряжения (state) во всех точках схемы на основе подключённых к ним элементов.
 *
 * Правила расчёта:
 * - Только фазы A, B, C всегда имеют напряжение (источники напряжения).
 * - Нейтрали (POWER_CIRCUIT_NEUTRAL_ID, CONTROL_CIRCUIT_NEUTRAL_ID) всегда без напряжения.
 * - Для остальных точек перебираются все подключённые к ним элементы.
 * - Если элемент проводит напряжение (resistance <= BASE_RESISTANCE_CONSTANT.highResistance):
 *   - Если точка является startPoint элемента - точка получает напряжение.
 *   - Если точка является endPoint элемента - проверяется startPoint элемента.
 *     Если startPoint имеет state = true, то текущая точка получает state = true.
 *
 * @param scheme - схема с элементами и их сопротивлениями
 * @param points - текущее состояние точек (Record<pointId, state>)
 * @returns обновленное состояние точек
 */
export function setNewVoltagePoints(
	scheme: InitialStateScheme,
	points: Record<string, boolean>,
): Record<string, boolean> {
	// Создаем копию текущего состояния точек
	const updatedPoints = { ...points };

	// Обрабатываем каждую точку из SCHEME_POINTS
	for (const [pointId] of Object.entries(SCHEME_POINTS)) {
		// Фазы A, B, C всегда под напряжением
		if (
			pointId === PHASE_A_POINT_ID ||
			pointId === PHASE_B_POINT_ID ||
			pointId === PHASE_C_POINT_ID
		) {
			updatedPoints[pointId] = true;
			continue;
		}

		// Нейтрали всегда без напряжения
		if (
			pointId === POWER_CIRCUIT_NEUTRAL_ID ||
			pointId === CONTROL_CIRCUIT_NEUTRAL_ID
		) {
			updatedPoints[pointId] = false;
			continue;
		}

		// Обновляем состояние точки
		updatedPoints[pointId] = false;
	}

	return updatedPoints;
}
