'use client';

import { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { Display } from '@/entities/Display';
import ControlPanel from '@/entities/ControlPanel';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';
import Probe from '@/entities/Probe';
import { getMultimeterAction } from '@/store/actions/multimiter/getMultimeterAction';
import {
	MultimeterModePropPayload,
	attachProbe,
	setMeasurementResult,
} from '@/store/multimeterSlice';
import {
	CONTROL_CIRCUIT_NEUTRAL_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/points';
import { calculateResistanceBetweenPoints } from '@/shared/utils/calculateResistanceBetweenPoints/calculateResistanceBetweenPoints';
import {
	OHM_200_MAX_VALUE,
	OHM_OPEN_LINE,
} from '@/shared/configs/resistanceMeasurement';

const Multimeter = () => {
	const dispatch = useAppDispatch();

	const { currentMode, displayValue, activeProb, probeConnections } =
		useAppSelector(state => state.multimeter);
	const circuit = useAppSelector(state => state.circuit);

	const redProbe = probeConnections.red.pointId;
	const blackProbe = probeConnections.black.pointId;

	const redIsPowerPoint = useAppSelector(state =>
		redProbe ? state.points[redProbe as string] : false,
	);
	const blackIsPowerPoint = useAppSelector(state =>
		blackProbe ? state.points[blackProbe as string] : false,
	);

	const isVoltageMode =
		currentMode.startsWith('ACV') || currentMode.startsWith('DCV');

	const probeState: MultimeterModePropPayload = useMemo(() => ({
		red: {
			isNeutral:
				redProbe === POWER_CIRCUIT_NEUTRAL_ID ||
				redProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
			isPower: Boolean(redIsPowerPoint),
			pointId: redProbe,
		},
		black: {
			isNeutral:
				blackProbe === POWER_CIRCUIT_NEUTRAL_ID ||
				blackProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
			isPower: Boolean(blackIsPowerPoint),
			pointId: blackProbe,
		},
	}), [redProbe, blackProbe, redIsPowerPoint, blackIsPowerPoint]);

	const modeAction = getMultimeterAction(currentMode);

	useEffect(() => {
		if (!isVoltageMode) {
			return;
		}

		if (
			probeConnections.black.pointId !== CONTROL_CIRCUIT_NEUTRAL_ID ||
			probeConnections.black.dropId !== null
		) {
			dispatch(
				attachProbe({
					probeColor: 'black',
					pointId: CONTROL_CIRCUIT_NEUTRAL_ID,
					dropId: null,
				}),
			);
		}
	}, [
		dispatch,
		isVoltageMode,
		probeConnections.black.dropId,
		probeConnections.black.pointId,
	]);

	useEffect(() => {
		if (currentMode === 'OHM_200') {
			const resistance = calculateResistanceBetweenPoints(
				(redProbe as string | null) ?? null,
				(blackProbe as string | null) ?? null,
				circuit,
			);

			if (resistance === null) {
				dispatch(setMeasurementResult(null));
				return;
			}

			if (resistance >= OHM_OPEN_LINE || resistance > OHM_200_MAX_VALUE) {
				dispatch(setMeasurementResult('OL'));
				return;
			}

			dispatch(setMeasurementResult(Number(resistance.toFixed(1))));
			return;
		}

		dispatch(modeAction(probeState));
	}, [
		dispatch,
		modeAction,
		probeState,
		currentMode,
		redProbe,
		blackProbe,
		circuit,
	]);

	return (
		<div className={styles.multimeter}>
			<Display value={displayValue} />
			<ControlPanel mode={currentMode} />
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				{activeProb !== 'black' &&
					!probeConnections.black.pointId && (
					<Probe color="black" />
				)}
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				{activeProb !== 'red' && !probeConnections.red.pointId && (
					<Probe color="red" />
				)}
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
