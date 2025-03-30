import { ICON_TRANSFORM } from '@/shared/configs/icon';
import { IconTransform, SingleDigitNumber } from '@/shared/types/icon';
import styles from './styles.module.scss';
import { FC } from 'react';

interface Props {
	transform?: keyof Pick<IconTransform, 'mirror'>;
	index?: SingleDigitNumber;
	className?: string;
}

const Pump: FC<Props> = ({ transform, index, className }) => {
	const transforms = transform && ICON_TRANSFORM[transform];
	const isTransform = transform === 'mirror';
	return (
		<span className={styles.pump}>
			<svg
				width="41"
				height="35"
				viewBox="0 0 41 35"
				transform={transforms}
				preserveAspectRatio="xMidYMid meet"
				className={className && className}
			>
				<use
					xlinkHref={'/svg/sprite.svg#pump'}
					width="100%"
					height="100%"
				/>
			</svg>
			{index && (
				<span
					className={`${styles.pump__number} ${
						isTransform && styles.pump__number_transformed
					}`}
				>
					{index}
				</span>
			)}
		</span>
	);
};

export default Pump;
