import { ICON_SIZE } from '@/shared/configs/icon';
import { Dispatch, FC, SetStateAction } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MarkerName } from '@/shared/types/markers';

interface Props {
	className?: string;
	isOpen?: boolean;
	textRight?: MarkerName;
	textTop?: MarkerName;
	textLeft?: MarkerName;
	onClick: Dispatch<SetStateAction<boolean>>;
}

const Screw: FC<Props> = ({
	className,
	isOpen = false,
	textRight,
	textTop,
	textLeft,
	onClick,
}) => {
	const sizes = ICON_SIZE.sm;

	return (
		<div className={cn(styles.wrapper, className)}>
			{textTop && <span className={styles.top}>{textTop}</span>}
			{textLeft && <span className={styles.left}>{textLeft}</span>}
			<svg
				onClick={() => onClick(p => !p)}
				width={sizes.width}
				height={sizes.height}
				viewBox={sizes.viewBox}
				className={cn(styles.icon, { [styles.icon_open]: isOpen })}
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
