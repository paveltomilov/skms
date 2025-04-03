import { FC } from 'react';

interface Props {
	className?: string;
}

const Success: FC<Props> = ({ className }) => {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 28 28"
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#success'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Success;
