import TALeftMid from '@/widgets/TA_leftmid';
import styles from './styles.module.scss';
import TALeftTop from '@/widgets/TA_lefftop';
import TARightMid from '@/widgets/TA_rightmid';

const TurbineUnitPage = () => {
	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>ТА - Турбоагрегат</h1>
			<div className={styles.section__content}>
				<TALeftTop className={styles.section__content_left_top} />
				<TALeftMid className={styles.section__content_left_mid}/>
				<div className={styles.section__content_left_down}></div>

				<div className={styles.section__content_mid_top}></div>
				<div className={styles.section__content_mid_mid}></div>
				<div className={styles.section__content_mid_down}></div>

				<div className={styles.section__content_right_top}></div>
				<TARightMid className={styles.section__content_right_mid} />
				<div className={styles.section__content_right_down}></div>
			</div>
		</section>
	);
};

export default TurbineUnitPage;
