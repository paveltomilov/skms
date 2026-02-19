'use client';
import { useCallback, useMemo } from 'react';
import RadioCheck from '../../IconSvg/radioCheck';
import RadioChecked from '../../IconSvg/radioChecked';
import { RadioQuestProps, Option } from '@/shared/types/question';
import styles from './styles.module.scss';

const RadioQuest: React.FC<RadioQuestProps<Option>> = ({
	options = [],
	selected = '',
	otherText = '',
	setSelected,
	setOtherText,
}) => {
	const otherOption = useMemo(
		() => options.find(opt => opt.isOther),
		[options],
	);

	const isOtherOption = useCallback(
		(id: number) => {
			return otherOption && id === otherOption.id;
		},
		[otherOption],
	);

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

	const handleSelection = useCallback(
		(optionId: number) => {
			const option = findOptionById(optionId);
			if (!option) return;

			if (!isOtherOption(optionId)) {
				setOtherText?.('');
			}

			setSelected?.(option.label);
		},
		[findOptionById, isOtherOption, setSelected, setOtherText],
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
					const isOther = Boolean(opt.isOther);
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
