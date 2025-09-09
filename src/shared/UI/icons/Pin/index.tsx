import { ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';

interface Props {
	className?: string;
}

const Pin: FC<Props> = ({ className }) => {
	const sizes = ICON_SIZE['xs'];
	return (
		<svg
			width={sizes.width}
			height={sizes.height}
			viewBox={sizes.viewBox}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use xlinkHref={'/svg/sprite.svg#pin'} width="100%" height="100%" />
		</svg>
	);
};

export default Pin;
