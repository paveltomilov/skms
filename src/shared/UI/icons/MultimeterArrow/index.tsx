import { FC, RefObject } from 'react';

interface Props {
	ref: RefObject<SVGSVGElement | null>;
	onMouseDown: (event: React.MouseEvent | React.TouchEvent) => void;
	angle: number;
	className?: string;
}

const MultimeterArrow: FC<Props> = ({ ref, onMouseDown, angle, className }) => {
	return (
		<svg
			ref={ref}
			onMouseDown={onMouseDown}
			transform={`rotate(${angle})`}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#multimeter-arrow'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default MultimeterArrow;
