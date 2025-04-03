import { FC } from 'react';

interface Props {
	className?: string;
}

const Fire: FC<Props> = ({ className }) => {
	return (
		<svg
			width="52"
			height="36"
			viewBox="0 0 52 36"
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#fire'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Fire;
