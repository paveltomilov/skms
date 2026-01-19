'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import RadioCheck from '../radioCheck';
import RadioChecked from '../radioChecked';

type Option = {
	id: number;
	label: string;
};

const OPTIONS: Option[] = [
	{
		id: 1,
		label: 'Совсем не важно',
	},
	{ id: 2, label: 'Скорее не важно' },
	{ id: 3, label: 'Нейтрально' },
	{
		id: 4,
		label: 'Скорее важно',
	},
	{ id: 5, label: 'Очень важно' },
];

const Question7: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className={styles.question__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					Насколько для вас важно, чтобы теоретическая часть
					обучения&nbsp;(курсы, тесты, документы) была доступна
					в&nbsp;цифровом&nbsp;виде?
				</h2>
			</header>
			<div className={styles.radio__group}>
				{OPTIONS.map(opt => {
					return (
						<label key={opt.id} className={styles.custom__radio}>
							<input
								className={styles.custom__radio__input}
								type="radio"
								name="option"
								checked={selected === opt.id}
								onChange={() => {
									setSelected(opt.id);
								}}
							/>
							<div className={styles.svg__container}>
								{selected === opt.id ? (
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

export default Question7;
