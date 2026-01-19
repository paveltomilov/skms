'use client';

import TALeftMid from '@/widgets/TA_leftmid';
import styles from './styles.module.scss';
import TALeftTop from '@/widgets/TA_lefftop';
import TARightTop from '@/widgets/TA_rightop';
import TAMidMId from '@/widgets/TA_midmid';
import TAMidDown from '@/widgets/TA_middown';
import TALeftDown from '@/widgets/TA_leftdown';
import TAMidTop from '@/widgets/TA_midtop';
import TARightDown from '@/widgets/TA_rightdown';
import TARightMid from '@/widgets/TA_rightmid';
import { useAppSelector } from '@/shared/hooks/store';
import { RootState } from '@/store/store';

const TurbineUnitPage = () => {
	const windows = useAppSelector((state: RootState) => state.windows);
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>ТА - Турбоагрегат</h1>
			<div className={styles.section__content}>
				<TALeftTop className={styles.section__content_left_top} windows={windows} />
				<TALeftMid className={styles.section__content_left_mid} windows={windows} />
				<TALeftDown className={styles.section__content_left_down} windows={windows} />

				<TAMidTop className={styles.section__content_mid_top} windows={windows} />
				<TAMidMId className={styles.section__content_mid_mid} windows={windows} />
				<TAMidDown className={styles.section__content_mid_down} windows={windows} />

				<TARightTop className={styles.section__content_right_top} windows={windows} />
				<TARightMid className={styles.section__content_right_mid} windows={windows} />
				<TARightDown className={styles.section__content_right_down} windows={windows} />
			</div>
		</section>
	);
};

export default TurbineUnitPage;
