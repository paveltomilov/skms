import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconColor, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	transform?: keyof IconTransform;
	className?: string;
}

const CurvedArrow: FC<Props> = ({
	color = 'default',
	transform,
	className,
}) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];

	return (
		<svg
			width="30"
			height="20"
			viewBox="0 0 30 20"
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#curvedArrow'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default CurvedArrow;
