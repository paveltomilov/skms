'use client';
import styles from './styles.module.scss';
import { FC, useEffect } from 'react';
import { SCHEME_ELEMENTS } from '@/shared/configs/schemeElements';
import { SchemeElement } from '@/entities/SchemeElement';
import { SchemePoint } from '@/entities/SchemePoint';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/store';
import { setVoltagePoints } from '@/store/pointsSlice';
import Probe from '@/entities/Probe';
import { ProbeColor } from '@/shared/types/multimeter';
import { InputCircuitBreaker } from '@/entities/InputCircuitBreaker';
import { SCHEME_POINTS } from '@/shared/configs/points';
import { useGateMalfunctions } from '@/shared/hooks/useGateMalfunctions';
import { setNewVoltagePoints } from '@/shared/utils/setPointsVoltage/setPointsVoltage';

const Scheme: FC = () => {
	const dispatch = useAppDispatch();

	// для рендера щупов
	const activeProbe = useAppSelector(
		state => state.multimeter.activeProb,
	) as ProbeColor;

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);

	// устанавливает значенния неисправностей в тру в схеме задвижки
	useGateMalfunctions();

	// для состояния точек (вынести в отдельный хук)
	const points = useAppSelector(state => state.points);
	const scheme = useAppSelector(state => state.circuit);

	useEffect(() => {
		const updatedPoints = setNewVoltagePoints(scheme, points);
		dispatch(setVoltagePoints(updatedPoints));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scheme, dispatch]);

	return (
		<div className={styles.scheme}>
			{SCHEME_ELEMENTS.map(({ id, aria, type }) => (
				<SchemeElement key={id} id={id} title={aria} type={type} />
			))}

			<InputCircuitBreaker />
			{/* отрисовывам точки только с координатами */}
			{Object.entries(SCHEME_POINTS)
				.filter(
					([, position]) =>
						position.x !== undefined && position.y !== undefined,
				)
				.map(([id, position]) => (
					<SchemePoint key={id} id={id} position={position} />
				))}

			{/* если щуп перетаскивается, его рендерит схема */}
			{activeProbe && <Probe color={activeProbe} />}

			{/* если щуп прикреплен к схеме, его рендерит схема */}
			{probeConnections['black'] && <Probe color="black" />}
			{probeConnections['red'] && <Probe color="red" />}
		</div>
	);
};

export default Scheme;
