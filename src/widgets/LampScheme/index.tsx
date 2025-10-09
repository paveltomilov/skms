'use client';

import { FC, useCallback } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns, pins } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { useAppSelector } from '@/shared/hooks/store';
import { HIGH_RESISTANCE } from '@/shared/configs/scheme';
import type { LampIndicatorColor } from '@/shared/types/icon';

type LampColors = { on: LampIndicatorColor; off: LampIndicatorColor };

type PointValue = boolean | { state?: boolean | null } | unknown;

const toBoolean = (value: PointValue): boolean => {
	if (typeof value === 'boolean') {
		return value;
	}

	if (value && typeof value === 'object' && 'state' in value) {
		return Boolean((value as { state?: boolean }).state);
	}

	return false;
};

export const LampScheme: FC = () => {
	const points = useAppSelector(state => state.points as Record<string, PointValue>);
	const circuit = useAppSelector(state => state.circuit);

	const resolveLampColor = useCallback(
		(colors: LampColors, pointIds: string[], elementId: string) => {
			const hasVoltage = pointIds.some(id => toBoolean(points[id]));

			if (!hasVoltage) {
				return colors.off;
			}

			try {
				const element = findElementByID(elementId, circuit);
				const hasNormalResistance =
					typeof element?.resistance === 'number' &&
					isFinite(element.resistance) &&
					element.resistance < HIGH_RESISTANCE;

				return hasNormalResistance ? colors.on : colors.off;
			} catch {
				return colors.off;
			}
		},
		[points, circuit],
	);

	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ id, title, colors, pointIds, elementId, position }) => (
				<section
					key={id}
					className={cn(styles.column, { [styles.columnRight]: position === 'right' })}
					aria-labelledby={`lamp-${id}`}
				>
					<h3 id={`lamp-${id}`}>{title}</h3>
					<LampIndicator color={resolveLampColor(colors, pointIds, elementId)} aria-hidden />

					<ul className={styles.foot} aria-label="Список клемм">
						{pins.map(({ code }) => (
							<li key={code} className={styles.pin} aria-label={`Клемма ${code}`}>
								<Channel size="md" className={styles.pin__channel} aria-hidden />
								<ScrewConnection className={styles.pin__screw} textLeft={code} aria-hidden />
								<ProvodLine isPin={false} length={88} className={styles.pin__pref} aria-hidden />
								<Marker text={code} className={styles.pin__marker} />
							</li>
						))}
					</ul>
				</section>
			))}
		</section>
	);
};

export default LampScheme;
