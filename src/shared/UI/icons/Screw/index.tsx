import { ICON_SIZE } from '@/shared/configs/icon';
import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	status?: 'close' | 'open';
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	isProbeOver?: boolean;
	onClick: () => void;
}

const Screw: FC<Props> = ({
	className,
	status = 'close',
	textRight,
	textTop,
	textLeft,
	isProbeOver = false,
	onClick,
}) => {
	const sizes = ICON_SIZE.sm;

	return (
		<div
			className={cn(styles.wrapper, className, {
				[styles.wrapperProbeOver]: isProbeOver,
			})}
		>
			{textTop && <span className={styles.top}>{textTop}</span>}
			{textLeft && <span className={styles.left}>{textLeft}</span>}
			<svg
				onClick={onClick}
				width={sizes.width}
				height={sizes.height}
				viewBox={sizes.viewBox}
				className={cn(styles.icon, {
					[styles.icon_open]: status === 'open',
				})}
			>
				<use
					xlinkHref="/svg/sprite.svg#screw"
					width="100%"
					height="100%"
				/>
			</svg>
			{textRight && <span className={styles.right}>{textRight}</span>}
		</div>
	);
};

export default Screw;
