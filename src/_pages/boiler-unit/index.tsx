import KAMidTop from '@/widgets/KA_midtop';
import styles from './styles.module.scss';

const BoilerUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>КА - Котлоагрегат</h1>
			<div className={styles.section__content}>
				<div className={styles.section__content_left_top}></div>
				<div className={styles.section__content_left_mid}></div>
				<div className={styles.section__content_left_down}></div>

				<KAMidTop className={styles.section__content_mid_top}></KAMidTop>
				<div className={styles.section__content_mid_mid}></div>
				<div className={styles.section__content_mid_down}></div>

				<div className={styles.section__content_right_top}></div>
				<div className={styles.section__content_right_mid}></div>
				<div className={styles.section__content_right_down}></div>
			</div>
		</section>
	);
};

export default BoilerUnitPage;
