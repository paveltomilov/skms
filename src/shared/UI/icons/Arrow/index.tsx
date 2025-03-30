import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconColor, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	type?: 'filled' | 'outlined' | 'chevron_color';
	color?: keyof Omit<IconColor, 'disabled' | 'white' | 'white_opacity'>;
	transform?: keyof Omit<IconTransform, 'mirror'>;
}

const Arrow: FC<Props> = ({
	type = 'filled',
	color = 'default',
	transform,
}) => {
	const colors = ICON_COLOR[color];
	const stroke = type === 'outlined' ? ICON_COLOR[color] : '';
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
				xlinkHref={`/svg/sprite.svg#${type}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Arrow;
