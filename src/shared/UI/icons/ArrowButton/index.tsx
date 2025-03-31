import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';
import { IconColor, IconTransform } from '@/shared/types/icon';

interface Props {
	color?: keyof Pick<IconColor, 'white' | 'green'>;
	disable?: boolean;
	transform?: keyof Pick<
		IconTransform,
		'rotate90' | 'rotateLeft90' | 'rotate180'
	>;
	className?: string;
}

const ArrowButton: FC<Props> = ({
	color = 'green',
	disable = false,
	transform,
	className,
}) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<svg
			width="36"
			height="36"
			viewBox="0 0 36 36"
			fill={colors}
			color={colors}
			transform={transforms}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#circle_arrow'}
				width="100%"
				height="100%"
			/>
			{disable && (
				<>
					<path d="M0 36L36 0" stroke="#DE1212" strokeWidth="2" />
					<path
						d="M1.43051e-06 -1.57361e-06L36 36"
						stroke="#DE1212"
						strokeWidth="2"
					/>
				</>
			)}
		</svg>
	);
};

export default ArrowButton;
