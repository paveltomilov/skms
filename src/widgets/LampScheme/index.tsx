'use client';

import { FC } from 'react';
import cn from 'classnames';
import LampIndicator from '@/shared/UI/LampIndicator';
import Screw from '@/shared/UI/icons/Screw';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import Marker from '@/shared/UI/Marker';
import Channel from '@/shared/UI/icons/Channel';
import styles from './styles.module.scss';
import { columns, pins } from '@/shared/configs/lampsScheme';

export const LampScheme: FC = () => {
	return (
		<section className={styles.container} aria-label="Схема ламп">
			{columns.map(({ title, color }) => (
				<section
					key={title}
					className={cn(styles.column, {
						[styles.columnRight]: title === 'Открыто',
					})}
					aria-labelledby={`lamp-${title}`}
				>
					<h3 className={styles.title} id={`lamp-${title}`} >
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
								<Screw
									className={styles.pin__screw}
									//textLeft={code} после MR поправим 
									aria-hidden
								/>
								<ProvodLine
									length={119}
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
