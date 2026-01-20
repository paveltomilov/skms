import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const RadioCheck: React.FC<Props> = ({ size, className, onClick }) => (
	<svg
		className={className ?? ''}
		width={size ?? '24'}
		height={size ?? '24'}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<rect
			x="1"
			y="1"
			width="22"
			height="22"
			rx="11"
			stroke="#42E465"
			strokeWidth="2"
		/>
		<rect x="4" y="4" width="16" height="16" rx="8" fill="#42E465" />
	</svg>
);

export default RadioCheck;
