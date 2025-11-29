import { SCHEME_POINTS_BASE } from '@/shared/configs/points';
import {
	PHASE_A_POINT_ID,
	PHASE_B_POINT_ID,
	PHASE_C_POINT_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/powerCircuit/constants';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/controlCircuit/constants';
import { InitialStateScheme } from '@/shared/types/scheme';

export function setNewVoltagePoints(
currentScheme: InitialStateScheme, points: Record<string, boolean>,
): Record<string, boolean> {
	// Создаем копию текущего состояния точек
	const updatedPoints = { ...points };

	// Обрабатываем каждую точку из SCHEME_POINTS_BASE
	for (const [pointId] of Object.entries(SCHEME_POINTS_BASE)) {
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
