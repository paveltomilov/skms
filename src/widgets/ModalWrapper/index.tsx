'use client';

import { FC, useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import { Automatic } from '../Automatic';
import ModalOverlay from '../ModalOverlay';
import PopupDiagnostic from '../PopupDiagnostic';
import Channel from '@/shared/UI/icons/Channel';
import Screw from '@/shared/UI/icons/Screw';
import Pin from '@/shared/UI/icons/Pin';
import Marker from '@/shared/UI/Marker';
import Provod from '@/shared/UI/Provod';

interface ModalProps {
	className?: string;
}

const ModalWrapper: FC<ModalProps> = ({}) => {
	const { automatic, gateValves, diagnostic, gateControl, test } =
		useAppSelector(state => state.modal);
	const isOne = useMemo(
		() => automatic || gateValves || diagnostic || gateControl || test,
		[automatic, gateValves, diagnostic, gateControl, test],
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
			{test && (
				<ModalOverlay id={'test'}>
					<div
						style={{
							display: 'flex',
							gap: '10px',
							alignItems: 'center',
						}}
					>
						<Channel size="ls" />
						<Channel size="md" />

						<Screw isOpen />
						<Screw />

						<Pin />

						<Marker text="A11" />
						<Provod />
					</div>
				</ModalOverlay>
			)}
		</div>
	);
};

export default ModalWrapper;
