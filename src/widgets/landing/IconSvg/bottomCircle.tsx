import React from 'react';

type Props = {
	size?: number | string;
	className?: string;
};

const BottomCircle: React.FC<Props> = ({ className }) => (
	<svg
		className={className ?? ''}
		width="566"
		height="571"
		viewBox="0 0 566 571"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g filter="url(#filter0_f_7569_7645)">
			<ellipse
				cx="229"
				cy="260"
				rx="229"
				ry="260"
				transform="matrix(1 0 -0.000188961 1 -244.914 352)"
				fill="#3FA8C2"
			/>
		</g>
		<defs>
			<filter
				id="filter0_f_7569_7645"
				x="-596.963"
				y="0"
				width="1162"
				height="1224"
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity="0" result="BackgroundImageFix" />
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="BackgroundImageFix"
					result="shape"
				/>
				<feGaussianBlur
					stdDeviation="176"
					result="effect1_foregroundBlur_7569_7645"
				/>
			</filter>
		</defs>
	</svg>
);

export default BottomCircle;
