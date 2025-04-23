'use client';

import React, { useState, useCallback, useRef } from 'react';
import {
	DndContext, DragEndEvent, DragStartEvent, DragOverlay,
	PointerSensor, useSensor, useSensors, UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import Multimeter from '@/widgets/Multimeter';
// import Scheme from '../Scheme';  // Импортируем схему, она будет в тренажере!
import { Probe } from '@/entities/Probe';
import { ConnectionPointList, PointData } from '@/entities/ConnectionPointList';

import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection';
import { useAppDispatch } from '@/shared/hooks/store';
import {
	setProbeConnection,
	setProbePosition
} from '@/store/multimeterSlice';

import styles from './styles.module.scss';

interface ActiveDragData {
	type: 'probe';
	probeColor: 'red' | 'black';
}
type MockNodeId = string;

const DEFAULT_PROBE_POSITIONS: { red: { top: string; left: string; }, black: { top: string; left: string; } } = {
	red: { top: '115px', left: '495px' },
	black: { top: '25px', left: '495px' },
};

const PROBE_TIP_OFFSET_X = 12;
const PROBE_TIP_OFFSET_Y = 4;

const MOCK_CONNECTION_POINTS: PointData[] = [
	{ id: 'mock-point-power-in', label: 'Вход Пит.', position: { top: '10%', left: '10%' } },
	{ id: 'mock-point-motor-a', label: 'Двиг. А', position: { top: '30%', left: '80%' } },
	{ id: 'mock-point-control-1', label: 'Упр. 1', position: { top: '60%', left: '10%' } },
	{ id: 'mock-point-neutral', label: 'Ноль', position: { top: '80%', left: '80%' } },
	{ id: 'mock-point-ground', label: 'Земля', position: { top: '90%', left: '50%' } },
];

export const Simulator: React.FC = () => {
	const dispatch = useAppDispatch();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
	const [activeData, setActiveData] = useState<ActiveDragData | null>(null);

	type ProbePosition = { top: string; left: string; } | { x: number; y: number; };
	const [currentProbePositions, setCurrentProbePositions] = useState<{
		red: ProbePosition;
		black: ProbePosition;
	}>({
		red: DEFAULT_PROBE_POSITIONS.red,
		black: DEFAULT_PROBE_POSITIONS.black,
	});

	const environmentRef = useRef<HTMLDivElement>(null);
	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragStart = useCallback((event: DragStartEvent) => {
		document.body.classList.add('sim-env-dragging');
		const { active } = event;
		if (active.data.current?.type === 'probe' && typeof active.data.current.probeColor === 'string') {
			setActiveId(active.id);
			setActiveData(active.data.current as ActiveDragData);
		}
	}, []);

	const handleDragEnd = useCallback((event: DragEndEvent) => {
		document.body.classList.remove('sim-env-dragging');
		const { active, over } = event;
		const activeProbeData = active.data.current;

		setActiveId(null);
		setActiveData(null);

		if (activeProbeData?.type !== 'probe' || !activeProbeData?.probeColor) {
			return;
		}

		const probeColor = activeProbeData.probeColor as 'red' | 'black';
		let finalProbePosition: ProbePosition = DEFAULT_PROBE_POSITIONS[probeColor]; 
		let targetIdForRedux: MockNodeId | null = null; 
		let calculatedStickPosition: { x: number; y: number } | null = null; 

		if (over) {
			const overData = over.data.current;
			if (overData?.type === 'node'
				&& overData?.accepts?.includes('probe')
				&& typeof overData.nodeId === 'string')
			{
				const potentialTargetId = overData.nodeId as MockNodeId;
				const targetElement = document.getElementById(`point-${potentialTargetId}`);
				const envElement = environmentRef.current;

				if (targetElement && envElement) {
					const envRect = envElement.getBoundingClientRect();
					const targetRect = targetElement.getBoundingClientRect();
					const stickX = targetRect.left - envRect.left + targetRect.width / 2;
					const stickY = targetRect.top - envRect.top + targetRect.height / 2;
					finalProbePosition = { x: stickX, y: stickY };
					calculatedStickPosition = { x: stickX, y: stickY };
					targetIdForRedux = potentialTargetId;
				} else {
					finalProbePosition = DEFAULT_PROBE_POSITIONS[probeColor];
                    calculatedStickPosition = null;
					targetIdForRedux = null;
				}
			} else { 
				finalProbePosition = DEFAULT_PROBE_POSITIONS[probeColor];
                calculatedStickPosition = null;
				targetIdForRedux = null;
			}
		} else {
			finalProbePosition = DEFAULT_PROBE_POSITIONS[probeColor];
            calculatedStickPosition = null;
			targetIdForRedux = null;
		}

		setCurrentProbePositions(prev => ({ ...prev, [probeColor]: finalProbePosition }));

		dispatch(setProbeConnection({
			probeColor: probeColor,
			connection: {
				targetId: targetIdForRedux,
				targetType: targetIdForRedux ? 'node' : null
			}
		}));

		dispatch(setProbePosition({
			probeColor: probeColor,
			position: calculatedStickPosition 
		}));

	}, [dispatch]);

	const getProbeStyle = useCallback((color: 'red' | 'black'): React.CSSProperties => {
		const currentPos = currentProbePositions[color]; 
		const isActive = activeId === `probe-${color}`; 

		let positionStyle: React.CSSProperties;
		if (typeof currentPos === 'object' && currentPos !== null && 'x' in currentPos && 'y' in currentPos) {
			positionStyle = {
				left: `${currentPos.x - PROBE_TIP_OFFSET_X}px`,
				top: `${currentPos.y - PROBE_TIP_OFFSET_Y}px`
			};
		} else {
			positionStyle = currentPos;
		}

		return {
			position: 'absolute',
			...positionStyle, 
			zIndex: isActive ? 1 : (typeof currentPos === 'object' && 'x' in currentPos ? 10 : 5),
			opacity: isActive ? 0 : 1, 
			pointerEvents: isActive ? 'none' : 'auto', 
			cursor: 'grab',
			transition: 'none', 
		};
	}, [activeId, currentProbePositions]); 

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			collisionDetection={probeTipCollisionDetection}
			modifiers={[restrictToParentElement]}
		>
			<div ref={environmentRef} className={styles.environmentWrapper}>
				<div className={styles.multimeterPlacement}>
					<Multimeter />
				</div>
				{/* <Scheme />  // Здесь будет примерно распологаться реальная схема*/} 
				<div className={styles.schemePlacement}>
					{MOCK_CONNECTION_POINTS.length > 0 ? (
						<ConnectionPointList points={MOCK_CONNECTION_POINTS} />
					) : (
						<div className={styles.loadingMessage}>Нет точек подключения</div>
					)}
				</div>

				<Probe id='probe-red' color='red' style={getProbeStyle('red')} />
				<Probe id='probe-black' color='black' style={getProbeStyle('black')} />

			</div>

			<DragOverlay
				modifiers={[restrictToParentElement]}
				zIndex={1000}
				dropAnimation={null} 
			>
				{activeId && activeData ? (
					<Probe
						id={`${activeId}-overlay`}
						color={activeData.probeColor}
						style={{ cursor: 'grabbing' }}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default Simulator;