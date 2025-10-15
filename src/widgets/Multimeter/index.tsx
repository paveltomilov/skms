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
	detachProbe,
	setMeasurementResult,
} from '@/store/multimeterSlice';
import {
	CONTROL_CIRCUIT_NEUTRAL_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/points';
import { calculateResistanceBetweenPoints } from '@/shared/utils/calculateResistanceBetweenPoints/calculateResistanceBetweenPoints';
import {
	OHM_OPEN_LINE,
	OHM_RANGE_LIMITS,
} from '@/shared/configs/resistanceMeasurement';
import { UniqueIdentifier } from '@dnd-kit/core';

const Multimeter = () => {
	const dispatch = useAppDispatch();

	const { currentMode, displayValue, activeProb, probeConnections } =
		useAppSelector(state => state.multimeter);
	const circuit = useAppSelector(state => state.circuit);

	const redProbe: UniqueIdentifier | null = probeConnections.red.pointId;
	const blackProbe: UniqueIdentifier | null = probeConnections.black.pointId;

	const redIsPowerPoint = useAppSelector(state =>
		redProbe ? state.points[redProbe as string] : false,
	);
	const blackIsPowerPoint = useAppSelector(state =>
		blackProbe ? state.points[blackProbe as string] : false,
	);

	const isVoltageMode =
		currentMode.startsWith('ACV') || currentMode.startsWith('DCV');
	const isOhmMode = currentMode.startsWith('OHM');
	const currentOhmLimit = isOhmMode
		? OHM_RANGE_LIMITS[currentMode as keyof typeof OHM_RANGE_LIMITS] ?? null
		: null;

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
		if (currentMode !== 'OFF') {
			return;
		}

		if (
			activeProb !== 'red' &&
			(probeConnections.red.pointId !== null ||
				probeConnections.red.dropId !== null)
		) {
			dispatch(detachProbe('red'));
		}

		if (
			activeProb !== 'black' &&
			(probeConnections.black.pointId !== null ||
				probeConnections.black.dropId !== null)
		) {
			dispatch(detachProbe('black'));
		}
	}, [
		dispatch,
		currentMode,
		activeProb,
		probeConnections.red.pointId,
		probeConnections.red.dropId,
		probeConnections.black.pointId,
		probeConnections.black.dropId,
	]);

	useEffect(() => {
		if (isOhmMode) {
			const resistance = calculateResistanceBetweenPoints(
				(redProbe as string | null) ?? null,
				(blackProbe as string | null) ?? null,
				circuit,
			);

			if (resistance === null) {
				dispatch(setMeasurementResult(null));
				return;
			}

			if (resistance >= OHM_OPEN_LINE) {
				dispatch(setMeasurementResult('OL'));
				return;
			}

			if (currentOhmLimit !== null && resistance > currentOhmLimit) {
				dispatch(setMeasurementResult('OL'));
				return;
			}

			const decimals = resistance >= 100 ? 0 : 1;
			dispatch(setMeasurementResult(Number(resistance.toFixed(decimals))));
			return;
		}

		dispatch(modeAction(probeState));
	}, [
		dispatch,
		modeAction,
		probeState,
		currentMode,
		isOhmMode,
		currentOhmLimit,
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
