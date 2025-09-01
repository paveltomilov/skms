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

const BoilerUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>КА - Котлоагрегат</h1>
			<div className={styles.section__content}>
				<KALeftTop className={styles.section__content_left_top} />
				<KALeftMid className={styles.section__content_left_mid} />
				<KALeftDown className={styles.section__content_left_down} />

				<KAMidTop className={styles.section__content_mid_top} />
				<KAMidMid className={styles.section__content_mid_mid} />
				<div className={styles.section__content_mid_down}></div>

				<KARightTop className={styles.section__content_right_top} />
				<KARightMid className={styles.section__content_right_mid} />
				<KARightDown className={styles.section__content_right_down} />
			</div>
		</section>
	);
};

export default BoilerUnitPage;
