import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconColor, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	transform?: keyof Omit<IconTransform, 'mirror'>;
	className?: string;
}

const Side: FC<Props> = ({ color = 'default', transform, className }) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];

	return (
		<svg
			width="9"
			height="16"
			viewBox="0 0 9 16"
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#side'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Side;
