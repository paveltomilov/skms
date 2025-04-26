import { BODY_DRAGGING_CLASS } from '@/shared/configs/simulator.constants'; 

export const useBodyDragClass = () => {
    const toggleDragClass = (isDragging: boolean) => {
        if (typeof document !== 'undefined') {
            document.body.classList.toggle(BODY_DRAGGING_CLASS, isDragging);
        }
    };

    return { toggleDragClass };
};