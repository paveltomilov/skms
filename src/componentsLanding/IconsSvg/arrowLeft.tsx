import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const ArrowLeftIcon: React.FC<Props> = ({ size, className, onClick }) => (
	<svg
		className={className ?? ''}
		width={size ?? '14'}
		height={size ?? '26'}
		viewBox="0 0 14 26"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<path
			d="M13 1L1 13L13 25"
			stroke="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ArrowLeftIcon;
