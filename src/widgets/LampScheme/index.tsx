'use client';

import { FC } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns, pins } from '@/shared/configs/lampsScheme';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import ProvodLine from '@/shared/UI/icons/ProvodLine';

export const LampScheme: FC = () => {
	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ title, color , point }) => (
				<section
					key={title}
					className={cn(styles.column, {
						[styles.columnRight]: title === 'Открыто',
					})}
					aria-labelledby={`lamp-${title}`}
				>
					<h3 id={`lamp-${title}`} >
						{title}
					</h3>
					<LampIndicator color={color} aria-hidden />
					<ul className={styles.foot} aria-label="Клеммы">
						{pins.map(({ code }) => (
							<li
								key={code}
								className={styles.pin}
								aria-label={`Клемма ${code}`}
							>
								<Channel
									size="md"
									className={styles.pin__channel}
									aria-hidden
								/>
								<ScrewConnection
									pointId={code === 'A' ? point : 'p.c.n'}
									className={styles.pin__screw}
									textLeft={code}
									aria-hidden
								/>
								<ProvodLine
									isPin={false}
									length={88}
									className={styles.pin__pref}
									aria-hidden
								/>
								<Marker
									text={code}
									className={styles.pin__marker}
								/>
							</li>
						))}
					</ul>
				</section>
			))}
		</section>
	);
};
