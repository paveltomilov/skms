import { Prefix, UnitsMeasurement } from '@/shared/types/window';
import styles from './styles.module.scss';
import cn from 'classnames';
import { FC } from 'react';
import { IWindow } from '@/shared/configs/window';


interface Props {
	data: IWindow;
	color?: 'blue' | 'yellow' | 'transparent';
	colorText?: 'black' | 'white';
	className?: string;
	top?: boolean;
	bottom?: boolean;
	left?: boolean;
	right?: boolean;
	textTop?: UnitsMeasurement | Prefix;
	textBottom?: UnitsMeasurement | Prefix;
	textLeft?: UnitsMeasurement | Prefix;
	textRight?: UnitsMeasurement | Prefix;
}

const Window: FC<Props> = ({
	data,
	color = 'blue',
	className,
	colorText = 'black',
	top = false,
	right = false,
	bottom = false,
	left = false,
	textTop = data.unitsMeasurement,
	textBottom = data.unitsMeasurement,
	textLeft = data.unitsMeasurement,
	textRight = data.unitsMeasurement,
}) => {
	const fieldColor = cn(styles.window__field, {
		[styles.window__field_blue]: color === 'blue',
		[styles.window__field_yellow]: color === 'yellow',
		[styles.window__field_transparent]: color === 'transparent',
	});

	const text = cn(styles.window__text, {
		[styles.window__text_white]: colorText === 'white',
	});

	return (
		<div className={`${styles.window} ${className && className}`}>
			<div className={fieldColor}>
				{data && <span className={styles.window__value}>{data.currentValue}</span>}
			</div>
			{top && (
				<span className={cn(text, styles.window__text_top)}>
					{textTop}
				</span>
			)}
			{bottom && (
				<span className={cn(text, styles.window__text_bottom)}>
					{textBottom}
				</span>
			)}
			{left && (
				<span className={cn(text, styles.window__text_left)}>
					{textLeft}
				</span>
			)}
			{right && (
				<span className={cn(text, styles.window__text_right)}>
					{textRight}
				</span>
			)}
		</div>
	);
};

export default Window;
