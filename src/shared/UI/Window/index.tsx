import styles from './styles.module.scss';
import cn from 'classnames';
import { FC } from 'react';

interface Props {
	color: 'blue' | 'yellow' | 'white';
	value: string;
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
	const fieldColor = cn(styles.field, className && className, {
		[styles.field_blue]: color === 'blue',
		[styles.field_yellow]: color === 'yellow',
		[styles.field_white]: color === 'white',
	});

	const text = cn(styles.text, {
		[styles.text_white]: colorText === 'white',
	});

	return (
		<>
			<div className={fieldColor}>{value && <span>{value}</span>}</div>
			{textTop && (
				<span className={cn(text, styles.text_top)}>{textTop}</span>
			)}
			{textBottom && (
				<span className={cn(text, styles.text_bottom)}>
					{textBottom}
				</span>
			)}
			{textLeft && (
				<span className={cn(text, styles.text_left)}>{textLeft}</span>
			)}
			{textRight && (
				<span className={cn(text, styles.text_right)}>{textRight}</span>
			)}
		</>
	);
};

export default Window;
