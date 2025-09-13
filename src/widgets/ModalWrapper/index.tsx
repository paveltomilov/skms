'use client';

import { FC, useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import ModalOverlay from '../ModalOverlay';
import PopupDiagnostic from '../PopupDiagnostic';
import { Automatic } from '../Automatic';

interface ModalProps {
	className?: string;
}

const ModalWrapper: FC<ModalProps> = ({ className }) => {
	const {
		automatic,
		gateValves,
		diagnostic,
		gateControl,
		lamps,
		starter,
		block_switches,
		motor,
		user_info,
		notification,
	} = useAppSelector(state => state.modal);
	const isOne = useMemo(
		() =>
			automatic ||
			gateValves ||
			diagnostic ||
			gateControl ||
			lamps ||
			motor ||
			block_switches ||
			starter ||
			user_info ||
			notification,
		[
			automatic,
			gateValves,
			diagnostic,
			gateControl,
			lamps,
			motor,
			block_switches,
			starter,
			notification,
			user_info,
		],
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
				<ModalOverlay id={'automatic'} headerTitle={'Автомат'}>
					<Automatic />
				</ModalOverlay>
			)}
			{lamps && (
				<ModalOverlay id={'lamps'} headerTitle={'Лампочки'}>
					<span>Лампочки</span>
				</ModalOverlay>
			)}
			{motor && (
				<ModalOverlay
					id={'motor'}
					headerTitle={'Контакты обмотки двигателя'}
				>
					<p>Контакты обмотки двигателя</p>
				</ModalOverlay>
			)}
			{starter && (
				<ModalOverlay
					id={'starter'}
					headerTitle={'Пускатель (на открыть и на закрыть)'}
				>
					<p>Пускатель (на открыть и на закрыть)</p>
				</ModalOverlay>
			)}
			{block_switches && (
				<ModalOverlay
					id={'block_switches'}
					headerTitle={'Блок концевых выключателей'}
				>
					<p>Блок концевых выключателей</p>
				</ModalOverlay>
			)}
			{notification && (
				<ModalOverlay
					id={'notification'}
					headerTitle={'Дата реализации'}
				>
					<p>Компонент в разработке</p>
				</ModalOverlay>
			)}
			{user_info && (
				<ModalOverlay id={'user_info'} headerTitle={'Пользователь'}>
					<p>Компонент в разработке</p>
				</ModalOverlay>
			)}
		</div>
	);
};

export default ModalWrapper;
