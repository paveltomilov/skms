import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';
import Icon from '../Icon';
import styles from './styles.module.scss';
import { Transform } from '@/shared/types/icon';

interface Props {
	size?: 'sm' | 'md';
	color?: 'white' | 'green';
	disable?: boolean;
	transform?: Transform;
}

const ArrowButton: FC<Props> = ({
	color = 'green',
	disable = false,
	transform,
}) => {
	const colors = ICON_COLOR[color];
	const transforms = transform && ICON_TRANSFORM[transform];
	return (
		<span className={styles.arrow}>
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
					xlinkHref={'/icons/sprite.svg#circle_arrow'}
					width="100%"
					height="100%"
				/>
			</svg>
			{disable && (
				<Icon
					className={styles.arrow__cross}
					name="close"
					size={{ width: 40, height: 40 }}
					color="red"
					strokeWidth={1}
				/>
			)}
		</span>
	);
};

export default ArrowButton;
