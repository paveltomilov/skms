import React from 'react';
import { DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { Probe } from '@/entities/Probe';
import { Z_INDEX } from '@/shared/configs/simulator.constants';

import { ActiveDragData } from '@/shared/types/simulator'; 
import { isProbeDragData } from '@/shared/lib/probeUtils'; 

interface DragOverlayProbeProps {
    activeId: UniqueIdentifier | null;
    data: ActiveDragData;
}

export const DragOverlayProbe: React.FC<DragOverlayProbeProps> = ({ activeId, data }) => {
    const shouldRenderOverlay = activeId && isProbeDragData(data);

    return (
        <DragOverlay
            modifiers={[restrictToParentElement]}
            zIndex={Z_INDEX.DRAG_OVERLAY}
            dropAnimation={null} 
        >
            {shouldRenderOverlay ? (
                <Probe
                    id={`${activeId}-overlay`}
                    color={data.probeColor}
                    style={{ cursor: 'grabbing' }}
                />
            ) : null}
        </DragOverlay>
    );
};