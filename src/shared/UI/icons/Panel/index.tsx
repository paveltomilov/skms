import { FC, ReactNode } from 'react';

interface Props {
	className?: string;
	children: ReactNode;
}

const Panel: FC<Props> = ({ className, children }) => {
	return (
		<>
			<svg
				width={226}
				height={228}
				viewBox="0 0 226 228"
				preserveAspectRatio="xMidYMid meet"
				className={className && className}
			>
				<use
					width="100%"
					height="100%"
					xlinkHref={'/svg/multimeter.svg#panel'}
				/>
			</svg>
			{children}
		</>
	);
};

export default Panel;
