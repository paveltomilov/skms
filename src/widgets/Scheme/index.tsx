'use client';

import styles from './styles.module.scss';
import { FC, useEffect } from 'react';
import { SCHEME_ELEMENTS, SCHEME_POINTS } from '@/shared/configs/scheme';
import { SchemeElement } from '@/entities/SchemeElement';
import { SchemePoint } from '@/entities/SchemePoint';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/store';
import Probe from '@/entities/Probe';
import { ProbeColor } from '@/shared/types/multimeter';
import { setNewVoltagePoints } from '@/shared/utils/findElementByID/scheme';
import { InitialStateScheme } from '@/shared/types/scheme';
import { setVoltagePoints } from '@/store/pointsSlice';
import { InputCircuitBreaker } from '@/entities/InputCircuitBreaker';
import { Automatic } from '../Automatic';
import ModalWrapper from '../ModalWrapper';
import { PopupGateControl } from '../PopupGateControl';
import PopupDiagnostic from '@/entities/PopupDiagnostic';
import { closeModal } from '@/store/modalSlice';
import Tooltip from '@/shared/UI/Tooltip';
import { closeTooltip, openTooltip } from '@/store/tooltipSlice';
import { getTooltipState } from '@/shared/utils/getTooltipState/getTooltipState';

const Scheme: FC = () => {
	// для рендера щупов
	const activeProbe = useAppSelector(
		state => state.multimeter.activeProb,
	) as ProbeColor;

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);

	// для состояния точек
	const points = useAppSelector(state => state.points);
	const scheme: InitialStateScheme = useAppSelector(state => state.circuit);
	const dispatch = useAppDispatch();

	function dispatched(payload: Record<string, boolean>) {
		dispatch(setVoltagePoints(payload));
	}

	useEffect(() => {
		const pointsVoltage = setNewVoltagePoints(scheme, points, dispatched);
		console.log(pointsVoltage);
	}, [scheme]);

	const { automatic, gateControl, diagnostic } = useAppSelector(
		state => state.modal,
	);

	//для вывода tooltip

	const tooltip = useAppSelector(state => state.tooltip);

	const handleTooltipOpen = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
		if (e) {
			const target: DOMRect = (e.target as HTMLElement).getBoundingClientRect();

			//получение координат тултипа и данных о положении носика
			// размеры тултипа надо  вынести в конфиги?

			const tooltipState = getTooltipState(180, 70, target);

			dispatch(openTooltip({
				isOpen: true,
				positionX: tooltipState.positionX,
				positionY: tooltipState.positionY,
				direction: tooltipState.direction,
				side: tooltipState.side,
				content: 'Текст со всплываюей подсказкой о способе взаимодействия  с элементом'
			}
			));
		};
	};

	const handleTooltipClose = () => {
		dispatch(closeTooltip());
	};

	return (
		<div className={styles.scheme}>
			{SCHEME_ELEMENTS.map(item => (
				<SchemeElement key={item.id} element={item} />
			))}

			<InputCircuitBreaker />

			{Object.entries(SCHEME_POINTS).map(([id, position]) => (
				<SchemePoint key={id} id={id} position={position}
					handleTooltipOpen={handleTooltipOpen}
					handleTooltipClose={handleTooltipClose} />
			))}

			{/* если щуп перетаскивается, его рендерит схема */}
			{activeProbe && <Probe color={activeProbe} />}

			{/* если щуп прикреплен к схеме, его рендерит схема */}
			{probeConnections['black'] && <Probe color="black" />}
			{probeConnections['red'] && <Probe color="red" />}

			{automatic && (
				<ModalWrapper
					title="Автомат"
					isBlur
					onClose={() => dispatch(closeModal('automatic'))}
				>
					<Automatic />
				</ModalWrapper>
			)}

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

			{tooltip.isOpen &&
				<Tooltip
					positionX={tooltip.positionX}
					positionY={tooltip.positionY}
					direction={tooltip.direction}
					side={tooltip.side}
					content={tooltip.content}
				/>
			}
		</div>
	);
};

export default Scheme;
