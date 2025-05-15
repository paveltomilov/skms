import { FC } from 'react';

interface Props {
	color?: 'black' | 'red';
	className?: string;
}

const Probe: FC<Props> = ({ color = 'black', className }) => {
	return (
		<svg
			width={17}
			height={78}
			viewBox="0 0 17 78"
			preserveAspectRatio="xMidYMid meet"
			shapeRendering="geometricPrecision"
			filter="drop-shadow(2px 2px 2px #00000057)"
			className={className && className}
		>
			<use
				width="100%"
				height="100%"
				xlinkHref={`/svg/multimeter.svg#probe-${color}`}
			/>
		</svg>
	);
};

export default Probe;
