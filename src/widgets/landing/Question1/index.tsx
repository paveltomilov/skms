'use client';
import { useState } from 'react';
import styles from './styles.module.scss';

type Option = {
	id: number;
	label: string;
};

const OPTIONS: Option[] = [
	{ id: 1, label: 'Руководитель / Начальник смены / Мастер' },
	{ id: 2, label: 'Специалист по обучению / Преподаватель / Инструктор' },
	{ id: 3, label: 'Инженер / Специалист по эксплуатации оборудования' },
	{ id: 4, label: 'Студент / Практикант' },
	{ id: 5, label: 'Другое' },
];

const Question1: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);
	const [otherText, setOtherText] = useState<string>('');

	return (
		<div className={styles.checkbox__container}>
			<header className={styles.header__container}>
				<h2>Кем вы работаете?</h2>
			</header>
			<div className={styles.radioGroup}>
				{OPTIONS.map(opt => {
					const isOther = opt.id === 5 && selected === 5;

					return (
						<label key={opt.id} className={styles.customRadio}>
							<input
								className={styles.hiddenRadio}
								type="radio"
								name="option"
								checked={selected === opt.id}
								onChange={() => {
									setSelected(opt.id);
									if (opt.id !== 5) setOtherText('');
								}}
							/>
							<span className={styles.indicator} />

							{isOther ? (
								<input
									type="text"
									placeholder="Укажите, пожалуйста..."
									value={otherText}
									onChange={e => setOtherText(e.target.value)}
								/>
							) : (
								<span>{opt.label}</span>
							)}
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default Question1;
