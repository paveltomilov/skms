import { FC, ReactNode } from 'react';
interface Props {
	className?: string;
	children: ReactNode;
}

const ProbeHolder: FC<Props> = ({ className, children }) => {
	return (
		<>
			<svg
				width={15}
				height={15}
				viewBox="0 0 15 15"
				preserveAspectRatio="xMidYMid meet"
				className={className && className}
			>
				<use
					width="100%"
					height="100%"
					xlinkHref={'/svg/sprite.svg#probe-holder'}
				/>
			</svg>
			{children}
		</>
	);
};

export default ProbeHolder;
