import styles from './styles.module.scss';
import cn from 'classnames';
import { FC } from 'react';

interface Props {
	color: 'blue' | 'yellow' | 'white';
	value: number;
	textTop?: string;
	textBottom?: string;
	textLeft?: string;
	textRight?: string;
	colorText?: 'black' | 'white';
	className?: string;
}

const Window: FC<Props> = ({
	color,
	value,
	textTop,
	textBottom,
	textLeft,
	textRight,
	colorText = 'black',
	className,
}) => {
	const fieldColor = cn(styles.window__field, className && className, {
		[styles.window__field_blue]: color === 'blue',
		[styles.window__field_yellow]: color === 'yellow',
		[styles.window__field_white]: color === 'white',
	});

	const text = cn(styles.window__text, {
		[styles.window__text_white]: colorText === 'white',
	});

	return (
		<div className={styles.window}>
			<div className={fieldColor}>
				{value && <span className={styles.window__value}>{value}</span>}
			</div>
			{textTop && (
				<span className={cn(text, styles.window__text_top)}>
					{textTop}
				</span>
			)}
			{textBottom && (
				<span className={cn(text, styles.window__text_bottom)}>
					{textBottom}
				</span>
			)}
			{textLeft && (
				<span className={cn(text, styles.window__text_left)}>
					{textLeft}
				</span>
			)}
			{textRight && (
				<span className={cn(text, styles.window__text_right)}>
					{textRight}
				</span>
			)}
		</div>
	);
};

export default Window;
