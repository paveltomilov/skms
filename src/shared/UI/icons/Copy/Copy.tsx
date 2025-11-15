import { FC } from 'react';

interface Props {
	className?: string;
}

const Copy: FC<Props> = ({ className }) => {
	return (
		<svg
			width={20}
			height={20}
			preserveAspectRatio="xMidYMid meet"
			className={className && className}
		>
			<use
				xlinkHref={'/svg/sprite.svg#iconCopy'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Copy;
