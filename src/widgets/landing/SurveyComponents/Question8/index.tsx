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
		label: 'Совсем не актуален',
	},
	{ id: 2, label: 'Скорее не актуален' },
	{ id: 3, label: 'Нейтрально' },
	{
		id: 4,
		label: 'Скорее актуален',
	},
	{ id: 5, label: 'Очень актуален' },
];

const Question8: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className={styles.question__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					Насколько для вас актуален формат практического обучения
					через&nbsp;симулятор (имитацию реальных ситуаций)?
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

export default Question8;
