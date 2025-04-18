import { FC } from 'react';

interface Props {
	color?: 'black' | 'red';
	className?: string;
}

const Probe: FC<Props> = ({ color = 'black', className }) => {
	return (
		<svg
			width={30}
			height={91}
			viewBox="0 0 30 91"
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				width="100%"
				height="100%"
				xlinkHref={`/svg/sprite.svg#probe-${color}`}
			/>
		</svg>
	);
};

export default Probe;
