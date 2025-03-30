import { ICON_COLOR, ICON_SIZE, ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconColor, IconSize, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	size?: keyof Pick<IconSize, 'xs' | 'sm'>;
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	transform?: keyof Omit<IconTransform, 'mirror'>;
	className?: string;
}

const Chevron: FC<Props> = ({
	size = 'xs',
	color = 'default',
	transform,
	className,
}) => {
	const sizes = ICON_SIZE[size];
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#chevron'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Chevron;
