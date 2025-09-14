'use client';

import { FC, JSX, useMemo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import ModalOverlay from '../ModalOverlay';
import PopupDiagnostic from '../PopupDiagnostic';
import { Automatic } from '../Automatic';
import { Modals } from '@/store/modalSlice';

interface IModals {
	condition: boolean;
	id: Modals;
	headerTitle: string;
	gateId: string | undefined;
	component: JSX.Element;
}
const ModalWrapper: FC<{className?: string}> = ({ className }) => {
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
	const empty: React.ReactElement = <p>Компонент в разработке</p>;
	const modals: IModals[] = [
		{
			condition: automatic,
			id: 'automatic',
			headerTitle: 'Автомат',
			gateId: gateId,
			component: <Automatic />,
		},
		{
			condition: gateValves,
			id: 'gateValves',
			headerTitle: '',
			gateId: gateId,
			component: <PopupGateValves />,
		},
		{
			condition: diagnostic,
			id: 'diagnostic',
			headerTitle: '',
			gateId: gateId,
			component: <PopupDiagnostic />,
		},
		{
			condition: gateControl,
			id: 'gateControl',
			headerTitle: '',
			gateId: gateId,
			component: <PopupGateControl />,
		},
		{
			condition: lamps,
			id: 'lamps',
			headerTitle: 'Лампочки',
			gateId: undefined,
			component: empty,
		},
		{
			condition: motor,
			id: 'motor',
			headerTitle: 'Контакты обмотки двигателя',
			gateId: undefined,
			component: empty,
		},
		{
			condition: block_switches,
			id: 'block_switches',
			headerTitle: 'Блок концевых выключателей',
			gateId: undefined,
			component: empty,
		},
		{
			condition: starter,
			id: 'starter',
			headerTitle: 'Пускатель (на открыть и на закрыть)',
			gateId: undefined,
			component: empty,
		},
		{
			condition: notification,
			id: 'notification',
			headerTitle: 'Дата реализации',
			gateId: undefined,
			component: empty,
		},
		{
			condition: user_info,
			id: 'user_info',
			headerTitle: 'Пользователь',
			gateId: undefined,
			component: empty,
		},
	];

	return (
		<div
			className={cn(className, styles.modal__displayNone, { [styles.modal]: isOne, [styles.modal_isBlur]: automatic,})}
		>
			{modals.map(
				({ condition, id, headerTitle, gateId, component }) =>
					condition && ( <ModalOverlay key={id} gateId={gateId} id={id} headerTitle={headerTitle} >
							{component}
						</ModalOverlay>
					),
			)}
		</div>
	);
};
export default ModalWrapper;