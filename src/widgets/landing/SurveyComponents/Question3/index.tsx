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
	{
		id: 1,
		label: 'Наставничество на рабочем месте (обучение под руководством более опытного сотрудника или инструктора)',
	},
	{ id: 2, label: 'Учебные центры' },
	{ id: 3, label: 'Самостоятельно через практику' },
	{
		id: 4,
		label: 'Видео-уроки / вебинары',
	},
	{ id: 5, label: 'Теоретические материалы (PDF, инструкции, презентации)' },
	{ id: 6, label: 'Цифровые симуляторы / тренажёры' },
	{ id: 7, label: 'Другое' },
];

const Question3: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

	const handleSelect = (id: number) => {
		if (selectedOptions.includes(id)) {
			setSelectedOptions(prev => prev.filter(item => item !== id));
		} else if (selectedOptions.length < 3) {
			setSelectedOptions(prev => [...prev, id]);
		}
	};

	return (
		<div className={styles.question__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					Какие форматы обучения используются на&nbsp;вашем
					предприятии&nbsp;&mdash; как для новых сотрудников, так
					и&nbsp;для действующего персонала?
				</h2>
			</header>
			<div className={styles.radio__group}>
				{OPTIONS.map(opt => {
					return (
						<label key={opt.id} className={styles.custom__radio}>
							<input
								className={styles.custom__radio__input}
								type="checkbox"
								name="option"
								checked={selectedOptions.includes(opt.id)}
								onChange={() => handleSelect(opt.id)}
							/>
							<div className={styles.svg__container}>
								{selectedOptions.includes(opt.id) ? (
									<RadioCheck />
								) : (
									<RadioChecked />
								)}
							</div>

							<span>{opt.label}</span>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default Question3;
