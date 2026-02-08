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
}) => {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [currentOtherText, setCurrentOtherText] = useState<string>(otherText);

	useEffect(() => {
		if (selected && options.length > 0) {
			const foundOption = options.find(opt => opt.label === selected);
			if (foundOption) {
				setSelectedId(foundOption.id);
			} else {
				setSelectedId(null);
			}
		} else {
			setSelectedId(null);
		}
	}, [selected, options]);

	useEffect(() => {
		setCurrentOtherText(otherText);
	}, [otherText]);

	const findOptionById = (id: number) => options.find(opt => opt.id === id);
	const isOtherOption = (id: number) => {
		const option = findOptionById(id);
		return option?.label === 'Другое';
	};

	const handleSelection = (optionId: number) => {
		const option = findOptionById(optionId);
		if (!option) return;

		setSelectedId(optionId);

		if (option.label !== 'Другое') {
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
			if (setOtherText) {
				setOtherText(text);
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
					const isSelected = selectedId === opt.id;
					const isOther = isOtherOption(opt.id);
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
