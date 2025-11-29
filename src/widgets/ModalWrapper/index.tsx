'use client';

import { FC, JSX } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAppSelector } from '@/shared/hooks/store';
import { PopupGateControl } from '../PopupGateControl';
import PopupGateValves from '../PopupGateValves';
import ModalOverlay from '../ModalOverlay';
import PopupDiagnostic from '../PopupDiagnostic';
import { Automatic } from '../Automatic';
import { Modals, type ModalState } from '@/store/modalSlice';
import PopupBlockSwitches from '../PopupBlockSwitches';
import { LampScheme } from '../LampScheme';
import PopupActuator from '@/widgets/PopupActuator';
import PopupClamp from '../PopupClamp';
import { PopupSetSimulation } from '../PopupSetSimulation';
import PopupNotificationDev from '../PopupNotificationDev';
import { PopupStudentStatistics } from '../PopupStudetnStatistics';
import { PopupStudentCreate } from '../PopupStudentCreate';
import { PopupStudentDelete } from '../PopupStudentDelete';
import { PopupNote } from '../PopupNote';
import { useUserCookies } from '@/shared/hooks/useUserCookies';

interface IModals {
	condition: boolean;
	id: Modals;
	headerTitle: string;
	gateId: string | undefined;
	component: JSX.Element;
}
const ModalWrapper: FC<{ className?: string }> = ({ className }) => {
	const {
		automatic,
		gateValves,
		diagnostic,
		gateControl,
		lamps,
		starter,
		block_switches,
		motor,
		notification,
		setSimulation,
		studentStatistics,
		studentCreate,
		studentDelete,
		note,
	} = useAppSelector((state): ModalState => state.modal);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';

	const isOne =
		automatic ||
		gateValves ||
		diagnostic ||
		gateControl ||
		lamps ||
		motor ||
		block_switches ||
		starter ||
		notification ||
		setSimulation ||
		studentStatistics ||
		studentCreate ||
		studentDelete ||
		note;
	const gateId = useAppSelector(state => state.gate.activeGateId as string);
	const student = useAppSelector(state => state.training.currentStudent);

	const fullName = isAdmin
		? 'Преподаватель'
		: `${student?.first_name} ${student?.last_name}`;

	const modals: IModals[] = [
		{
			condition: automatic,
			id: 'automatic',
			headerTitle: 'Автомат',
			gateId: undefined,
			component: <Automatic />,
		},
		{
			condition: gateControl,
			id: 'gateControl',
			headerTitle: '',
			gateId: gateId ?? undefined,
			component: <PopupGateControl />,
		},
		{
			condition: diagnostic,
			id: 'diagnostic',
			headerTitle: '',
			gateId: gateId ?? undefined,
			component: <PopupDiagnostic />,
		},
		{
			condition: gateValves,
			id: 'gateValves',
			headerTitle: '',
			gateId: gateId ?? undefined,
			component: <PopupGateValves />,
		},
		{
			condition: lamps,
			id: 'lamps',
			headerTitle: 'Лампочки',
			gateId: undefined,
			component: <LampScheme />,
		},
		{
			condition: motor,
			id: 'motor',
			headerTitle: 'Контакты обмотки двигателя',
			gateId: undefined,
			component: <PopupClamp />,
		},
		{
			condition: block_switches,
			id: 'block_switches',
			headerTitle: 'Блок концевых выключателей',
			gateId: undefined,
			component: <PopupBlockSwitches />,
		},
		{
			condition: starter,
			id: 'starter',
			headerTitle: 'Пускатель (на открыть и на закрыть)',
			gateId: undefined,
			component: <PopupActuator />,
		},
		{
			condition: notification,
			id: 'notification',
			headerTitle: 'Дата реализации',
			gateId: undefined,
			component: <PopupNotificationDev />,
		},
		{
			condition: setSimulation,
			id: 'setSimulation',
			headerTitle: 'Задать симуляцию',
			gateId: undefined,
			component: <PopupSetSimulation />,
		},
		{
			condition: studentStatistics,
			id: 'studentStatistics',
			headerTitle: `Статистика ${fullName}`,
			gateId: undefined,
			component: <PopupStudentStatistics />,
		},
		{
			condition: studentCreate,
			id: 'studentCreate',
			headerTitle: `Создание ${isAdmin ? 'преподавателя' : 'ученика'}`,
			gateId: undefined,
			component: <PopupStudentCreate />,
		},
		{
			condition: studentDelete,
			id: 'studentDelete',
			headerTitle: `Удаление ${isAdmin ? 'преподавателя' : 'ученика'}`,
			gateId: undefined,
			component: <PopupStudentDelete />,
		},
		{
			condition: note,
			id: 'note',
			headerTitle: 'Уведомление',
			gateId: undefined,
			component: <PopupNote />,
		},
	];

	return (
		<div
			className={cn(className, styles.modal__displayNone, {
				[styles.modal]: isOne,
				[styles.modal_isBlur]: automatic,
			})}
		>
			{modals.map(
				({ condition, id, headerTitle, gateId, component }) =>
					condition && (
						<ModalOverlay
							key={id}
							gateId={gateId}
							id={id}
							headerTitle={headerTitle}
						>
							{component}
						</ModalOverlay>
					),
			)}
		</div>
	);
};

export default ModalWrapper;
