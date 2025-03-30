import { ICON_COLOR } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled' | 'white_opacity'>;
	className?: string;
}

const Exclamation: FC<Props> = ({ color = 'default', className }) => {
	const colors = ICON_COLOR[color];

	return (
		<svg
			width="4"
			height="14"
			viewBox="0 0 4 14"
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#exclamation'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Exclamation;
