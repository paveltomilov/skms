import { ICON_COLOR, ICON_SIZE } from '@/shared/configs/icon';
import { IconColor, IconSize, OtherSizes } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	size?: keyof Pick<IconSize, 'xs' | 'sm' | 'lg'> | OtherSizes;
	color?: keyof Pick<IconColor, 'default' | 'disabled' | 'red'>;
	strokeWidth?: number;
	className?: string;
}

const Close: FC<Props> = ({
	size = 'sm',
	color = 'default',
	strokeWidth = 2,
	className,
}) => {
	const isCustomSize = typeof size === 'object';
	const sizes = !isCustomSize ? ICON_SIZE[size] : (size as OtherSizes);
	const viewBox = !isCustomSize
		? ICON_SIZE[size].viewBox
		: `0 0 ${size.width} ${size.height}`;
	const colors = ICON_COLOR[color];

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={viewBox}
			fill={colors}
			stroke={colors}
			strokeWidth={strokeWidth && strokeWidth}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use href={'/svg/sprite.svg#close'} width="100%" height="100%" />
		</svg>
	);
};

export default Close;
