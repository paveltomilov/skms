
import { ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';

interface Props {
    size?: 'ls' | 'md';
    className?: string;
}

const Channel: FC<Props> = ({
    size = 'ls',
    className,
}) => {
    const sizes = ICON_SIZE[size];
    return (
        <svg
            width={sizes.width}
            height={sizes.height}
            viewBox={sizes.viewBox}
            preserveAspectRatio="xMidYMid meet"
            className={className && className}
        >
            <use
                xlinkHref={'/svg/sprite.svg#channel'}
                width="100%"
                height="100%"
            />
        </svg>
    );
};

export default Channel;
