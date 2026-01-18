'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import RadioCheck from '../check';
import RadioChecked from '../checked';

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
	const [currentIconIndex, setCurrentIconIndex] = useState(0);

	return (
		<div className={styles.question__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>Кем вы работаете?</h2>
			</header>
			<div className={styles.radio__group}>
				{OPTIONS.map((opt, index) => {
					const isOther = opt.id === 5 && selected === 5;

					return (
						<label key={opt.id} className={styles.custom__radio}>
							<input
								className={styles.custom__radio__input}
								type="radio"
								name="option"
								checked={selected === opt.id}
								onChange={() => {
									setSelected(opt.id);
									if (opt.id !== 5) setOtherText('');

									setCurrentIconIndex(index);
								}}
							/>

							<div className={styles.svg__container}>
								{selected === opt.id ? (
									<RadioCheck />
								) : (
									<RadioChecked />
								)}
							</div>

							{isOther ? (
								<input
									className={styles.input__other}
									type="text"
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
