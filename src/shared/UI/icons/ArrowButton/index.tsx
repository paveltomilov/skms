import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';
import styles from './styles.module.scss';
import { IconColor, IconSize, IconTransform } from '@/shared/types/icon';
import Close from '../Close';

interface Props {
	size?: keyof Pick<IconSize, 'sm' | 'md'>;
	color?: keyof Pick<IconColor, 'white' | 'green'>;
	disable?: boolean;
	transform?: keyof Omit<IconTransform, 'mirror'>;
	className?: string;
}

const ArrowButton: FC<Props> = ({
	color = 'green',
	disable = false,
	transform,
	className,
}) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<span className={`${styles.arrow}  ${className && className}`}>
			<svg
				width="36"
				height="36"
				viewBox="0 0 36 36"
				fill={colors}
				color={colors}
				transform={transforms}
				preserveAspectRatio="xMidYMid meet"
			>
				<use
					xlinkHref={'/svg/sprite.svg#circle_arrow'}
					width="100%"
					height="100%"
				/>
			</svg>
			{disable && (
				<Close
					className={styles.arrow__cross}
					size={{ width: 40, height: 40 }}
					color="red"
					strokeWidth={1}
				/>
			)}
		</span>
	);
};

export default ArrowButton;
