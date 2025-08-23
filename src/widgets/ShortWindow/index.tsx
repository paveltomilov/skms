import { FC } from 'react';
import Window from '@/shared/UI/Window';
import { Prefix, UnitsMeasurement } from '@/shared/types/window';

interface IWindowData {
	currentValue: number;
	minValue: number;
	maxValue: number;
	unitsMeasurement: UnitsMeasurement;
}

interface renderWindowComponents {
	data: IWindowData;
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

const ShortWindow: FC<renderWindowComponents> = ({
	data,
	className = '',
	top = false,
	right = false,
	bottom = false,
	left = false,
	textTop,
	textBottom,
	textLeft,
	textRight,
}) => (
	<Window
		textRight={
			right ? (textRight ? textRight : data.unitsMeasurement) : undefined
		}
		textBottom={
			bottom
				? textBottom
					? textBottom
					: data.unitsMeasurement
				: undefined
		}
		textLeft={
			left ? (textLeft ? textLeft : data.unitsMeasurement) : undefined
		}
		textTop={top ? (textTop ? textTop : data.unitsMeasurement) : undefined}
		className={`${className}`}
		value={data.currentValue}
		color={'blue'}
	/>
);
export default ShortWindow;
