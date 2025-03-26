import { ICON_COLOR, ICON_SIZE, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';

/* 
Размеры иконок:
'xs' - 16px,
'sm' - 20px,
'md' - 26px,
'lg' - 28px
*/

interface OtherSizes {
	width: number;
	height: number;
}

interface Props {
	name:
		| 'accept'
		| 'exclamation'
		| 'question'
		| 'search'
		| 'chevron'
		| 'side'
		| 'micro'
		| 'ellipseClose'
		| 'close'
		| 'curvedArrow'
		| 'sharp'
		| 'filter'
		| 'arrow'
		| 'home'
		| 'training'
		| 'ptk'
		| 'simulator'
		| 'scheme'
		| 'attention'
		| 'feedback'
		| 'success'
		| 'error';
	size?: 'xs' | 'sm' | 'md' | 'lg' | OtherSizes;
	color?: 'default' | 'disabled' | 'white';
	transform?:
		| 'mirror'
		| 'rotate45'
		| 'rotateLeft45'
		| 'rotate90'
		| 'rotateLeft90'
		| 'rotate180';
}

const Icon: FC<Props> = ({
	name,
	size = 'sm',
	color = 'default',
	transform,
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
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
		>
			<use
				xlinkHref={`/icons/sprite.svg?v=1#${name}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Icon;
