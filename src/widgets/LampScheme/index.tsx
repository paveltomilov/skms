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
import type { AppDispatch } from '@/store/store';
import { useLampIndicators } from '@/shared/hooks/useLampIndicators';
import { findElementByID } from '@/shared/utils/findElementByID/scheme';
import { BASE_RESISTANCE_CONSTANT } from '@/shared/configs/elementKind';
import { setResistance } from '@/store/circuitSlice';
import { BASE_RESISTANCE } from '@/shared/configs/schemeElements';

export const LampScheme: FC = () => {
	const dispatch = useAppDispatch<AppDispatch>();
	const circuit = useAppSelector(state => state.circuit);
	const handleTogglePoint = (elementId: string) => {
		const element = findElementByID(elementId, circuit);
		const baseResistance = BASE_RESISTANCE[elementId];
		const isBaseResistance =
			typeof element?.resistance === 'number' &&
			element.resistance === baseResistance;
		const nextResistance = isBaseResistance
			? BASE_RESISTANCE_CONSTANT.highResistance
			: baseResistance;

		dispatch(
			setResistance({
				id: elementId,
				value: nextResistance,
			}),
		);
	};
	const getContactState = (elementId: string): boolean => {
		try {
			const element = findElementByID(elementId, circuit);
			const resistance = element?.resistance;
			if (typeof resistance !== 'number') {
				return false;
			}
			return resistance < BASE_RESISTANCE_CONSTANT.highResistance;
		} catch {
			return false;
		}
	};
			
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
					elementIds,
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
							{elementIds.map(({ marker, elementId: contactElementId }) => {
								const screwState = getContactState(
									contactElementId,
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
											pointId={contactElementId}
											screwStatus={
												screwState ? 'close' : 'open'
											}
											onToggle={() =>
												handleTogglePoint(
													contactElementId,
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
