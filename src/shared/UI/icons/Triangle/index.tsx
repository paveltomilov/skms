import { TRIANGLE_COLOR } from '@/shared/configs/gate';
import { ICON_TRANSFORM } from '@/shared/configs/icon';
import { TriangleColor } from '@/shared/types/gate';
import { IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof TriangleColor;
	transform?: keyof Omit<IconTransform, 'mirror'>;
	className?: string;
}

const Triangle: FC<Props> = ({ color = 'green', transform, className }) => {
	const colors = TRIANGLE_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width={20}
			height={19}
			viewBox="0 0 20 19"
			color={colors.fill}
			stroke={colors.stroke}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#triangle'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Triangle;
