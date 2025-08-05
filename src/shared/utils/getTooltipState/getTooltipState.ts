import { TooltipState } from '@/shared/types/tooltip';

// функция для получения положения тултипа

export const getTooltipState = (tooltipWidth: number, tooltipHeight: number, target: DOMRect) => {
    const state: TooltipState = {
        direction: 'top',
        side: 'center',
        positionX: 0,
        positionTop: null,
        positionBottom: null,
    };

    if (target.bottom > window.innerHeight - tooltipHeight) {
        state.direction = 'bottom';
        state.positionBottom = window.innerHeight-target.y;
    } else {
        state.positionTop = target.bottom + 8.5;
    }
    if (target.x < tooltipWidth / 2) {
        state.side = 'left';
        state.positionX = target.x + (target.right - target.x) / 2;
    } else {
        if (target.right > (window.innerWidth - tooltipWidth / 2)) {
            state.side = 'right';
            state.positionX = target.x + (target.right - target.x) / 2 - tooltipWidth;
        } else {
            state.positionX = target.x + (target.right - target.x) / 2 - tooltipWidth / 2;
        }
    }
    return state;
};