import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { Transform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: 'green' | 'magenta' | 'red' | 'electric_green' | 'blue';
	transform?: Transform;
}

const Circle: FC<Props> = ({ color = 'green', transform }) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			stroke={colors}
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
		>
			<use
				xlinkHref={'/svg/sprite.svg#circle_chevron'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Circle;
