'use client';
import { useState } from 'react';
import styles from './styles.module.scss';
import RadioCheck from '../../IconSvg/radioCheck';
import RadioChecked from '../../IconSvg/radioChecked';

type Option = {
	id: number;
	label: string;
};

interface RadioQuestProps {
	options?: Option[];
	selectedValue?: string | null;
	otherText?: string;
	onChange?: (selectedLabel: string, otherText?: string) => void;
}

const RadioQuest: React.FC<RadioQuestProps> = ({
	options = [],
	selectedValue = null,
	otherText = '',
	onChange,
}) => {
	const [selected, setSelected] = useState<number | null>(() => {
		if (selectedValue && options.length > 0) {
			const foundOption = options.find(
				opt => opt.label === selectedValue,
			);
			return foundOption ? foundOption.id : null;
		}
		return null;
	});

	const [currentOtherText, setCurrentOtherText] = useState<string>(otherText);
	const findOptionById = (id: number) => options.find(opt => opt.id === id);
	const isOtherOption = (id: number) => {
		const option = findOptionById(id);
		return option?.label === 'Другое';
	};

	const handleSelection = (optionId: number) => {
		const option = findOptionById(optionId);
		if (!option) return;

		setSelected(optionId);

		if (option.label !== 'Другое') {
			setCurrentOtherText('');
		}

		if (onChange) {
			if (option.label === 'Другое') {
				onChange(option.label, currentOtherText);
			} else {
				onChange(option.label, '');
			}
		}
	};

	const handleOtherTextChange = (text: string) => {
		setCurrentOtherText(text);
		if (onChange && selected) {
			const option = findOptionById(selected);
			if (option?.label === 'Другое') {
				onChange(option.label, text);
			}
		}
	};

	if (options.length === 0) {
		return (
			<div className={styles.question__container}>
				<div className={styles.radio__group}></div>
			</div>
		);
	}

	return (
		<div className={styles.question__container}>
			<div className={styles.radio__group}>
				{options.map(opt => {
					const isSelected = selected === opt.id;
					// ИСПРАВЛЯЕМ ЭТУ СТРОКУ:
					// Теперь проверяем только является ли вариант "Другим"
					const isOther = isOtherOption(opt.id);
					// А это проверяем отдельно - выбран ли он
					const isOtherSelected = isOther && isSelected;

					return (
						// Добавляем особый класс для варианта "Другое"
						<label
							key={opt.id}
							className={`${styles.custom__radio} ${isOther ? styles.other__option : ''} ${isOtherSelected ? styles.other__selected : ''}`}
						>
							<input
								className={styles.custom__radio__input}
								type="radio"
								name="option"
								checked={isSelected}
								onChange={() => handleSelection(opt.id)}
							/>

							<div className={styles.svg__container}>
								{isSelected ? <RadioCheck /> : <RadioChecked />}
							</div>

							{isOtherSelected ? (
								<div className={styles.other__container}>
									<input
										className={styles.input__other}
										type="text"
										value={currentOtherText}
										onChange={e =>
											handleOtherTextChange(
												e.target.value,
											)
										}
										autoFocus
									/>
								</div>
							) : (
								<span
									className={
										isOther ? styles.other__label : ''
									}
								>
									{opt.label}
								</span>
							)}
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default RadioQuest;
