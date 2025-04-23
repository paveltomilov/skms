'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './Probe.module.scss';
import ProbeIcon from '@/shared/UI/icons/Probe';
 
 
interface ProbeProps {
    id: string;
    color: 'red' | 'black';
    style?: React.CSSProperties;
}

export const Probe: React.FC<ProbeProps> = ({ id, color, style }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: id,
        data: { 
            type: 'probe',
            probeColor: color,
        },
    });

    const combinedStyle: React.CSSProperties = {
        ...style, 
        cursor: 'grab', 
    };

    return (
        <div
            ref={setNodeRef} 
            id={id} 
            className={styles.probeContainer}
            style={combinedStyle} 
            {...listeners} 
            {...attributes} 
            title={`Щуп ${color === 'red' ? 'красный' : 'черный'}`} 
            suppressHydrationWarning={true}
        >
            <ProbeIcon color={color} className={styles.probeSvg} />
        </div>
    );
};

export default Probe; 