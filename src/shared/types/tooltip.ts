export interface TooltipProps {
    positionX: number;
    positionTop: number | null;
    positionBottom: number | null;
    direction: 'top' | 'bottom';
    side: 'left' | 'center' | 'right';
    content: string;
}

export interface TooltipState {
    positionX: number;
    positionTop: number | null;
    positionBottom: number | null;
    direction: 'top' | 'bottom';
    side: 'left' | 'center' | 'right';
}
