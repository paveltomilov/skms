import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDragSensors = () => {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
        // delay: 100, 
        // tolerance: 5 
      }
    })
  );
};