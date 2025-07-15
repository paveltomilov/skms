import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
    color?: 'blue' | 'yellow' ;
    value?: string;
    textTop?: string;
    textBottom?: string;
    textLeft?: string;
    textRight?: string;
    colorText?: 'black'|'white';
    className?: string;
}

const Window: FC<Props> = ({
    color,
    value,
    textTop,
    textBottom,
    textLeft,
    textRight,
    colorText = 'black',
    className,
}) => {

    const fieldColor =
        (color === 'blue') ? `${styles.field_blue}` :
        (color === 'yellow') ? `${styles.field_yellow}`:
        `${styles.field_white}`;

    const textColor = (colorText === 'white') ? `${styles.text_white}`:'';

    return (
        <div className={`${styles.window} ${className && className}`}>
            <div className={`${styles.field} ${fieldColor}`}>
                {value && <span>{value}</span>}
            </div>
            <div className={`${styles.text} ${textColor}`}>
                {textTop && <div className={styles.text_top}>{textTop}</div>}
                {textBottom && <div className={styles.text_bottom}>{textBottom}</div>}
                {textLeft && <div className={styles.text_left}>{textLeft}</div>}
                {textRight && <div className={styles.text_right}>{textRight}</div>}
            </div>
        </div>
    );
};

export default Window;