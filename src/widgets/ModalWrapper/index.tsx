'use client';

import { FC, useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import { Automatic } from '../Automatic';
import ModalOverlay from '../ModalOverlay';

interface ModalProps {
	className?: string;
}

const ModalWrapper: FC<ModalProps> = ({}) => {
	const { automatic, gateValves, diagnostic, gateControl } = useAppSelector(
		state => state.modal,
	);
	const isOne = useMemo(
		() => automatic || gateValves || diagnostic || gateControl,
		[automatic, gateValves, diagnostic, gateControl],
	);

	const gateId = useAppSelector(state => state.gate.activeGateId as string);

	return (
		<div
			className={
				isOne
					? `${styles.modal} ${automatic && styles.modal_isBlur}`
					: `${styles.modal__displayNone}`
			}
		>
			{gateControl && (
				<ModalOverlay gateId={gateId} id={'gateControl'}>
					<PopupGateControl />
				</ModalOverlay>
			)}
			{diagnostic && (
				<ModalOverlay gateId={gateId} id={'diagnostic'}>
					<PopupDiagnostic />
				</ModalOverlay>
			)}
			{gateValves && (
				<ModalOverlay gateId={gateId} id={'gateValves'}>
					<PopupGateValves />
				</ModalOverlay>
			)}
			{automatic && (
				<ModalOverlay id={'automatic'}>
					<Automatic />
				</ModalOverlay>
			)}
		</div>
	);
};

export default ModalWrapper;
