'use client';

import FooterPtk from '@/widgets/FooterPtk';
import HeaderPtk from '@/widgets/HeaderPtk';
import Sidebar from '@/widgets/Sidebar';
import styles from '@/_pages/zra/styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import ModalWrapper from '@/widgets/ModalWrapper';
import { closeModal } from '@/store/modalSlice';
import { PopupGateControl } from '@/widgets/PopupGateControl';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import PopupGateValves from '@/widgets/PopupGateValves';

export default function PtkLayout({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const { gateControl, diagnostic, gateValves } = useAppSelector(
		state => state.modal,
	);

	return (
		<>
			<HeaderPtk />
			<main className={styles.main}>
				<Sidebar />
				{children}
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
			</main>
			<FooterPtk />
		</>
	);
}
