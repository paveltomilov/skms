'use client';

import KAMidTop from '@/widgets/KA_midtop';
import KARightDown from '@/widgets/KA_rightdown';
import styles from './styles.module.scss';
import KALeftMid from '@/widgets/KA_leftmid';
import KALeftDown from '@/widgets/KA_leftdown';
import KARightMid from '@/widgets/KA_rightmid';
import KAMidMid from '@/widgets/KA_midmid';
import KALeftTop from '@/widgets/KA_lefttop';
import KARightTop from '@/widgets/KA_righttop';
import KAMidDown from '@/widgets/KA_middown';
import { useAppSelector } from '@/shared/hooks/store';
import { RootState } from '@/store/store';

const BoilerUnitPage = () => {
	const windows = useAppSelector((state: RootState) => state.windows);
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>КА - Котлоагрегат</h1>
			<div className={styles.section__content}>
				<KALeftTop className={styles.section__content_left_top} windows={windows} />
				<KALeftMid className={styles.section__content_left_mid} windows={windows} />
				<KALeftDown className={styles.section__content_left_down} windows={windows} />

				<KAMidTop className={styles.section__content_mid_top} windows={windows} />
				<KAMidMid className={styles.section__content_mid_mid} windows={windows} />
				<KAMidDown className={styles.section__content_mid_down} windows={windows} />

				<KARightTop className={styles.section__content_right_top} windows={windows} />
				<KARightMid className={styles.section__content_right_mid} windows={windows} />
				<KARightDown className={styles.section__content_right_down} windows={windows} />
			</div>
		</section>
	);
};

export default BoilerUnitPage;
