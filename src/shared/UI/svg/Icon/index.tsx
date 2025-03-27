import { ICON_COLOR, ICON_SIZE, ICON_TRANSFORM } from '@/shared/configs/icon';
import { Name, Size, Color, Transform, OtherSizes } from '@/shared/types/icon';
import { FC } from 'react';

/* 
Размеры иконок:
'xs' - 16px,
'sm' - 20px,
'md' - 26px,
'lg' - 28px
*/

interface Props {
	name: Name;
	size?: Size;
	color?: Color;
	strokeWidth?: number;
	transform?: Transform;
	className?: string;
}

const Icon: FC<Props> = ({
	name,
	size = 'sm',
	color = 'default',
	strokeWidth,
	transform,
	className,
}) => {
	const isCustomSize = typeof size === 'object';
	const sizes = !isCustomSize ? ICON_SIZE[size] : (size as OtherSizes);
	const viewBox = !isCustomSize
		? ICON_SIZE[size].viewBox
		: `0 0 ${size.width} ${size.height}`;
	const fill = ICON_COLOR[color];
	const stroke =
		name === 'accept' && color === 'disabled' ? ICON_COLOR.disabled : '';
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={viewBox}
			color={fill}
			stroke={stroke}
			strokeWidth={strokeWidth && `${strokeWidth}px`}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={`/icons/sprite.svg#${name}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Icon;
