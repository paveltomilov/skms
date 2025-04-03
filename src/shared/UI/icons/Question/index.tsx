import { ICON_COLOR } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	size?: 'xs' | 'sm';
	color?: keyof Pick<IconColor, 'default' | 'disabled' | 'white_opacity'>;
	className?: string;
}

const Question: FC<Props> = ({ size = 'xs', color = 'default', className }) => {
	const colors = ICON_COLOR[color];
	const sizes =
		size === 'xs'
			? {
					width: '10px',
					height: '14px',
					viewBox: '0 0 10 14',
			  }
			: {
					width: '12px',
					height: '17px',
					viewBox: '0 0 12 17',
			  };

	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#question'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Question;
