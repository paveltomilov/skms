'use client';

import { FC } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { AppDispatch, RootState } from '@/store/store';
import { togglePointState } from '@/store/pointsSlice';

export const LampScheme: FC = () => {
	const dispatch = useAppDispatch<AppDispatch>();
	const screwStates = useAppSelector((state: RootState) => state.points);
	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ title, color, points }) => (
				<section
					key={title}
					className={cn(styles.column, {
						[styles.columnRight]: title === 'Открыто',
					})}
					aria-labelledby={`lamp-${title}`}
				>
					<h3 id={`lamp-${title}`}>{title}</h3>
					<LampIndicator color={color} aria-hidden />
					<ul className={styles.foot} aria-label="Клеммы">
						{points.map(({ marker, point }) => (
							<li
								key={marker}
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
										screwStates[point] ? 'close' : 'open'
									}
									className={styles.pin__screw}
									textLeft={marker}
									aria-hidden
									changeGlobalState={() =>
										dispatch(togglePointState(point))
									}
								/>
								<ProvodLine
									isPin={false}
									length={88}
									className={styles.pin__pref}
									aria-hidden
								/>
								<Marker
									text={marker}
									className={styles.pin__marker}
									bottomRetreat={30}
								/>
							</li>
						))}
					</ul>
				</section>
			))}
		</section>
	);
};
