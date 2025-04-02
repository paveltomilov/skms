import { ICON_COLOR, ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';

interface Props {
	size?: 'sm' | 'md';
	color?: 'white' | 'green';
	disable?: boolean;
	className?: string;
}

const Tilde: FC<Props> = ({
	size = 'sm',
	color = 'green',
	disable = false,
	className,
}) => {
	const colors = ICON_COLOR[color];
	const sizes = ICON_SIZE[size];
	const isSmall = size === 'sm';
	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			fill={colors}
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#tilde'}
				width="100%"
				height="100%"
			/>
			{disable && (
				<>
					<path
						d={isSmall ? 'M0 20L20 0' : 'M0 26L26 0'}
						stroke="#8F1313"
						stroke-linecap="round"
					/>
					<path
						d={
							isSmall
								? 'M0 -8.74228e-07L20 20'
								: 'M-4.76837e-07 -1.1365e-06L26 26'
						}
						stroke="#8F1313"
						stroke-linecap="round"
					/>
				</>
			)}
		</svg>
	);
};

export default Tilde;
