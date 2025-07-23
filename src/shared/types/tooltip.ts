

export interface TooltipProps {
    positionX: number ;
    positionY: number ;
    direction: 'top' | 'bottom';
    side: 'left' | 'center' | 'right';
    content: string ;
}

export interface TooltipState  extends TooltipProps {
	isOpen: boolean;
}