import { useCallback, RefObject } from 'react';
import { Active, Over } from '@dnd-kit/core';
import { useAppDispatch } from '@/shared/hooks/store';
import { setProbeConnection, setProbePosition } from '@/store/multimeterSlice';
import { DEFAULT_PROBE_POSITIONS, DndItemType } from '@/shared/configs/simulator.constants';
import { ProbeColor, ProbePosition } from '@/shared/types/simulator';
import { isProbeDragData, isConnectionPointDropData, calculateConnectionPointPosition } from '@/shared/lib/probeUtils';

interface UseProbeDragHandlerProps {
    environmentRef: RefObject<HTMLDivElement | null>;
    onVisualPositionUpdate: (color: ProbeColor, position: ProbePosition) => void;
}

interface UseProbeDragHandlerReturn {
    handleProbeDragEnd: (active: Active, over: Over | null) => void;
}

/**
 * Хук для обработки логики завершения перетаскивания щупа.
 */
export function useProbeDragHandler({
    environmentRef,
    onVisualPositionUpdate,
}: UseProbeDragHandlerProps): UseProbeDragHandlerReturn {
    const dispatch = useAppDispatch();

    const handleProbeDragEnd = useCallback((active: Active, over: Over | null) => {
        const activeData: unknown = active.data.current;

        if (!isProbeDragData(activeData)) {
            return;
        }

        const probeColor = activeData.probeColor;
        let finalVisualPosition: ProbePosition = DEFAULT_PROBE_POSITIONS[probeColor];
        let connectionTargetId: string | null = null;
        let calculatedStickPosition: { x: number; y: number } | null = null;
        const currentEnvElement = environmentRef.current;

        if (over) {
            const overData: unknown = over.data.current;

            if (isConnectionPointDropData(overData) && overData.accepts.includes(DndItemType.PROBE)) {
                const potentialTargetId = overData.nodeId;
                const stickPosition = calculateConnectionPointPosition(potentialTargetId, currentEnvElement);

                if (stickPosition) {
                    finalVisualPosition = stickPosition;
                    calculatedStickPosition = stickPosition;
                    connectionTargetId = potentialTargetId;
                }
            }
        }

        onVisualPositionUpdate(probeColor, finalVisualPosition);

        dispatch(setProbeConnection({
            probeColor: probeColor,
            connection: {
                targetId: connectionTargetId,
                targetType: connectionTargetId ? DndItemType.NODE : null
            }
        }));
        dispatch(setProbePosition({
            probeColor: probeColor,
            position: calculatedStickPosition
        }));

    }, [dispatch, environmentRef, onVisualPositionUpdate]);

    return {
        handleProbeDragEnd,
    };
}