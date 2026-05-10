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
import { setResistance } from '@/store/circuitSlice';
import store from '@/store/store';
import { useGetMalfunctionsInputBreaker } from '@/shared/hooks/useGetMalfunctionInputBreaker';
import { runSchemeRecalculationPipeline } from '@/features/scheme-simulation';
import { syncInputBreakerContactsFromScheme } from '@/store/inputBreakerSlice';

const Scheme: FC = () => {
	const dispatch = useAppDispatch();
	const circuit = useAppSelector(state => state.circuit);

	// для рендера щупов
	const activeProbe = useAppSelector(
		state => state.multimeter.activeProb,
	) as ProbeColor;
	const isMultimeterOff = useAppSelector(
		state => state.multimeter.currentMode === 'OFF',
	);

	const probeConnections = useAppSelector(
		state => state.multimeter.probeConnections,
	);
	const isMeasurementOverlayMode = useAppSelector(state => {
		const { lamps, motor, block_switches, starter } = state.modal;
		return lamps || motor || block_switches || starter;
	});

	const { hasMalfunctionNoSwitchingPhasesInputBreaker } =
		useGetMalfunctionsInputBreaker();

	// Проецируем механическое состояние вводного автомата в контакты фаз с учетом неисправностей из схемы.
	useEffect(() => {
		dispatch(syncInputBreakerContactsFromScheme());
	}, [
		dispatch,
		hasMalfunctionNoSwitchingPhasesInputBreaker,
		circuit,
	]);

	// устанавливает значенния неисправностей в тру в схеме задвижки
	useGateMalfunctions();

	// для состояния точек (вынести в отдельный хук)
	const points = useAppSelector(state => state.points);

	// Комплексный пересчет схемы: точки и контакты пересчитываются одновременно до стабильного состояния
	useEffect(() => {
		const maxIterations = 15; // Защита от бесконечного цикла
		let iteration = 0;
		let hasChanges = true;

		// Цикл пересчета до стабильного состояния
		while (hasChanges && iteration < maxIterations) {
			iteration++;
			hasChanges = false;

			// Получаем актуальное состояние из store на каждой итерации
			const currentState = store.getState();
			const currentScheme = currentState.circuit;
			const currentPoints = currentState.points;

			const { updatedPoints, pointsChanged, resistanceChanges } =
				runSchemeRecalculationPipeline(
				currentScheme,
				currentPoints,
			);

			// Применяем изменения точек (если есть)
			if (pointsChanged) {
				if (!isMeasurementOverlayMode) {
					dispatch(setVoltagePoints(updatedPoints));
					hasChanges = true;
				}
			}

			// Применяем изменения контактов пускателей (если есть)
			if (Object.keys(resistanceChanges).length > 0) {
				for (const [elementId, newResistance] of Object.entries(
					resistanceChanges,
				)) {
					dispatch(
						setResistance({ id: elementId, value: newResistance }),
					);
					hasChanges = true;
				}
			}

			// Если были изменения, цикл продолжится с обновленным состоянием из store
			// Redux Toolkit синхронно обновляет store в рамках одного события,
			// поэтому следующий store.getState() вернет актуальные данные
		}

		if (iteration >= maxIterations) {
			console.warn(
				'Достигнут лимит итераций пересчета схемы (15). Возможна рекурсия.',
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		circuit,
		points,
		hasMalfunctionNoSwitchingPhasesInputBreaker,
		isMeasurementOverlayMode,
		dispatch,
	]);

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
			{activeProbe && (
				<Probe color={activeProbe} isDisabled={isMultimeterOff} />
			)}

			{/* если щуп прикреплен к схеме или попапу, его рендерит схема */}
			{probeConnections['black'] && (
				<Probe color="black" isDisabled={isMultimeterOff} />
			)}
			{probeConnections['red'] && (
				<Probe color="red" isDisabled={isMultimeterOff} />
			)}
		</div>
	);
};

export default Scheme;
