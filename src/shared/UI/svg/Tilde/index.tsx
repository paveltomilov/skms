import { ICON_COLOR, ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';
import Icon from '../Icon';
import styles from './styles.module.scss';

interface Props {
	size?: 'sm' | 'md';
	color?: 'white' | 'green';
	disable?: boolean;
}

const Tilde: FC<Props> = ({
	size = 'sm',
	color = 'green',
	disable = false,
}) => {
	const colors = ICON_COLOR[color];
	const sizes = ICON_SIZE[size];
	const isSmall = size === 'sm';
	const crossSize = isSmall
		? { width: 22, height: 22 }
		: { width: 30, height: 30 };
	return (
		<span className={styles.tilde}>
			<svg
				width={sizes.width}
				height={sizes.height}
				viewBox={sizes.viewBox}
				fill={colors}
				color={colors}
				preserveAspectRatio="xMidYMid meet"
			>
				<use
					xlinkHref={'/icons/sprite.svg#tilde'}
					width="100%"
					height="100%"
				/>
			</svg>
			{disable && (
				<Icon
					className={`${styles.tilde__cross} ${
						isSmall && styles.tilde__cross_small
					}`}
					name="close"
					size={crossSize}
					color="red"
					strokeWidth={1}
				/>
			)}
		</span>
	);
};

export default Tilde;
