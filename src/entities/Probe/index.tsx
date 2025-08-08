'use client';

import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import styles from './styles.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';
import {useAppSelector} from '@/shared/hooks/store';
import {SCHEME_POINTS} from '@/shared/configs/scheme';
import {ProbeColor} from '@/shared/types/multimeter';

interface ProbeProps {
    color: ProbeColor;
}

export const Probe: React.FC<ProbeProps> = ({color}) => {
    const point = useAppSelector(
        state => state.multimeter.probeConnections[color],
    );

    const {attributes, listeners, setNodeRef, transform, isDragging} =
        useDraggable({
            id: color,
            data: {
                color,
                type: 'probe',
            },
        });

    const style = point
        ? {
            left: `${SCHEME_POINTS[point].x + 3}px`, // + 3 чтобы щуп был по центру точки
            top: `${SCHEME_POINTS[point].y + 11}px`, // + 11 чтобы щуп был по центру точки
        }
        : {
            transform: `${CSS.Translate.toString(
                transform,
            )} rotate(-15deg)`,
        };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.probe} ${styles[color]} ${
                isDragging && styles.dragging
            }`}
            {...listeners}
            {...attributes}
            suppressHydrationWarning={true}
        >
            <ProbeIcon color={color}/>
        </div>
    );
};

export default Probe;
