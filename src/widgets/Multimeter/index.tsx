'use client';
import styles from './styles.module.scss';
import { Display } from '@/entities/Display';
import ControlPanel from '@/entities/ControlPanel';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';
import Probe from '@/entities/Probe';
import { useEffect } from 'react';
import { getMultimeterAction } from '@/store/actions/multimiter/getMultimeterAction';
import {
	MultimeterModePropPayload,
	attachProbe,
} from '@/store/multimeterSlice';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/controlCircuit/constants';
import { POWER_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/powerCircuit/constants';

const Multimeter: React.FC = () => {
	const dispatch = useAppDispatch();

	const { currentMode, displayValue, activeProb, probeConnections } =
		useAppSelector(state => state.multimeter);
	const isMultimeterOff = currentMode === 'OFF';
	const isMeasurementOverlayMode = useAppSelector(state => {
		const { lamps, motor, block_switches, starter } = state.modal;
		return lamps || motor || block_switches || starter;
	});
	const isModalBlockingMultimeter = useAppSelector(state => {
		return Object.entries(state.modal)
			.filter(
				([key]) =>
					key !== 'lamps' &&
					key !== 'motor' &&
					key !== 'block_switches' &&
					key !== 'starter',
			)
			.some(([, value]) => Boolean(value));
	});

	const redConn = probeConnections.red;
	const blackConn = probeConnections.black;

	const redProbe = redConn?.pointId ?? null;
	const blackProbe = blackConn?.pointId ?? null;

	const redIsPowerPoint = useAppSelector(
		state => state.points[redProbe as string],
	);
	const blackIsPowerPoint = useAppSelector(
		state => state.points[blackProbe as string],
	);

	const isAcv750Mode = currentMode === 'ACV_750';

	const probeState: MultimeterModePropPayload = {
		red: {
			isNeutral:
				redProbe === POWER_CIRCUIT_NEUTRAL_ID ||
				redProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
			isPower: redIsPowerPoint,
		},
		black: {
			isNeutral:
				blackProbe === POWER_CIRCUIT_NEUTRAL_ID ||
				blackProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
			isPower: blackIsPowerPoint,
		},
	};

	//Экшен для текущего режима мультиметра
	const modeAction = getMultimeterAction(currentMode);

	// В режиме "только схема" и только на ACV_750 автоматически ставим
	// чёрный щуп на нейтраль. В measurement-попапах автопривязка отключена.
	useEffect(() => {
		if (
			!isAcv750Mode ||
			isMeasurementOverlayMode ||
			isModalBlockingMultimeter
		) {
			return;
		}

		dispatch(
			attachProbe({
				probeColor: 'black',
				pointId: CONTROL_CIRCUIT_NEUTRAL_ID,
				dropId: CONTROL_CIRCUIT_NEUTRAL_ID,
			}),
		);
	}, [
		dispatch,
		isAcv750Mode,
		isMeasurementOverlayMode,
		isModalBlockingMultimeter,
	]);

	useEffect(() => {
		dispatch(modeAction(probeState));
	}, [probeState, modeAction]);

	return (
		<div
			className={`${styles.multimeter} ${
				isMeasurementOverlayMode ? styles.multimeter_topLayer : ''
			}`}
		>
			<Display value={displayValue} />
			<ControlPanel mode={currentMode} />
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProb !== 'black' && !probeConnections['black'] && (
					<Probe color="black" isDisabled={isMultimeterOff} />
				)}
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProb !== 'red' && !probeConnections['red'] && (
					<Probe color="red" isDisabled={isMultimeterOff} />
				)}
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
