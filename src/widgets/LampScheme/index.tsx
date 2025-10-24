'use client';

import { FC, useCallback } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { HIGH_RESISTANCE } from '@/shared/configs/scheme';
import type { LampIndicatorColor } from '@/shared/types/icon';
import type { AppDispatch, RootState } from '@/store/store';
import { togglePointState } from '@/store/pointsSlice';

const PALETTE: Record<'white' | 'lamp_green', { on: LampIndicatorColor; off: LampIndicatorColor }> = {
	white: { on: 'lamp_white_on', off: 'lamp_white_off' },
	lamp_green: { on: 'lamp_green_on', off: 'lamp_green_off' },
};

type PointValue = boolean | { state?: boolean | null } | undefined;

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
	const dispatch = useAppDispatch<AppDispatch>();
	const points = useAppSelector(state => state.points as Record<string, PointValue>);
	const screwStates = useAppSelector((state: RootState) => state.points as Record<string, PointValue>);
	const circuit = useAppSelector(state => state.circuit);

	const resolveLampColor = useCallback(
		(paletteKey: 'white' | 'lamp_green', pointIds: string[], elementId: string) => {
			const colors = PALETTE[paletteKey];
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
		[circuit, points],
	);

	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ id, title, color, pointIds, elementId, points: connections, position }) => (
				<section
					key={id}
					className={cn(styles.column, { [styles.columnRight]: position === 'right' })}
					aria-labelledby={`lamp-${id}`}
				>
					<h3 id={`lamp-${id}`}>{title}</h3>
					<LampIndicator color={resolveLampColor(color, pointIds, elementId)} aria-hidden />

					<ul className={styles.foot} aria-label="Список клемм">
						{connections.map(({ marker, point }) => {
							const screwState = toBoolean(screwStates[point]);

							return (
								<li key={`${id}-${marker}`} className={styles.pin} aria-label={`Клемма ${marker}`}>
									<Channel size="md" className={styles.pin__channel} aria-hidden />
									<ScrewConnection
										pointId={point}
										screwStatus={screwState ? 'close' : 'open'}
										onToggle={() => dispatch(togglePointState(point))}
										className={styles.pin__screw}
										textLeft={marker}
										aria-hidden
									/>
									<ProvodLine isPin={false} length={87} className={styles.pin__pref} aria-hidden />
									<Marker text={marker} className={styles.pin__marker} bottomRetreat={30} />
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</section>
	);
};

export default LampScheme;