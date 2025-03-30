import { ICON_COLOR } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	color?: keyof Pick<IconColor, 'default' | 'disabled' | 'white'>;
	className?: string;
}

const Feedback: FC<Props> = ({ color = 'default', className }) => {
	const colors = ICON_COLOR[color];

	return (
		<svg
			width="34"
			height="29"
			viewBox="0 0 34 29"
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#feedback'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Feedback;
