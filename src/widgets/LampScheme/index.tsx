'use client';

import { FC, useCallback } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns, isPointObj, LampVariant, lampVariants, PALETTES, pins } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { useAppSelector } from '@/shared/hooks/store';
import { HIGH_RESISTANCE } from '@/shared/configs/scheme';
import type { LampIndicatorColor } from '@/shared/types/icon';

export const LampScheme: FC = () => {
	const points = useAppSelector(s => s.points);
	const circuit = useAppSelector(s => s.circuit);

	const resolveLampColor = useCallback((
		variant: LampVariant,
		pointId: string,
		elementId: string
	): LampIndicatorColor => {
		const colors = PALETTES[variant];
		const raw = (points as Record<string, unknown>)[pointId];

		const hasVoltage =
			(typeof raw === 'boolean' && raw === true) ||
			(isPointObj(raw) && (raw.state === true || (raw.voltage ?? 0) > 0));

		if (!hasVoltage) return colors.off;

		try {
			const el = findElementByID(elementId, circuit);
			const ok =
				typeof el?.resistance === 'number' &&
				isFinite(el.resistance) &&
				el.resistance < HIGH_RESISTANCE;

			return ok ? colors.on : colors.off;
		} catch {
			return colors.off;
		}
	}, [points, circuit]);

	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ id, title, pointId, elementId, position }) => {
				const variant = lampVariants[id];
				const lampColor = resolveLampColor(variant, pointId, elementId);

				return (
					<section
						key={id}
						className={cn(styles.column, { [styles.columnRight]: position === 'right' })}
						aria-labelledby={`lamp-${id}`}
					>
						<h3 id={`lamp-${id}`}>{title}</h3>
						<LampIndicator color={lampColor} aria-hidden />

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
				);
			})}
		</section>
	);
};

export default LampScheme;
