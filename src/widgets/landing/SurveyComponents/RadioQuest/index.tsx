'use client';
import { useCallback } from 'react';
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
	otherOptionLabel = 'Другое',
}) => {
	const findOptionByLabel = useCallback(
		(label: string) => options.find(opt => opt.label === label),
		[options],
	);

	const findOptionById = useCallback(
		(id: number) => options.find(opt => opt.id === id),
		[options],
	);

	const selectedOption = findOptionByLabel(selected);
	const selectedId = selectedOption?.id ?? null;

	const isOtherOption = useCallback(
		(id: number) => {
			const option = findOptionById(id);
			return option?.label === otherOptionLabel;
		},
		[findOptionById, otherOptionLabel],
	);

	const handleSelection = useCallback(
		(optionId: number) => {
			const option = findOptionById(optionId);
			if (!option) return;

			if (option.label !== otherOptionLabel) {
				setOtherText?.('');
			}

			setSelected?.(option.label);
		},
		[findOptionById, otherOptionLabel, setSelected, setOtherText],
	);

	const handleOtherTextChange = useCallback(
		(text: string) => {
			if (selectedId && isOtherOption(selectedId)) {
				setOtherText?.(text);
			}
		},
		[selectedId, isOtherOption, setOtherText],
	);

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
					const isOther = opt.label === otherOptionLabel;
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
										value={otherText}
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
