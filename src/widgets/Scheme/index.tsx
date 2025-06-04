'use client';

import styles from './styles.module.scss';
import { FC, useEffect } from 'react';
import { SCHEME_ELEMENTS, SCHEME_POINTS } from '@/shared/configs/scheme';
import { SchemeElement } from '@/entities/SchemeElement';
import { SchemePoint } from '@/entities/SchemePoint';
import { useAppSelector, useAppDispatch } from '@/shared/hooks/store';
import Probe from '@/entities/Probe';
import { ProbeColor } from '@/shared/types/multimeter';
import { setNewVoltagePoints } from '@/shared/utils/scheme';
import { InitialStateScheme } from '@/shared/types/scheme';
import { setVoltagePoints } from '@/store/pointsSlice';
const Scheme: FC = () => {
	const activeProbe = useAppSelector(
		state => state.multimeter.activeProb,
	) as ProbeColor;

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);
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

	return (
		<div className={styles.scheme}>
			{SCHEME_ELEMENTS.map(item => (
				<SchemeElement key={item.id} element={item} />
			))}

			{Object.entries(SCHEME_POINTS).map(([id, position]) => (
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
