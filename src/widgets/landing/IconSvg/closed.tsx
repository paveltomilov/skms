import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const ButtonClosed: React.FC<Props> = ({ size, className, onClick }) => (
	<svg
		className={className ?? ''}
		width={size ?? '24'}
		height={size ?? '24'}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<path
			d="M6 6L18.6004 18.6004M6 18.6004L18.6004 6"
			stroke="#DDDEDE"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ButtonClosed;
