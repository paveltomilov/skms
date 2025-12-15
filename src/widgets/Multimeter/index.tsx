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
	detachProbe,
} from '@/store/multimeterSlice';
import { CONTROL_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/controlCircuit/constants';
import { POWER_CIRCUIT_NEUTRAL_ID } from '@/shared/configs/powerCircuit/constants';

const Multimeter: React.FC = () => {
	const dispatch = useAppDispatch();

	const { currentMode, displayValue, activeProb, probeConnections } =
		useAppSelector(state => state.multimeter);
	const isAnyModalOpen = useAppSelector(state =>
		Object.values(state.modal).some(Boolean),
	);

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

	const isVoltageMode =
		currentMode.startsWith('ACV') || currentMode.startsWith('DCV');

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

	//Фиксируем черный щуп на нейтрали при измерении напряжения
	useEffect(() => {
		if (!isVoltageMode || isAnyModalOpen) {
			dispatch(detachProbe('black'));
			return;
		}

		dispatch(
			attachProbe({
				probeColor: 'black',
				pointId: CONTROL_CIRCUIT_NEUTRAL_ID,
				dropId: CONTROL_CIRCUIT_NEUTRAL_ID,
			}),
		);
	}, [dispatch, isAnyModalOpen, isVoltageMode]);

	useEffect(() => {
		dispatch(modeAction(probeState));
	}, [probeState, modeAction]);

	return (
		<div className={styles.multimeter}>
			<Display value={displayValue} />
			<ControlPanel mode={currentMode} />
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProb !== 'black' && !probeConnections['black'] && (
					<Probe color="black" />
				)}
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				{/* если щуп не перетаскивается и не прикреплен к схеме, он рендерится мультиметром */}
				{activeProb !== 'red' && !probeConnections['red'] && (
					<Probe color="red" />
				)}
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
