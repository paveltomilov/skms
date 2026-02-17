'use client';
import { useState, useEffect } from 'react';
import RadioCheck from '../../IconSvg/radioCheck';
import RadioChecked from '../../IconSvg/radioChecked';
import { RadioQuestProps } from '@/shared/types/question';
import styles from './styles.module.scss';

const RadioQuest: React.FC<RadioQuestProps> = ({
	options = [],
	selected = '',
	otherText = '',
	setSelected,
	setOtherText,
	otherOptionLabel,
}) => {
	const [currentOtherText, setCurrentOtherText] = useState<string>(otherText);

	useEffect(() => {
		setCurrentOtherText(otherText);
	}, [otherText]);

	const findOptionByLabel = (label: string) =>
		options.find(opt => opt.label === label);
	const findOptionById = (id: number) => options.find(opt => opt.id === id);

	const selectedOption = findOptionByLabel(selected);
	const selectedId = selectedOption?.id ?? null;

	const isOtherOption = (id: number) => {
		const option = findOptionById(id);
		return option?.label === otherOptionLabel;
	};

	const handleSelection = (optionId: number) => {
		const option = findOptionById(optionId);
		if (!option) return;

		if (option.label !== otherOptionLabel) {
			setCurrentOtherText('');
			if (setOtherText) {
				setOtherText('');
			}
		}

		if (setSelected) {
			setSelected(option.label);
		}
	};

	const handleOtherTextChange = (text: string) => {
		setCurrentOtherText(text);

		if (selectedId && isOtherOption(selectedId)) {
			setOtherText?.(text);
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
					const isSelected = selectedId === opt.id;
					const isOther = opt.label === 'Другое';
					const isOtherSelected = isOther && isSelected;

					return (
						<label
							key={opt.id}
							className={`${styles.custom__radio} ${isOther ? styles.other__option : ''} ${isOtherSelected ? styles.other__selected : ''}`}
						>
							<input
								className={styles.custom__radio_input}
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
