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
import {
	CONTROL_CIRCUIT_NEUTRAL_ID,
	POWER_CIRCUIT_NEUTRAL_ID,
} from '@/shared/configs/points';

const Multimeter: React.FC = () => {
	const dispatch = useAppDispatch();

	const { currentMode, displayValue, activeProb, probeConnections } =
		useAppSelector(state => state.multimeter);

	const redProbe = probeConnections.red;
	const blackProbe = probeConnections.black;

	const redHasVoltage = useAppSelector(
		state => state.points[redProbe as string],
	);
	const blackHasVoltage = useAppSelector(
		state => state.points[blackProbe as string],
	);

	const isVoltageMode =
		currentMode.startsWith('ACV') || currentMode.startsWith('DCV');
	const isResistanceMode = currentMode.startsWith('OHM');

	const shouldStickToControlNeutral = isVoltageMode || isResistanceMode;

	useEffect(() => {
		if (activeProb === 'black') return;

		if (shouldStickToControlNeutral) {
			if (blackProbe === CONTROL_CIRCUIT_NEUTRAL_ID) return;

			dispatch(
				attachProbe({
					probeColor: 'black',
					pointId: CONTROL_CIRCUIT_NEUTRAL_ID,
				}),
			);
			return;
		}

		if (!blackProbe) return;

		dispatch(detachProbe('black'));
	}, [
		dispatch,
		shouldStickToControlNeutral,
		blackProbe,
		activeProb,
	]);

	
	useEffect(() => {
		const probeState: MultimeterModePropPayload = {
			red: {
				isNeutral:
					redProbe === POWER_CIRCUIT_NEUTRAL_ID ||
					redProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
				isPower: redHasVoltage,
			},
			black: {
				isNeutral:
					blackProbe === POWER_CIRCUIT_NEUTRAL_ID ||
					blackProbe === CONTROL_CIRCUIT_NEUTRAL_ID,
				isPower: blackHasVoltage,
			},
		};

		const action = getMultimeterAction(currentMode);
		dispatch(action(probeState));
	}, [
		dispatch,
		currentMode,
		redProbe,
		blackProbe,
		redHasVoltage,
		blackHasVoltage,
	]);

	return (
		<div className={styles.multimeter}>
			<Display value={displayValue} />
			<ControlPanel mode={currentMode} />
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_black}`}
			>
				{activeProb !== 'black' && !probeConnections['black'] && (
					<Probe color="black" />
				)}
			</ProbeHolder>
			<ProbeHolder
				className={`${styles.multimeter__probeHolder} ${styles.multimeter__probeHolder_red}`}
			>
				{activeProb !== 'red' && !probeConnections['red'] && (
					<Probe color="red" />
				)}
			</ProbeHolder>
		</div>
	);
};

export default Multimeter;
