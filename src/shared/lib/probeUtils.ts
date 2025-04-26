import {
    ProbeDragData,
    ConnectionPointDropData
} from '@/shared/types/simulator';

import { DndItemType } from '@/shared/configs/simulator.constants';

export function isProbeDragData(data: unknown): data is ProbeDragData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    const potentialData = data as Record<string, unknown>;

    return (
        potentialData.type === DndItemType.PROBE &&
        typeof potentialData.probeColor === 'string' &&
        (potentialData.probeColor === 'red' || potentialData.probeColor === 'black')
    );
}

export function isConnectionPointDropData(data: unknown): data is ConnectionPointDropData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    const potentialData = data as Record<string, unknown>;

    return (
        potentialData.type === DndItemType.NODE &&
        typeof potentialData.nodeId === 'string' &&
        Array.isArray(potentialData.accepts)
    );
}

export function calculateConnectionPointPosition(
    targetNodeId: string,
    environmentElement: HTMLDivElement | null
): { x: number; y: number } | null {
    if (!environmentElement) {
        return null;
    }

    const targetElement = environmentElement.querySelector<HTMLElement>(`#point-${targetNodeId}`);

    if (targetElement) {
        try {
            const envRect = environmentElement.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();

            if (targetRect.width === 0 && targetRect.height === 0 && targetRect.x === 0 && targetRect.y === 0) {
                return null;
            }

            const x = targetRect.left - envRect.left + targetRect.width / 2;
            const y = targetRect.top - envRect.top + targetRect.height / 2;

            return { x, y };
        } catch {
            return null;
        }
    } else {
        return null;
    }
}