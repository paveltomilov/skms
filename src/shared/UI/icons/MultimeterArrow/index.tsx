import { FC, RefObject } from 'react';

interface Props {
	ref: RefObject<SVGSVGElement | null>;
	onMouseDown: (event: React.MouseEvent) => void;
	onMouseUp: (event: React.MouseEvent) => void;
	angle: number;
	className?: string;
}

const MultimeterArrow: FC<Props> = ({
	ref,
	onMouseDown,
	onMouseUp,
	angle,
	className,
}) => {
	return (
		<svg
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			transform={`rotate(${angle})`}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/multimeter.svg#arrow'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default MultimeterArrow;
