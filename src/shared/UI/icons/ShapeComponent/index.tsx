import React, { FC } from 'react';

type Props = Partial<{
	className: string;
	text: string;
	trapezoidColor: string;
	textColor: string;
	shape: 'trapezoid' | 'rectangle';
	width: number;
	height: number;
}>;

const ShapeComponent: FC<Props> = ({
	className,
	text = '',
	trapezoidColor = '#8A8A8A',
	textColor = '#fff',
	shape = 'trapezoid',
	width = 72,
	height = 32,
}) => {
	const pad = 0.5;
	const inset = Math.max(6, Math.round(width * 0.12));
	const fontSize = Math.max(10, Math.min(height * 0.55, width * 0.4));

	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			{shape === 'trapezoid' ? (
				<path
					d={`M${pad} ${pad} 
              L${width - pad} ${pad} 
              L${width - inset} ${height - pad} 
              L${inset} ${height - pad} Z`}
					fill={trapezoidColor}
					stroke="black"
				/>
			) : (
				<rect
					x={pad}
					y={pad}
					width={width - pad * 2}
					height={height - pad * 2}
					fill={trapezoidColor}
					stroke="black"
				/>
			)}

			<text
				x={width / 2}
				y={height / 2}
				textAnchor="middle"
				dominantBaseline="middle"
				fontWeight={700}
				fontSize={fontSize}
				fill={textColor}
			>
				{text}
			</text>
		</svg>
	);
};

export default ShapeComponent;
