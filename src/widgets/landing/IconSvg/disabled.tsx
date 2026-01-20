import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const Disabled: React.FC<Props> = ({ size, className, onClick }) => (
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
			rx="2"
			fill="#BFBFBF"
			fillOpacity="0.52"
			stroke="#BFBFBF"
			strokeWidth="2"
		/>
	</svg>
);

export default Disabled;
