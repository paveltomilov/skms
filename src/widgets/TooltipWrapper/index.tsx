import { TooltipState } from '@/shared/types/tooltip';
import Tooltip from '@/shared/UI/Tooltip';
import { getTooltipState } from '@/shared/utils/getTooltipState/getTooltipState';
import { FC, useState } from 'react';

interface TooltipWrapperProps {
    content: string;
    children: React.ReactNode;
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
    content,
    children
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const initialState: TooltipState = {
        positionX: 0,
        positionTop: null,
        positionBottom: null,
        direction: 'top',
        side: 'center'
    };

    const [tooltipState, setTooltipState] = useState(initialState);

    const handleOpenTooltip = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(true);
        const target = (e.target as HTMLElement).getBoundingClientRect();
        setTooltipState(getTooltipState(180, 70, target));
    };

    const handleCloseTooltip = () => {
        setIsOpen(false);
    };

    return (
        <div className='styles__tooltip_wrapper'
            onMouseEnter={handleOpenTooltip}
            onMouseLeave={handleCloseTooltip}>
            {isOpen &&
                <Tooltip
                    positionX={tooltipState.positionX}
                    positionTop={tooltipState.positionTop}
                    positionBottom={tooltipState.positionBottom}
                    direction={tooltipState.direction}
                    side={tooltipState.side}
                    content={content}
                />}
            {children}
        </div>
    );
};

export default TooltipWrapper;