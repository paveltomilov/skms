import Accept from '@/shared/UI/icons/Accept';
import style from './styles.module.scss';

interface CheckboxProps {
	id: string,
	value: string | number,
	name: string,
	disabled?: boolean;
}

export const Checkbox = ({id,value,name, disabled} : CheckboxProps) => {
	return (
		<div className={style.checkbox}>
			<input className={style.input} type="checkbox" id={id} value={value} name={name} disabled={disabled}/>
			<label  className={style.label} htmlFor={id}>
				<Accept />
            </label>
		</div>
	);
};
