import { useMemo } from 'react';
import { columns } from '@/shared/configs/lampsScheme';
import { useAppSelector } from '@/shared/hooks/store';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import type { LampIndicatorColor } from '@/shared/types/icon';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';

type PointValue = boolean | { state?: boolean | null } | undefined;

export interface LampIndicatorState {
	id: 'closed' | 'open';
	isOn: boolean;
	color: LampIndicatorColor;
}

const toBoolean = (value: PointValue): boolean => {
	if (typeof value === 'boolean') {
		return value;
	}

	if (value && typeof value === 'object' && 'state' in value) {
		return Boolean((value as { state?: boolean }).state);
	}

	return false;
};

export const useLampIndicators = (): LampIndicatorState[] => {
	const points = useAppSelector(
		state => state.points as Record<string, PointValue>,
	);
	const circuit = useAppSelector(state => state.circuit);

	return useMemo(
		() =>
			columns.map(({ id, pointIds, elementId, colors, elementIds }) => {
				const hasVoltage = pointIds.some(pointId =>
					toBoolean(points[pointId]),
				);
				let isOn = false;

				if (hasVoltage) {
					try {
						const element = findElementByID(elementId, circuit);
						const baseResistance = BASE_RESISTANCE[elementId];
						const hasBaseLampResistance =
							typeof element?.resistance === 'number' &&
							isFinite(element.resistance) &&
							element.resistance === baseResistance;

						const hasBaseContacts = elementIds.every(
							({ elementId: contactId }) => {
								const contactElement = findElementByID(
									contactId,
									circuit,
								);
								const baseContactResistance =
									BASE_RESISTANCE[contactId];
								return (
									typeof contactElement?.resistance ===
										'number' &&
									isFinite(contactElement.resistance) &&
									contactElement.resistance ===
										baseContactResistance
								);
							},
						);

						isOn = hasBaseLampResistance && hasBaseContacts;
					} catch {
						isOn = false;
					}
				}

				return {
					id,
					isOn,
					color: isOn ? colors.on : colors.off,
				};
			}),
		[circuit, points],
	);
};
