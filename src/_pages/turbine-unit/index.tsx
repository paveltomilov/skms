import TALeftMid from '@/widgets/TA_leftmid';
import styles from './styles.module.scss';
import TALeftTop from '@/widgets/TA_lefftop';
import TARightTop from '@/widgets/TA_rightop';
import TAMidMId from '@/widgets/TA_midmid';
import TAMidDown from '@/widgets/TA_middown';
import TALeftDown from '@/widgets/TA_leftdown';

const TurbineUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>ТА - Турбоагрегат</h1>
			<div className={styles.section__content}>
				<TALeftTop className={styles.section__content_left_top} />
				<TALeftMid className={styles.section__content_left_mid} />
				<TALeftDown className={styles.section__content_left_down} />

				<div className={styles.section__content_mid_top}></div>
				<TAMidMId className={styles.section__content_mid_mid} />
				<TAMidDown className={styles.section__content_mid_down} />

				<TARightTop className={styles.section__content_right_top} />
				<div className={styles.section__content_right_mid}></div>
				<div className={styles.section__content_right_down}></div>
			</div>
		</section>
	);
};

export default TurbineUnitPage;
