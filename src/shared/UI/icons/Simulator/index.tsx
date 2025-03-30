import { ICON_COLOR } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	className?: string;
}

const Simulator: FC<Props> = ({ color = 'default', className }) => {
	const colors = ICON_COLOR[color];

	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#simulator'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Simulator;
