import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props {
	className?: string;
	isBreak_end?: boolean;
}

const BreakLine: FC<Props> = ({ className, isBreak_end }) => {
	return (
		<svg
			preserveAspectRatio="xMidYMid meet"
			className={cn(className, styles.line, {
				[styles.line__isBreak_end]: isBreak_end,
			})}
		>
			<use xlinkHref={'/svg/sprite.svg#breakLine'} />
		</svg>
	);
};

export default BreakLine;
