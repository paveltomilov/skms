'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Dial.module.scss';
import type { MultimeterMode, ModeAnglesMap } from '@/shared/types/multimeter';

interface DialProps {
  currentMode: MultimeterMode;     
  modeAngles: ModeAnglesMap;    
  onModeSelect: (newMode: MultimeterMode) => void; 
}

const findClosestMode = (targetAngle: number, modesMap: ModeAnglesMap): MultimeterMode => {
  let closestMode: MultimeterMode = 'OFF';
  let minDiff = 360;
  targetAngle = (targetAngle % 360 + 360) % 360;
  for (const mode in modesMap) {
    if (Object.prototype.hasOwnProperty.call(modesMap, mode)) {
      const currentModeKey = mode as MultimeterMode;
      const modeAngle = (modesMap[currentModeKey] % 360 + 360) % 360;
      let diff = Math.abs(targetAngle - modeAngle);
      if (diff > 180) { diff = 360 - diff; }
      if (diff < minDiff) { minDiff = diff; closestMode = currentModeKey; }
    }
  }
  return closestMode;
};

export const Dial: React.FC<DialProps> = ({ currentMode, modeAngles, onModeSelect }) => {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(modeAngles[currentMode] ?? 0);

  useEffect(() => {
    if (!isDragging) {
      setRotation(modeAngles[currentMode] ?? 0);
    }
  }, [currentMode, modeAngles, isDragging]);

  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!knobRef.current || !onModeSelect) return; 

    const knobRect = knobRef.current.getBoundingClientRect();
    const centerX = knobRect.left + knobRect.width / 2;
    const centerY = knobRect.top + knobRect.height / 2;
    let clientX, clientY;
    if ('touches' in event) { clientX = event.touches[0].clientX; clientY = event.touches[0].clientY; }
    else { clientX = event.clientX; clientY = event.clientY; }
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = angleRad * (180 / Math.PI) + 90;
    angleDeg = (angleDeg + 360) % 360;

    const closestMode = findClosestMode(angleDeg, modeAngles);
    const snappedAngle = modeAngles[closestMode];

    setRotation(snappedAngle);

    if (closestMode !== currentMode) {
       onModeSelect(closestMode);
    }
    event.preventDefault();

  }, [modeAngles, currentMode, onModeSelect]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(isCurrentlyDragging => {
        if(isCurrentlyDragging) {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchend', handleDragEnd);
        }
        return false;
    });
  }, [handleDragMove]); 

  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDragging(true);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
  }, [handleDragMove, handleDragEnd]);

  return (
    <div className={styles.dialContainer}>
      <div
        ref={knobRef}
        className={`${styles.knob} ${isDragging ? styles.dragging : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onDragStart={(e) => e.preventDefault()}
        title={`Текущий режим: ${currentMode}. Нажмите и тяните для смены.`}
        aria-label="Переключатель режимов мультиметра"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={Object.keys(modeAngles).length -1}
        aria-valuenow={Object.keys(modeAngles).findIndex(k => k === currentMode)}
        aria-valuetext={currentMode}
      >
        <div className={styles.indicator}></div>
      </div>
    </div>
  );
};