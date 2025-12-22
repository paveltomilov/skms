'use client';

import { ChangeEvent } from 'react';
import styles from './styles.module.scss';

interface ConsentProps {
	value: boolean;
	onChange: (checked: boolean) => void;
}

const ConsentCheckbox = ({ value, onChange }: ConsentProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.checked);
	};

	return (
		<div className={styles.checkbox}>
			<input
				className={styles.checkbox__input}
				id="consent"
				type="checkbox"
				checked={value}
				onChange={handleChange}
			/>
			<label htmlFor="consent" className={styles.checkbox__descr}>
				Я даю согласие на обработку&nbsp;
				<span className={styles.checkbox__descr__span}>
					персональных данных
				</span>
			</label>
		</div>
	);
};

export default ConsentCheckbox;
