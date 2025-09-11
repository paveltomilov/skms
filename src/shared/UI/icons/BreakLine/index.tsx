import { FC } from 'react';

interface Props {
	className?: string;
}

const BreakLine: FC<Props> = ({ className }) => {
	return (
		<svg
			style={{ width: '56px', height: '10px' }}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use xlinkHref={'/svg/sprite.svg#breakLine'} />
		</svg>
	);
};

export default BreakLine;
