import { FC } from 'react';

interface Props {
	className?: string;
}

const LineRupture: FC<Props> = ({ className }) => {
	return (
		<svg
			width={326}
			height={2}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#lineRupture'}
			/>
		</svg>
	);
};

export default LineRupture;
