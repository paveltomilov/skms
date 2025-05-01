import { FC } from 'react';

interface Props {
	color?: 'black' | 'grey' | 'red';
	className?: string;
}

const ProbeWire: FC<Props> = ({ color = 'black', className }) => {
	return (
		<svg
			width={20}
			height={36}
			viewBox="0 0 20 36"
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				width="100%"
				height="100%"
				xlinkHref={`/svg/multimeter.svg#probe-${color}-wire`}
			/>
		</svg>
	);
};

export default ProbeWire;
