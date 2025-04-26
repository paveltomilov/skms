import { restrictToParentElement } from '@dnd-kit/modifiers';
import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection'; // Убедитесь, что этот импорт корректен
import { useDragSensors } from './useDragSensors';

export const useDndConfig = () => {
  const sensors = useDragSensors();

  return {
    sensors,
    collisionDetection: probeTipCollisionDetection,
    modifiers: [restrictToParentElement],
  };
};