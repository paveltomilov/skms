import КАRightDown from '@/widgets/КА_rightdown';
import styles from './styles.module.scss';

const BoilerUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>КА - Котлоагрегат</h1>
			<div className={styles.section__content}>
				<div className={styles.section__content_left_top}></div>
				<div className={styles.section__content_left_mid}></div>
				<div className={styles.section__content_left_down}></div>

				<div className={styles.section__content_mid_top}></div>
				<div className={styles.section__content_mid_mid}></div>
				<div className={styles.section__content_mid_down}></div>

				<div className={styles.section__content_right_top}></div>
				<div className={styles.section__content_right_mid}></div>
				<КАRightDown className={styles.section__content_right_down}></КАRightDown>
			</div>
		</section>
	);
};

export default BoilerUnitPage;
