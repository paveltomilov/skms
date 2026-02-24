'use client';

import { ChangeEvent } from 'react';
import styles from './styles.module.scss';
import Checked from '../../IconSvg/checked';
import Check from '../../IconSvg/check';

interface ConsentProps {
	value: boolean;
	onChange: (checked: boolean) => void;
}

const ConsentSurvey = ({ value, onChange }: ConsentProps) => {
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
			<label htmlFor="consent" className={styles.checkbox__svg}>
				{value ? (
					<Checked size={20} />
				) : (
					<Check size={20} disabled={false} />
				)}
			</label>
			<label htmlFor="consent" className={styles.checkbox__descr}>
				Я согласен(а) на&nbsp;
				<span className={styles.checkbox__descr_span}>
					обработку персональных данных
				</span>
			</label>
		</div>
	);
};

export default ConsentSurvey;
