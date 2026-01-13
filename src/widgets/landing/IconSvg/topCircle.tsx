import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
};

const TopCircle: React.FC<Props> = ({ className }) => (
	<svg
		className={className ?? ''}
		width="648"
		height="661"
		viewBox="0 0 648 661"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g filter="url(#filter0_f_7569_7644)">
			<ellipse
				cx="692"
				cy="3.89383e-06"
				rx="229"
				ry="260"
				transform="rotate(90 692 3.89383e-06)"
				fill="#42E465"
			/>
		</g>
		<defs>
			<filter
				id="filter0_f_7569_7644"
				x="0"
				y="-661"
				width="1384"
				height="1322"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="BackgroundImageFix"
					result="shape"
				/>
				<feGaussianBlur
					stdDeviation="216"
					result="effect1_foregroundBlur_7569_7644"
				/>
			</filter>
		</defs>
	</svg>
);

export default TopCircle;
