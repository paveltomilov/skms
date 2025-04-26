import { useState, useCallback, CSSProperties } from 'react';
import { Active, Over } from '@dnd-kit/core';
import { useAppDispatch } from '@/shared/hooks/store';
import { setProbeConnection, setProbePosition } from '@/store/multimeterSlice';

import {
    PROBE_TIP_OFFSETS,
    DEFAULT_PROBE_POSITIONS,
    DndItemType,
    Z_INDEX
} from '@/shared/configs/simulator.constants';

import {
    isProbeDragData,
    isConnectionPointDropData,
    calculateConnectionPointPosition
} from '@/shared/lib/probeUtils';

import {
    ProbeColor,
    ProbePosition,
    ProbePositionsState,
    UseProbesProps,
    UseProbesReturn
} from '@/shared/types/simulator';

export const useProbes = ({ activeId, environmentRef }: UseProbesProps): UseProbesReturn => {
    const dispatch = useAppDispatch();

    const [probePositions, setProbePositions] = useState<ProbePositionsState>({
        red: DEFAULT_PROBE_POSITIONS.red,
        black: DEFAULT_PROBE_POSITIONS.black,
    });

    const handleProbeDragEndLogic = useCallback((active: Active, over: Over | null) => {
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

        setProbePositions(prev => ({ ...prev, [probeColor]: finalVisualPosition }));

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

    }, [dispatch, environmentRef]);

    const getProbeStyle = useCallback((color: ProbeColor): CSSProperties => {
        const currentPos = probePositions[color];
        const isActive = activeId === `probe-${color}`;

        let positionStyle: CSSProperties;
        let zIndex: number;

        if (typeof currentPos === 'object' && currentPos !== null && 'x' in currentPos) {
            positionStyle = {
                left: `${currentPos.x - PROBE_TIP_OFFSETS.x}px`,
                top: `${currentPos.y - PROBE_TIP_OFFSETS.y}px`,
                position: 'absolute',
            };
            zIndex = Z_INDEX.CONNECTED_PROBE;
        } else {
            positionStyle = { ...(currentPos as { top: string; left: string }), position: 'absolute' };
            zIndex = Z_INDEX.DEFAULT_PROBE;
        }

        const baseStyle: CSSProperties = {
            ...positionStyle,
            zIndex: zIndex,
            transition: 'none',
        };

        if (isActive) {
            return {
                ...baseStyle,
                opacity: 0,
                pointerEvents: 'none',
                cursor: 'grabbing',
            };
        }

        return {
            ...baseStyle,
            opacity: 1,
            pointerEvents: 'auto',
            cursor: 'grab',
        };
    }, [activeId, probePositions]);

    return {
        handleProbeDragEndLogic,
        getProbeStyle,
    };
};