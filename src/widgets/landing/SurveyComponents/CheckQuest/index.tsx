'use client';
import { useState } from 'react';
import Check from '../../IconSvg/check';
import Checked from '../../IconSvg/checked';
import styles from './styles.module.scss';

type Option = {
	id: number;
	label: string;
};

interface CheckQuestProps {
	options: Option[];
	maxSelections?: number;
	allowOther?: boolean;
	selectedIds?: number[];
	otherText?: string;
	onSelectionChange: (selectedIds: number[], otherText?: string) => void;
}

const CheckQuest: React.FC<CheckQuestProps> = ({
	options,
	maxSelections = 3,
	allowOther = true,
	selectedIds = [],
	otherText = '',
	onSelectionChange,
}) => {
	const [selectedOptions, setSelectedOptions] =
		useState<number[]>(selectedIds);
	const [currentOtherText, setCurrentOtherText] = useState<string>(otherText);

	const handleSelect = (id: number) => {
		let newSelected: number[];

		if (selectedOptions.includes(id)) {
			newSelected = selectedOptions.filter(item => item !== id);
		} else if (selectedOptions.length < maxSelections) {
			newSelected = [...selectedOptions, id];
		} else {
			return;
		}

		setSelectedOptions(newSelected);

		const otherOption = options.find(opt => opt.label === 'Другое');
		if (otherOption && id === otherOption.id && !newSelected.includes(id)) {
			setCurrentOtherText('');
			onSelectionChange(newSelected, '');
		} else {
			onSelectionChange(newSelected, currentOtherText);
		}
	};

	const handleOtherTextChange = (text: string) => {
		setCurrentOtherText(text);
		onSelectionChange(selectedOptions, text);
	};

	const maxReached = selectedOptions.length >= maxSelections;
	const otherOption = options.find(opt => opt.label === 'Другое');

	return (
		<div className={styles.question__container}>
			<div className={styles.radio__group}>
				{options.map(opt => {
					const isSelected = selectedOptions.includes(opt.id);
					const showOtherInput =
						allowOther &&
						otherOption &&
						opt.id === otherOption.id &&
						isSelected;
					const canToggle = isSelected || !maxReached;

					return (
						<label key={opt.id} className={styles.custom__radio}>
							<input
								className={styles.custom__radio__input}
								type="checkbox"
								checked={isSelected}
								disabled={!canToggle}
								onChange={() => handleSelect(opt.id)}
							/>
							<div className={styles.svg__container}>
								{isSelected ? (
									<Checked />
								) : (
									<Check
										disabled={!isSelected && maxReached}
									/>
								)}
							</div>
							{showOtherInput ? (
								<input
									className={styles.input__other}
									type="text"
									value={currentOtherText}
									onChange={e =>
										handleOtherTextChange(e.target.value)
									}
								/>
							) : (
								<span>{opt.label}</span>
							)}
						</label>
					);
				})}
			</div>
			{maxSelections > 1 && (
				<p className={styles.info__description}>
					* выберите не более трех вариантов
				</p>
			)}
		</div>
	);
};

export default CheckQuest;
