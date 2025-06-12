import { FC, RefObject } from 'react';

interface Props {
	ref: RefObject<SVGSVGElement | null>;
	onMouseDown: (event: React.MouseEvent) => void;
	angle: number;
	className?: string;
}

const SwitchHandle: FC<Props> = ({ ref, onMouseDown, angle, className }) => {
	return (
		<svg
			ref={ref}
			onMouseDown={onMouseDown}
			transform={`rotate(${angle})`}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#switch'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default SwitchHandle;
