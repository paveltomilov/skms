import { ICON_COLOR, ICON_TRANSFORM } from '@/shared/configs/icon';
import { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
	direction: 'toRight' | 'toLeft';
	state: 'on' | 'off';
	title?: string;
	className?: string;
}

const Tdm: FC<Props> = ({
	direction = 'toRight',
	state = 'on',
	title,
	className,
}) => {
	const transforms = direction === 'toRight' ? ICON_TRANSFORM['mirror'] : '';
	const colors =
		state === 'on' ? ICON_COLOR.electric_green : ICON_COLOR.white;
	return (
		<div className={`${styles.tdm} ${className && className}`}>
			{title && <span className={styles.tdm__title}>{title}</span>}
			<svg
				width="41"
				height="35"
				viewBox="0 0 41 35"
				color={colors}
				transform={transforms}
				preserveAspectRatio="xMidYMid meet"
			>
				<use
					xlinkHref={'/svg/sprite.svg#tdm'}
					width="100%"
					height="100%"
				/>
			</svg>
		</div>
	);
};

export default Tdm;
