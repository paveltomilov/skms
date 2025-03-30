import {
	ICON_COLOR,
	ICON_TRANSFORM,
	STATUS_ICON_SIZE,
} from '@/shared/configs/icon';
import { IconColor, IconTransform } from '@/shared/types/icon';
import { FC } from 'react';

interface Props {
	type?: 'longWave' | 'shortWave' | 'crash';
	color?: keyof Omit<IconColor, 'disabled' | 'white' | 'white_opacity'>;
	transform?: keyof IconTransform;
	className?: string;
}

const Status: FC<Props> = ({
	type = 'longWave',
	color = 'default',
	transform,
	className,
}) => {
	const sizes = STATUS_ICON_SIZE[type];
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
				xlinkHref={`/svg/sprite.svg#${type}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Status;
