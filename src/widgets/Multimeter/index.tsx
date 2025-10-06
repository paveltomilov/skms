'use client';
import styles from './styles.module.scss';
import { Display } from '@/entities/Display';
import ControlPanel from '@/entities/ControlPanel';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import ProbeHolder from '@/shared/UI/icons/ProbeHolder';
import Probe from '@/entities/Probe';
import { useEffect } from 'react';
import { getMultimeterAction } from '@/store/actions/multimiter/getMultimeterAction';
import { MultimeterModePropPayload, attachProbe, detachProbe } from '@/store/multimeterSlice';
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

	const redIsPowerPoint = useAppSelector(
		state => state.points[redProbe as string],
	);
	const blackIsPowerPoint = useAppSelector(
		state => state.points[blackProbe as string],
	);

	const isVoltageMode =
		currentMode.startsWith('ACV') || currentMode.startsWith('DCV');

	// Фиксируем чёрный щуп на нужной нейтрали в режиме измерения напряжения
	useEffect(() => {
		if (!isVoltageMode) {
			dispatch(detachProbe('black'));
			return;
		}

		// если пользователь перетаскивает чёрный щуп — не вмешиваемся
		if (activeProb === 'black') return;

		// выбираем нужную нейтраль в зависимости от того, куда подключён красный щуп
		const desiredNeutral = redIsPowerPoint
			? POWER_CIRCUIT_NEUTRAL_ID
			: CONTROL_CIRCUIT_NEUTRAL_ID;

		// если уже прикреплён к нужной нейтрали — ничего не делаем
		if (probeConnections.black === desiredNeutral) return;

		dispatch(
			attachProbe({
				probeColor: 'black',
				pointId: desiredNeutral,
			}),
		);
	}, [dispatch, isVoltageMode, redIsPowerPoint, probeConnections.black, activeProb]);

	// Вызываем action для текущего режима (ACV, DCV, Ohm и т.д.)
	// probeState вычисляется внутри эффекта, чтобы не менять ссылку каждый рендер
	useEffect(() => {
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

		const action = getMultimeterAction(currentMode);
		dispatch(action(probeState));
	}, [
		dispatch,
		currentMode,
		redProbe,
		blackProbe,
		redIsPowerPoint,
		blackIsPowerPoint,
	]);

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
