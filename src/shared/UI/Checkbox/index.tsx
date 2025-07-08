import Accept from '@/shared/UI/icons/Accept';
import style from './styles.module.scss';
import { CHECKBOX_SIZE, CheckboxSize } from '@/shared/types/checkbox';
import { FC } from 'react';

interface CheckboxProps {
	size?:  keyof Pick<CheckboxSize, 'sm' | 'lg'>;
	id: string,
	name: string,
	disabled?: boolean;
	checked?: boolean;
	text?: string;
}

export const Checkbox: FC<CheckboxProps> = ({id,name, disabled, checked,size = 'lg',text}) => {
	const sizes = CHECKBOX_SIZE[size];

	return (
		<div className={style.checkbox}>
			<input className={style.input} type="checkbox" id={id} name={name} disabled={disabled} checked={checked}/>
			<label  className={style.label} htmlFor={id} style={{'--width': `${sizes.width}px`, '--height': `${sizes.height}px`} as React.CSSProperties}>
				<Accept size={sizes.iconSize}/>
				<p className={style.text}>{text}</p>
            </label>
		</div>
	);
};
