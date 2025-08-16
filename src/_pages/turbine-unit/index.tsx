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
import ModalWrapper from '@/widgets/ModalWrapper';

const TurbineUnitPage = () => {
	const { gateControl, gateValves, diagnostic } = useAppSelector(
		state => state.modal,
	);

	return (
		<section className={styles.section}>
			<h1 className={styles.section__title}>ТА - Турбоагрегат</h1>
			<div className={styles.section__content}>
				<TALeftTop className={styles.section__content_left_top} />
				<TALeftMid className={styles.section__content_left_mid} />
				<TALeftDown className={styles.section__content_left_down} />

				<TAMidTop className={styles.section__content_mid_top} />
				<TAMidMId className={styles.section__content_mid_mid} />
				<TAMidDown className={styles.section__content_mid_down} />

				<TARightTop className={styles.section__content_right_top} />
				<TARightMid className={styles.section__content_right_mid} />
				<TARightDown className={styles.section__content_right_down} />
				{(gateControl || gateValves || diagnostic) && (
					<ModalWrapper />
				)}
			</div>
		</section>
	);
};

export default TurbineUnitPage;
