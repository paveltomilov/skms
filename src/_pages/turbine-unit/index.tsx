'use client';

import TALeftMid from '@/widgets/TA_leftmid';
import styles from './styles.module.scss';
import TALeftTop from '@/widgets/TA_lefftop';
import TARightTop from '@/widgets/TA_rightop';
import TAMidMId from '@/widgets/TA_midmid';
import TAMidDown from '@/widgets/TA_middown';
import TALeftDown from '@/widgets/TA_leftdown';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import ModalWrapper from '@/widgets/ModalWrapper';
import { closeModal } from '@/store/modalSlice';
import { PopupGateControl } from '@/widgets/PopupGateControl';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import PopupGateValves from '@/widgets/PopupGateValves';

const TurbineUnitPage = () => {
	const dispatch = useAppDispatch();
	const { gateControl, diagnostic, gateValves } = useAppSelector(
		state => state.modal,
	);

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
				{gateControl && (
					<ModalWrapper
						title="ПКДВ-2"
						onClose={() => dispatch(closeModal('gateControl'))}
					>
						<PopupGateControl />
					</ModalWrapper>
				)}
				{diagnostic && (
					<ModalWrapper
						title="ПКДВ-2"
						onClose={() => dispatch(closeModal('diagnostic'))}
					>
						<PopupDiagnostic />
					</ModalWrapper>
				)}
				{gateValves && (
					<ModalWrapper
						title="ПКДВ-2 - Ф.сх."
						onClose={() => dispatch(closeModal('gateValves'))} //
					>
						<PopupGateValves />
					</ModalWrapper>
				)}
			</div>
		</section>
	);
};

export default TurbineUnitPage;
