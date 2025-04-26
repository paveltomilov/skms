'use client';

import React, { useRef, useState } from 'react';
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    UniqueIdentifier,
    Active,
    Over 
} from '@dnd-kit/core';

// import { Scheme } from '@/widgets/Scheme';
import Multimeter from '@/widgets/Multimeter';
import { Probe } from '@/entities/Probe';
import { ConnectionPointList } from '@/entities/ConnectionPointList';
import { DragOverlayProbe } from '@/shared/features/DragOverlayProbe';

import { useProbeVisuals } from '@/shared/hooks/useProbeVisuals'; 
import { useProbeDragHandler } from '@/shared/hooks/useProbeDragHandler';
import { isProbeDragData } from '@/shared/lib/probeUtils'; 
import { ActiveDragData } from '@/shared/types/simulator'; 

import { useDndConfig } from '@/shared/hooks/useDndConfig';
import { MOCK_CONNECTION_POINTS } from '@/__mocks__/simulator.mocks';

import styles from './styles.module.scss';

export const Simulator: React.FC = () => {
    const environmentRef = useRef<HTMLDivElement>(null);
    const { sensors, collisionDetection, modifiers } = useDndConfig();

    const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(null);
    const [currentActiveData, setCurrentActiveData] = useState<ActiveDragData>(null); 

    const { getProbeStyle, updateProbeVisualPosition } = useProbeVisuals(activeDragId);
    const { handleProbeDragEnd } = useProbeDragHandler({
        environmentRef,
        onVisualPositionUpdate: updateProbeVisualPosition,
    });

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveDragId(active.id);

        if (isProbeDragData(active.data.current)) {
			setCurrentActiveData(active.data.current);
        } else {
			setCurrentActiveData(null);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (isProbeDragData(active.data.current)) {
            handleProbeDragEnd(active as Active, over as Over | null);
        }

        setActiveDragId(null);
        setCurrentActiveData(null);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            collisionDetection={collisionDetection}
            modifiers={modifiers}
        >
            <div ref={environmentRef} className={styles.environmentWrapper}>
                <div className={styles.multimeterPlacement}>
                    {/* <Scheme /> */}
                    <Multimeter />
                </div>
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
            <DragOverlayProbe activeId={activeDragId} data={currentActiveData} />
        </DndContext>
    );
};

export default Simulator;