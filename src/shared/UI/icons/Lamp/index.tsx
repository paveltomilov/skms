import { FC } from 'react';

interface Props {
	className?: string;
}

const Lamp: FC<Props> = ({ className }) => {
	return (
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#error'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Lamp;
