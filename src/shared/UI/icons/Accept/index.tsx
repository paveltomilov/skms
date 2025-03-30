import { ICON_COLOR, ICON_SIZE } from '@/shared/configs/icon';
import { IconColor, IconSize } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	size?: keyof Pick<IconSize, 'xs' | 'sm'>;
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	className?: string;
}

const Accept: FC<Props> = ({ size = 'xs', color = 'default', className }) => {
	const sizes = ICON_SIZE[size];
	const colors = ICON_COLOR[color];

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#accept'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Accept;
