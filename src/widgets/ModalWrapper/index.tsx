'use client';

import { FC, JSX, useEffect } from 'react';
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
import { PopupSimulationComplete } from '../PopupSimulationComplete';
import { PopupAbortSimulation } from '../PopupAbortSimulation';
import { PopupStartSimulation } from '../PopupStartSimulation';
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
		abortSimulation,
		note,
		simulationComplete,
		startSimulation,
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
		simulationComplete ||
		abortSimulation ||
		startSimulation ||
		note;

	const gateId = useAppSelector(state => state.gate.activeGateId as string);
	const student = useAppSelector(state => state.training.currentStudent);

	const fullName = isAdmin
		? 'Преподаватель'
		: `${student?.first_name} ${student?.last_name}`;

	const gates = useAppSelector(state => state.gate);
	const gateName = gates.activeGateId
		? gates.gates[gates.activeGateId].name
		: '';

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
			headerTitle: `Задать симуляцию ${gateName}`,
			gateId: undefined,
			component: <PopupSetSimulation />,
		},
		{
			condition: studentStatistics,
			id: 'studentStatistics',
			headerTitle: `Статистика: ${fullName}`,
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
		{
			condition: simulationComplete,
			id: 'simulationComplete',
			headerTitle: 'Завершение симуляции',
			gateId: undefined,
			component: <PopupSimulationComplete />,
		},
		{
			condition: abortSimulation,
			id: 'abortSimulation',
			headerTitle: 'Прервать симуляцию',
			gateId: undefined,
			component: <PopupAbortSimulation />,
		},
		{
			condition: startSimulation,
			id: 'startSimulation',
			headerTitle: 'Симуляция запущена',
			gateId: undefined,
			component: <PopupStartSimulation />,
		},
	];
	// отключаем скролл страницы
	useEffect(() => {
		if (isOne) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOne]);

	// Блокировка закрытия модальных окон setSimulation, simulationComplete и abortSimulation через Esc
	useEffect(() => {
		if (!setSimulation && !simulationComplete && !abortSimulation) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setSimulation, simulationComplete]);

	// Обработчик клика вне модального окна
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Блокируем закрытие для setSimulation и simulationComplete
		if (setSimulation || simulationComplete) {
			e.stopPropagation();
			return;
		}
		// Для остальных модальных окон можно добавить логику закрытия, если нужно
	};

	return (
		<div
			className={cn(className, styles.modal__displayNone, {
				[styles.modal]: isOne,
				[styles.modal_isBlur]: automatic,
			})}
			onClick={handleOverlayClick}
		>
			{modals.map(
				({ condition, id, headerTitle, gateId, component }) =>
					condition && (
						<ModalOverlay
							key={id}
							gateId={gateId}
							id={id}
							headerTitle={headerTitle}
							preventClose={
								id === 'setSimulation' ||
								id === 'simulationComplete'
							}
						>
							{component}
						</ModalOverlay>
					),
			)}
		</div>
	);
};

export default ModalWrapper;
