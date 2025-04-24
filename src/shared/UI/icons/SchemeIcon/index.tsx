import { ICON_COLOR, SCHEME_ICON_SIZE } from '@/shared/configs/icon';
import { IconColor } from '@/shared/types/icon';
import { SchemeIconType } from '@/shared/types/scheme';
import { FC } from 'react';

interface Props {
	type: SchemeIconType;
	color?: keyof Pick<IconColor, 'default' | 'disabled'>;
	shadow?: boolean;
	className?: string;
}

const SchemeIcon: FC<Props> = ({
	type,
	color = 'default',
	shadow = false,
	className,
}) => {
	const sizes = SCHEME_ICON_SIZE[type];
	const colors = ICON_COLOR[color];
	const filter = shadow ? 'drop-shadow(2px 2px 1px #00000057)' : '';
	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			color={colors}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
			filter={filter}
		>
			<use
				xlinkHref={`/svg/sprite.svg#${type}`}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default SchemeIcon;
