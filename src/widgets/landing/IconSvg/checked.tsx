import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
	onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const Checked: React.FC<Props> = ({ size, className, onClick }) => (
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
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.70853 12.6883L4.45138 11.9571C4.59623 11.8141 4.83171 11.8141 4.97657 11.9571L8.42823 15.3548L17.8226 6.10722C17.9675 5.96426 18.203 5.96426 18.3478 6.10722L19.0907 6.83846C19.2359 6.98105 19.2359 7.21285 19.0907 7.35544L8.69083 17.5928C8.54597 17.7357 8.31049 17.7357 8.16563 17.5928L3.70853 13.2054C3.5633 13.0628 3.5633 12.8309 3.70853 12.6883Z"
			fill="#42E465"
		/>
		<rect
			x="1"
			y="1"
			width="22"
			height="22"
			rx="2"
			stroke="#42E465"
			strokeWidth="2"
		/>
	</svg>
);

export default Checked;
