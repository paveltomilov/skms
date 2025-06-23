import { FC, ReactNode } from 'react';

interface Props {
	className?: string;
	children: ReactNode;
}

const Switch: FC<Props> = ({ className, children }) => {
	return (
		<>
			<svg
				width={178}
				height={165}
				viewBox="0 0 178 165"
				preserveAspectRatio="xMidYMid meet"
				className={className && className}
			>
				<use
					width="100%"
					height="100%"
					xlinkHref={'/svg/switcher.svg#switch'}
				/>
			</svg>
			{children}
		</>
	);
};

export default Switch;
