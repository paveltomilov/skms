'use client';

import { FC, JSX, useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/store';
import { closeModal } from '@/store/modalSlice';
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
import { PopupAbortSimulation } from '../PopupAbortSimulation';
import { PopupAbortSimulationConfirm } from '../PopupAbortSimulationConfirm';
import { useUserCookies } from '@/shared/hooks/useUserCookies';
import { PopupInfo } from '../PopupInfo';
import { PopupSimulationComplete } from '../PopupSimulationComplete';
import { PopupDetectInfo } from '../PopupDetectInfo';

interface IModals {
	condition: boolean;
	id: Modals;
	headerTitle: string;
	gateId: string | undefined;
	component: JSX.Element;
}
const ModalWrapper: FC<{ className?: string }> = ({ className }) => {
	const dispatch = useAppDispatch();
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
		abortSimulationConfirm,
		note,
		infoStartSimulation,
		infoUnfinished,
		simulationComplete,
		detectInfo,
		detectInfoError,
	} = useAppSelector((state): ModalState => state.modal);

	const { role } = useUserCookies();

	const isAdmin = role === 'admin';
	const isStudent = role === 'student';


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
		abortSimulation ||
		abortSimulationConfirm ||
		note ||
		infoStartSimulation ||
		infoUnfinished ||
		simulationComplete ||
		detectInfo ||
		detectInfoError;


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
			headerTitle: `${isStudent ? 'Определить неисправность' : 'Задать симуляцию'} ${gateName}`,
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
		{
			condition: abortSimulationConfirm,
			id: 'abortSimulationConfirm',
			headerTitle: 'Прервать попытку',
			gateId: undefined,
			component: <PopupAbortSimulationConfirm />,
		},
		{
			condition: abortSimulation,
			id: 'abortSimulation',
			headerTitle: 'Попытка прервана',
			gateId: undefined,
			component: <PopupAbortSimulation />,
		},
		{
			condition: infoStartSimulation,
			id: 'infoStartSimulation',
			headerTitle: 'Симуляция запущена',
			gateId: undefined,
			component: <PopupInfo content="start" />,
		},
		{
			condition: infoUnfinished,
			id: 'infoUnfinished',
			headerTitle: 'Незавершенные неисправности',
			gateId: undefined,
			component: <PopupInfo content="malfunctions" />,
		},
		{
			condition: simulationComplete,
			id: 'simulationComplete',
			headerTitle: 'Симуляция завершена',
			gateId: undefined,
			component: <PopupSimulationComplete />,
		},
		{
			condition: detectInfo,
			id: 'detectInfo',
			headerTitle: 'Определение неисправности',
			gateId: undefined,
			component: <PopupDetectInfo />,
		}, {
			condition: detectInfoError,
			id: 'detectInfoError',
			headerTitle: 'Определение неисправности',
			gateId: undefined,
			component: <PopupDetectInfo error />,
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

	// Обработка закрытия модальных окон через Esc
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				// Блокируем закрытие для setSimulation
				if (setSimulation) {
					e.preventDefault();
					e.stopPropagation();
					return;
				}

				// Закрываем abortSimulation по Escape
				if (abortSimulation) {
					e.preventDefault();
					dispatch(closeModal('abortSimulation'));
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setSimulation, abortSimulation, dispatch]);

	// Обработчик клика вне модального окна
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Блокируем закрытие для setSimulation
		if (setSimulation) {
			e.stopPropagation();
			return;
		}

		// Закрываем abortSimulation по клику на оверлей
		if (abortSimulation) {
			dispatch(closeModal('abortSimulation'));
		}
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
							preventClose={id === 'setSimulation'}
						>
							{component}
						</ModalOverlay>
					),
			)}
		</div>
	);
};

export default ModalWrapper;
