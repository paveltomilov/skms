'use client';

import React, { useState, useEffect, useCallback } from 'react'; 
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
  DragStartEvent,
  Over
} from '@dnd-kit/core';

import MultimeterWidget from '@/widgets/Multimeter';
// import { MockScheme } from '@/__mocks__/MockScheme';
import { Probe } from '@/entities/Circuit/Probe/Probe'; 

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    selectCurrentMode,
    selectProbeConnections,
    setProbeConnection,
    setMeasurementResult,
    setErrorState,
} from '@/store/multimeterSlice';
import { initialState as staticCircuitState } from '@/store/valveSchemeSlice'; 

import { calculateMeasurement } from '@/shared/lib/physicsEngine/measurements';
import { runSafetyChecks } from '@/shared/lib/physicsEngine/safetyChecks';

import styles from './SimulationEnvironment.module.scss';

function getDroppableType(over: Over | null): string | undefined {
  if (
    over?.data.current &&
    typeof over.data.current === 'object' &&
    'type' in over.data.current &&
    typeof over.data.current.type === 'string'
  ) {
    return over.data.current.type;
  }
  return undefined;
}

export const SimulationEnvironment: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const currentMode = useAppSelector(selectCurrentMode);
  const probeConnections = useAppSelector(selectProbeConnections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.data.current?.type !== 'probe') return;

    const probeId = active.id as string;
    const probeColor = probeId.includes('red') ? 'red' : 'black';
    let targetId: string | null = null;
    let targetType: 'jack' | 'node' | null = null;

    if (over) {
      const potentialTargetType = getDroppableType(over);
      if (potentialTargetType === 'jack' || potentialTargetType === 'node') {
        targetId = over.id as string;
        targetType = potentialTargetType;
      }
    }
    dispatch(setProbeConnection({ probeColor, connection: { targetId, targetType } }));
  }, [dispatch]);

  useEffect(() => {
    if (currentMode === 'OFF') return;

    const redConnectedToNode = probeConnections.red.targetType === 'node' && !!probeConnections.red.targetId;
    const blackConnectedToNode = probeConnections.black.targetType === 'node' && !!probeConnections.black.targetId;
    let requiredConnectionsMet = false;

    if (currentMode.startsWith('DCV_') || currentMode.startsWith('ACV_') || currentMode.startsWith('OHM_') || currentMode === 'DIODE') {
        requiredConnectionsMet = redConnectedToNode && blackConnectedToNode;
    } else {
        requiredConnectionsMet = true;
    }

    if (!requiredConnectionsMet) {
      dispatch(setMeasurementResult({ value: null }));
      return;
    }

    const safetyCheckResult = runSafetyChecks(
        { currentMode, probeConnections },
        staticCircuitState 
    );

    if (safetyCheckResult?.error) {
        dispatch(setErrorState(safetyCheckResult.error));
        return;
    }

    try {
        const measurement = calculateMeasurement(
            { currentMode, probeConnections },
            staticCircuitState 
        );
        dispatch(setMeasurementResult({
            value: measurement?.value ?? null,
            unit: measurement?.unit ?? null,
            isOverload: measurement?.isOverload ?? false,
        }));
    } catch {
        dispatch(setErrorState('CALCULATION_ERROR'));
    }
  }, [currentMode, probeConnections, dispatch]);

  const renderOverlay = useCallback((): React.ReactNode => {
    if (activeId === 'probe-red-instance') {
      return <Probe id="probe-red-overlay" color="red" />;
    }
    if (activeId === 'probe-black-instance') {
      return <Probe id="probe-black-overlay" color="black" />;
    }
    return null;
  }, [activeId]);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.environment}>
        <div className={styles.multimeterPlacement}>
          <MultimeterWidget />
        </div>
        <div className={styles.schemePlacement}>
          {/* <MockScheme /> */}
        </div>
        <div className={styles.probePlacementRed}>
          <Probe id="probe-red-instance" color="red" />
        </div>
        <div className={styles.probePlacementBlack}>
          <Probe id="probe-black-instance" color="black" />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>{renderOverlay()}</DragOverlay>
    </DndContext>
  );
};