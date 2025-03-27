import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';

interface Props {
	name: 'filled' | 'outlined' | 'chevron_color';
	color?:
		| 'default'
		| 'disabled'
		| 'white'
		| 'magenta'
		| 'red'
		| 'orange'
		| 'blue'
		| 'green'
		| 'electric_green'
		| 'dark_green';
	transform?:
		| 'rotate45'
		| 'rotateLeft45'
		| 'rotate90'
		| 'rotateLeft90'
		| 'rotate180';
}

const Arrow: FC<Props> = ({ name, color = 'default', transform }) => {
	const colors = ICON_COLOR[color];
	const stroke = name === 'outlined' ? ICON_COLOR[color] : '';
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width={12}
			height={16}
			viewBox="0 0 12 16"
			fill={colors}
			color={colors}
			stroke={stroke}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
		>
			<use
				xlinkHref={`/icons/sprite.svg#${name}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Arrow;
