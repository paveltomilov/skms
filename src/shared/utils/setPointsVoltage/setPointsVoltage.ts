import {
	PHASE_A_POINT_ID,
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/powerCircuit/constants';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/controlCircuit/constants';
import { InitialStateScheme } from '@/shared/types/scheme';
import { calculatePointsState } from '@/shared/configs/points';

/**
 * Вычисляет новые состояния точек на основе текущего состояния схемы.
 * Сначала устанавливает базовые точки (фазы и нейтрали),
 * затем вычисляет состояния остальных точек на основе элементов схемы.
 * @param currentScheme - текущее состояние схемы с элементами
 * @param points - текущие состояния точек
 * @returns объект с обновленными состояниями точек
 */
export function setNewVoltagePoints(
	currentScheme: InitialStateScheme,
	points: Record<string, boolean>,
): Record<string, boolean> {
	// Создаем копию текущего состояния точек
	const updatedPoints = { ...points };

	// Шаг 1: Устанавливаем базовые точки
	// Фазы A, B, C всегда под напряжением
	updatedPoints[PHASE_A_POINT_ID] = true;
	updatedPoints[PHASE_B_POINT_ID] = true;
	updatedPoints[PHASE_C_POINT_ID] = true;

	// Нейтрали всегда без напряжения
	updatedPoints[POWER_CIRCUIT_NEUTRAL_ID] = false;
	updatedPoints[CONTROL_CIRCUIT_NEUTRAL_ID] = false;

	// Шаг 2: Вычисляем состояния остальных точек на основе элементов схемы
	return calculatePointsState(updatedPoints, currentScheme);
}
