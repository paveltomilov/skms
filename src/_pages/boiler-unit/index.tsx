import KAMidTop from '@/widgets/KA_midtop';
import KARightDown from '@/widgets/KA_rightdown';
import styles from './styles.module.scss';
import KALeftMid from '@/widgets/KA_leftmid';

const BoilerUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>КА - Котлоагрегат</h1>
			<div className={styles.section__content}>
				<div className={styles.section__content_left_top}></div>
				<KALeftMid className={styles.section__content_left_mid}/>
				<div className={styles.section__content_left_down}></div>

				<KAMidTop className={styles.section__content_mid_top} />
				<div className={styles.section__content_mid_mid}></div>
				<div className={styles.section__content_mid_down}></div>

				<div className={styles.section__content_right_top}></div>
				<div className={styles.section__content_right_mid}></div>
				<KARightDown className={styles.section__content_right_down} />
			</div>
		</section>
	);
};

export default BoilerUnitPage;
