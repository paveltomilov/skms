import {
	ICON_COLOR,
	ICON_SIZE,
	TILDE_CROSS_ICON_SIZE,
} from '@/shared/configs/icon';
import { FC } from 'react';
import styles from './styles.module.scss';
import Close from '../Close';

interface Props {
	size?: 'sm' | 'md';
	color?: 'white' | 'green';
	disable?: boolean;
	className?: string;
}

const Tilde: FC<Props> = ({
	size = 'sm',
	color = 'green',
	disable = false,
	className,
}) => {
	const colors = ICON_COLOR[color];
	const sizes = ICON_SIZE[size];
	const isSmall = size === 'sm';
	const crossSize = TILDE_CROSS_ICON_SIZE[isSmall ? 'small' : 'big'];
	return (
		<span className={`${styles.tilde} ${className && className}`}>
			<svg
				width={sizes.width}
				height={sizes.height}
				viewBox={sizes.viewBox}
				fill={colors}
				color={colors}
				preserveAspectRatio="xMidYMid meet"
			>
				<use
					xlinkHref={'/svg/sprite.svg#tilde'}
					width="100%"
					height="100%"
				/>
			</svg>
			{disable && (
				<Close
					className={`${styles.tilde__cross} ${
						isSmall && styles.tilde__cross_small
					}`}
					size={crossSize}
					color="red"
					strokeWidth={1}
				/>
			)}
		</span>
	);
};

export default Tilde;
