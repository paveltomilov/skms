import { useState, useCallback, CSSProperties } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { ProbeColor, ProbePosition, ProbePositionsState } from '@/shared/types/simulator';
import { DEFAULT_PROBE_POSITIONS, PROBE_TIP_OFFSETS, Z_INDEX } from '@/shared/configs/simulator.constants';

interface UseProbeVisualsReturn {
    probePositions: ProbePositionsState;
    updateProbeVisualPosition: (color: ProbeColor, position: ProbePosition) => void;
    getProbeStyle: (color: ProbeColor) => CSSProperties;
}

/**
 * Хук для управления визуальным состоянием и стилями щупов.
 */
export function useProbeVisuals(activeId: UniqueIdentifier | null): UseProbeVisualsReturn {
    const [probePositions, setProbePositions] = useState<ProbePositionsState>({
        red: DEFAULT_PROBE_POSITIONS.red,
        black: DEFAULT_PROBE_POSITIONS.black,
    });

    const updateProbeVisualPosition = useCallback((color: ProbeColor, position: ProbePosition) => {
        setProbePositions(prev => ({ ...prev, [color]: position }));
    }, []);

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
            positionStyle = { ...(currentPos as object), position: 'absolute' };
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
        probePositions,
        updateProbeVisualPosition,
        getProbeStyle,
    };
}