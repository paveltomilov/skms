'use client';

import { FC, useMemo } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import type { AppDispatch, RootState } from '@/store/store';
import { togglePointState } from '@/store/pointsSlice';
import { useLampIndicators } from '@/shared/hooks/useLampIndicators';

// Состояние точки может быть boolean или объект со state
type PointValue = boolean | { state?: boolean | null } | undefined;

// Приведение значения точки к boolean
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
	// Те же points используются для отображения состояния клемм
	const screwStates = useAppSelector(
		(state: RootState) => state.points as Record<string, PointValue>,
	);
	const lampIndicators = useLampIndicators();
	const indicatorById = useMemo(
		() => new Map(lampIndicators.map(indicator => [indicator.id, indicator])),
		[lampIndicators],
	);

	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(
				({
					id,
					title,
					colors,
					points: connections,
					position,
				}) => (
					<section
						key={id}
						className={cn(styles.column, {
							[styles.columnRight]: position === 'right',
						})}
						aria-labelledby={`lamp-${id}`}
					>
						<h3 id={`lamp-${id}`}>{title}</h3>
						<LampIndicator
							color={indicatorById.get(id)?.color ?? colors.off}
							aria-hidden
						/>

						<ul className={styles.foot} aria-label="Список клемм">
							{connections.map(({ marker, point }) => {
								const screwState = toBoolean(
									screwStates[point],
								);

								return (
									<li
										key={`${id}-${marker}`}
										className={styles.pin}
										aria-label={`Клемма ${marker}`}
									>
										<Channel
											size="md"
											className={styles.pin__channel}
											aria-hidden
										/>
										<ScrewConnection
											pointId={point}
											screwStatus={
												screwState ? 'close' : 'open'
											}
											onToggle={() =>
												dispatch(
													togglePointState(point),
												)
											}
											className={styles.pin__screw}
											textLeft={marker}
											aria-hidden
										/>
										<ProvodLine
											isPin={false}
											length={87}
											className={styles.pin__pref}
											aria-hidden
										/>
										<Marker
											text={marker}
											className={styles.pin__marker}
											bottomRetreat={30}
										/>
									</li>
								);
							})}
						</ul>
					</section>
				),
			)}
		</section>
	);
};

export default LampScheme;
