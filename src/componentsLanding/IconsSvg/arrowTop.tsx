import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const ArrowTopIcon: React.FC<Props> = ({ size, className, onClick }) => (
	<svg
		className={className ?? ''}
		width={size ?? '12'}
		height={size ?? '8'}
		viewBox="0 0 12 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		onClick={onClick}
	>
		<path
			d="M0.600361 8H11.4007C11.51 7.99969 11.6172 7.97284 11.7107 7.92232C11.8042 7.87181 11.8804 7.79955 11.9312 7.71333C11.982 7.6271 12.0054 7.53017 11.9989 7.43297C11.9925 7.33577 11.9564 7.24198 11.8945 7.1617L6.49433 0.215985C6.27052 -0.071995 5.73171 -0.071995 5.5073 0.215985L0.107147 7.1617C0.0446404 7.24182 0.00798496 7.33565 0.00116339 7.43301C-0.00565818 7.53037 0.0176151 7.62754 0.0684546 7.71394C0.119294 7.80035 0.195755 7.87271 0.289531 7.92314C0.383307 7.97357 0.49081 8.00015 0.600361 8Z"
			fill="#F9FAFB"
		/>
	</svg>
);

export default ArrowTopIcon;
