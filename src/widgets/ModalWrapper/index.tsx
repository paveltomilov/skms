'use client';

import { FC, useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import ModalOverlay from '../ModalOverlay';
import PopupDiagnostic from '../PopupDiagnostic';
import PopupBlockSwitches from '../PopupBlockSwitches';

interface ModalProps {
	className?: string;
}

const ModalWrapper: FC<ModalProps> = ({ className }) => {
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
			className={cn(className, styles.modal__displayNone, {
				[styles.modal]: isOne,
				[styles.modal_isBlur]: automatic,
			})}
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
					<PopupBlockSwitches />
				</ModalOverlay>
			)}
		</div>
	);
};

export default ModalWrapper;
