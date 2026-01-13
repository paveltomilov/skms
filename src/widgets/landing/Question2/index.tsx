'use client';
import { useState } from 'react';
import styles from './styles.module.scss';

type Option = {
	id: number;
	label: string;
};

const OPTIONS: Option[] = [
	{
		id: 1,
		label: 'Регулярно — несколько раз в год (плановое, повторное обучение)',
	},
	{ id: 2, label: 'Один раз в год' },
	{ id: 3, label: 'Только при приеме новых сотрудников' },
	{
		id: 4,
		label: 'При необходимости — когда появляются изменения в оборудовании или технологиях',
	},
	{ id: 5, label: 'Обучение проводится редко и формально' },
	{ id: 6, label: 'Затрудняюсь ответить' },
];

const Question2: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<div className={styles.checkbox__container}>
			<header className={styles.header__container}>
				<h2>
					Как часто на вашем предприятии проводится обучение
					сотрудников (по профессиональным навыкам, охране труда,
					технике безопасности и другим направлениям)?
				</h2>
			</header>
			<div className={styles.radioGroup}>
				{OPTIONS.map(opt => {
					return (
						<label key={opt.id} className={styles.customRadio}>
							<input
								className={styles.hiddenRadio}
								type="radio"
								name="option"
								checked={selected === opt.id}
								onChange={() => {
									setSelected(opt.id);
								}}
							/>
							<span className={styles.indicator} />

							<span>{opt.label}</span>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default Question2;
