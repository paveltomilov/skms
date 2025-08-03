import { FC } from 'react';
import styles from './styles.module.scss';
import { TooltipProps } from '@/shared/types/tooltip';

const Tooltip: FC<TooltipProps> = ({
    positionX,
    positionTop,
    positionBottom,
    direction,
    side,
    content
}) => {

    const styleTooltip = positionTop? {
            top: `${positionTop}px`,
            left: `${positionX}px`,
        } : 
        {
            bottom: `${positionBottom}px`,
            left: `${positionX}px`,
        };

    return (
        <div className={styles.tooltip} style={styleTooltip}>
            <div className={styles.tooltip__arrow}
                data-direction={direction}
                data-side={side}>
            </div>
            <div className={styles.tooltip__arrow__shadow}
                data-direction={direction}
                data-side={side}>
            </div>

            <div className={styles.tooltip__window}>
                <div className={styles.tooltip__text}>
                    {content}
                </div>

            </div>
        </div>
    );
};

export default Tooltip;