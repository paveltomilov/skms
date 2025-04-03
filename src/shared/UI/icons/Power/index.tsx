import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconColor, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'magenta'>;
	transform?: keyof Pick<IconTransform, 'rotate180' | 'rotateLeft90'>;
	className?: string;
}

const Power: FC<Props> = ({ color = 'default', transform, className }) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#power'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Power;
