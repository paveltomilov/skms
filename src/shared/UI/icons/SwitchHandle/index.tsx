import { FC, RefObject } from 'react';

interface Props {
	ref?: RefObject<SVGSVGElement | null> | null;
	onMouseDown?: (event: React.MouseEvent) => void;
	onMouseUp?: (event: React.MouseEvent) => void;
	onClick?: (event: React.MouseEvent) => void;
	angle: number;
	className?: string;
}

const SwitchHandle: FC<Props> = ({
	ref,
	onMouseDown,
	onMouseUp,
	onClick,
	angle,
	className,
}) => {
	return (
		<svg
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onClick={onClick}
			transform={`rotate(${angle})`}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#handle'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default SwitchHandle;
