import { getTubFill } from '@/shared/utils/getTubFill/getTubFill';
import styles from './styles.module.scss';
import { FC } from 'react';
import cn from 'classnames';
import Window from '../Window';

interface Props {
	color: 'blue' | 'yellow';
	value1: number;
	value2: number;
	minValue: number;
	maxValue: number;
	className?: string;
}

const WindowCircleCard: FC<Props> = ({
	color,
	value1,
	value2,
	minValue = 0,
	maxValue = 100,
	className,
}) => {
	// Создаём градиент по value1, где заполненная часть - это цвет, а остальное - прозрачное
	const backgroundStyle = {
		background: getTubFill(color, value1, minValue, maxValue),
	};

	const window = cn(styles.window, className && className);

	return (
		<div className={window} style={backgroundStyle}>
			<Window color={color} value={value1} textRight="MM" />
			<Window color={color} value={value2} textRight="MM" />
		</div>
	);
};

export default WindowCircleCard;
