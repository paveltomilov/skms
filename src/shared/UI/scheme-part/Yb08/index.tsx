import { ICON_COLOR } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	className?: string;
}

const Yb08: FC<Props> = ({ color = 'default', className }) => {
	const colors = ICON_COLOR[color];

	return (
		<svg
			width="74"
			height="35"
			viewBox="0 0 74 35"
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#yb08'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Yb08;
