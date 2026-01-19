'use client';
import { useState } from 'react';
import Check from '../check';
import Checked from '../checked';
import styles from './styles.module.scss';

type Option = {
	id: number;
	label: string;
};

const OPTIONS: Option[] = [
	{
		id: 1,
		label: 'Отработка аварийных ситуаций / внештатных режимов',
	},
	{
		id: 2,
		label: 'Доведение навыков до автоматизма, формирование привычки безопасности',
	},
	{ id: 3, label: 'Диагностика и устранение неисправностей' },
	{
		id: 4,
		label: 'Пуск / остановка оборудования',
	},
	{ id: 5, label: 'Работа с интерфейсом / ПТК' },
	{ id: 6, label: 'Другое' },
];

const Question9: React.FC = () => {
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
	const [otherText, setOtherText] = useState<string>('');

	const handleSelect = (id: number) => {
		if (selectedOptions.includes(id)) {
			setSelectedOptions(prev => prev.filter(item => item !== id));
			if (id === 6) setOtherText('');
			return;
		}

		if (selectedOptions.length < 3) {
			setSelectedOptions(prev => [...prev, id]);
		}
	};

	const maxReached = selectedOptions.length >= 3;

	return (
		<div className={styles.question__container}>
			<header className={styles.header__container}>
				<h2 className={styles.header__title}>
					Какие навыки или ситуации, по вашему мнению,
					нуждаются&nbsp;в&nbsp;тренировке&nbsp;в&nbsp;первую очередь?
				</h2>
			</header>
			<div className={styles.radio__group}>
				{OPTIONS.map(opt => {
					const isSelected = selectedOptions.includes(opt.id);
					const showOtherInput = opt.id === 6 && isSelected;
					const canToggle = !isSelected || !maxReached;

					return (
						<label key={opt.id} className={styles.custom__radio}>
							<input
								className={styles.custom__radio__input}
								type="checkbox"
								name="option"
								checked={isSelected}
								disabled={!canToggle}
								onChange={() => handleSelect(opt.id)}
							/>
							<div className={styles.svg__container}>
								{isSelected ? (
									<Checked />
								) : (
									<Check disabled={maxReached} />
								)}
							</div>
							{showOtherInput ? (
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
				<p className={styles.info__descrition}>
					* выберите не более трех вариантов
				</p>
			</div>
		</div>
	);
};

export default Question9;
