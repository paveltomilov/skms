import styles from './styles.module.scss';
import { TooltipProps } from '@/shared/types/tooltip';


const Tooltip = ({
    positionX,
    positionY,
    direction,
    side,
    content
}: TooltipProps) => {
    return (
        <div className={styles.tooltip} style={{
            top: `${positionY}px`,
            left: `${positionX}px`,
        }}>
            <div className={styles.tooltip__arrow}
                data-direction={direction}
                data-side={side}>
            </div>
            <div className={styles.tooltip__arrow__shadow}
                data-direction={direction}
                data-side={side}>
            </div>

            <div className={styles.tooltip__window}>
            </div>
            <div className={styles.tooltip__text}>
                {content}
            </div>
        </div>
    );
};

export default Tooltip;