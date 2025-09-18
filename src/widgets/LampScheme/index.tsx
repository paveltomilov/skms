'use client';

import LampIndicator from '@/shared/UI/LampIndicator';
import styles from './styles.module.scss';
import { FC } from 'react';
import Screw from '@/shared/UI/icons/Screw';
import ProvodLine from '@/shared/UI/icons/ProvodLine';
import cn from 'classnames';
import Marker from '@/shared/UI/Marker';

export const LampScheme: FC = () => {
	return (
		<div className={styles.container}>
			<div className={cn(styles.column)}>
				<h3 className={styles.title}>Закрыто</h3>
				<div className={styles.lampWrapper}>
					<LampIndicator color="white" />
				</div>

				<div className={styles.foot}>
					<div className={styles.pin}>
						<Screw textLeft="A" />
						<ProvodLine length={110} className={styles.pin__pref} />
						<Marker text="A" className={styles.pin__marker} />
					</div>
					<div className={styles.pin}>
						<Screw textLeft="N" />
						<ProvodLine length={110} className={styles.pin__pref} />
						<Marker text="N" className={styles.pin__marker} />
					</div>
				</div>
			</div>

			<div className={cn(styles.column, styles.columnRight)}>
				<h3 className={styles.title}>Открыто</h3>
				<div className={styles.lampWrapperOn}>
					<LampIndicator color="lamp_green" />
				</div>

				<div className={styles.foot}>
					<div className={styles.pin}>
						<Screw textLeft="A" />
						<ProvodLine length={110} className={styles.pin__pref} />
						<Marker text='A' className={styles.pin__marker} />
					</div>
					<div className={styles.pin}>
						<Screw textLeft="N" />
						<ProvodLine length={110} className={styles.pin__pref} />
						<Marker text="N" className={styles.pin__marker} />
					</div>
				</div>
			</div>
		</div>
	);
};
