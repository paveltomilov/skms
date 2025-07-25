import { getTubFill } from '@/shared/utils/getTubFill/getTubFill';
import styles from './styles.module.scss';
import { FC } from 'react';
import cn from 'classnames';
import Window from '../Window';

interface Props {
	color: 'blue' | 'yellow' | 'red';
	size?: 'sm' | 'lg';
	title: string;
	value: number;
	minValue: number;
	maxValue: number;
	className?: string;
}

const WindowRectCard: FC<Props> = ({
	color,
	value,
	minValue = 0,
	maxValue = 100,
	title,
	size = 'sm',
	className,
}) => {
	// Создаём градиент, где заполненная часть - это цвет, а остальное - прозрачное
	const backgroundStyle = {
		background: getTubFill(color, value, minValue, maxValue),
	};

	const window = cn(styles.window, className && className, {
		[styles.window_short]: size === 'sm',
		[styles.window_long]: size === 'lg',
	});

	return (
		<div className={window} style={backgroundStyle}>
			<Window
				color={color === 'red' ? 'blue' : color}
				value={value}
				textRight="MM"
			/>
			<span className={styles.window__title}>{title}</span>
		</div>
	);
};

export default WindowRectCard;
