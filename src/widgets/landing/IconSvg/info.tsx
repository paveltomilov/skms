import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const Info: React.FC<Props> = ({ size, className, onClick }) => (
	<svg
		className={className ?? ''}
		width={size ?? '13'}
		height={size ?? '13'}
		viewBox="0 0 13 13"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<circle cx="6.5" cy="6.5" r="6" stroke="#979A9A" />
		<text x="6.5" y="10" textAnchor="middle" fontSize="10" fill="#979A9A">
			i
		</text>
	</svg>
);

export default Info;
