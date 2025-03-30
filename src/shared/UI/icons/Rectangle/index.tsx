import { ICON_COLOR, RECTANGLE_ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';
import { IconColor } from '@/shared/types/icon';

interface Props {
	color?: keyof Pick<
		IconColor,
		'white' | 'green' | 'disabled' | 'electric_green'
	>;
	outlined?: boolean;
	className?: string;
}

const Rectangle: FC<Props> = ({
	color = 'green',
	outlined = false,
	className,
}) => {
	const sizes = RECTANGLE_ICON_SIZE[outlined ? 'outlined' : 'default'];
	const colors = ICON_COLOR[color];

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			{outlined && (
				<rect
					x="0.5"
					y="0.5"
					width="39"
					height="27"
					stroke="#8F1313"
					strokeWidth="1"
					fill="none"
				/>
			)}
			<use
				xlinkHref={'/svg/sprite.svg#rectangle'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Rectangle;
