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
	selectedIds?: number[];
	otherText?: string;
	onSelectionChange: (selectedIds: number[], otherText?: string) => void;
}

const CheckQuest: React.FC<CheckQuestProps> = ({
	options,
	maxSelections = 3,
	selectedIds = [],
	otherText = '',
	onSelectionChange,
}) => {
	const [selectedOptions, setSelectedOptions] =
		useState<number[]>(selectedIds);
	const [currentOtherText, setCurrentOtherText] = useState<string>(otherText);

	// Состояние для вариантов, для которых нужно показать иконку "i"
	const [showInfoIconForId, setShowInfoIconForId] = useState<number | null>(
		null,
	);
	// Состояние для показа тултипа при наведении на иконку
	const [showTooltipForId, setShowTooltipForId] = useState<number | null>(
		null,
	);

	const otherOption = options.find(opt => opt.label === 'Другое');

	const isOtherOption = (id: number) => {
		return otherOption && id === otherOption.id;
	};

	const maxReached = selectedOptions.length >= maxSelections;

	const handleSelect = (id: number) => {
		let newSelected: number[];

		if (selectedOptions.includes(id)) {
			// Убираем вариант
			newSelected = selectedOptions.filter(item => item !== id);
			setSelectedOptions(newSelected);

			// Если убираем вариант "Другое", очищаем текстовое поле
			if (isOtherOption(id)) {
				setCurrentOtherText('');
				onSelectionChange(newSelected, '');
			} else {
				onSelectionChange(newSelected, currentOtherText);
			}

			// Скрываем иконку "i" при отмене выбора
			setShowInfoIconForId(null);
			setShowTooltipForId(null);
		} else if (selectedOptions.length < maxSelections) {
			// Добавляем вариант
			newSelected = [...selectedOptions, id];
			setSelectedOptions(newSelected);
			onSelectionChange(newSelected, currentOtherText);

			// Скрываем иконку "i" при успешном выборе
			setShowInfoIconForId(null);
			setShowTooltipForId(null);
		} else {
			// Лимит достигнут - показываем иконку "i" для этого варианта
			setShowInfoIconForId(id);

			// Не показываем тултип сразу, только иконку
			// Тултип появится при наведении на иконку
			return;
		}
	};

	const handleOtherTextChange = (text: string) => {
		setCurrentOtherText(text);
		onSelectionChange(selectedOptions, text);
	};

	// Обработчики для показа/скрытия тултипа при наведении на иконку
	const handleInfoMouseEnter = (id: number, e: React.MouseEvent) => {
		e.stopPropagation();
		if (showInfoIconForId === id) {
			setShowTooltipForId(id);
		}
	};

	const handleInfoMouseLeave = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowTooltipForId(null);
	};

	// Обработчик клика на заблокированный вариант
	const handleDisabledClick = (id: number) => {
		if (maxReached && !selectedOptions.includes(id)) {
			// Показываем иконку "i" для этого варианта
			setShowInfoIconForId(id);
			// Скрываем тултип (если он был открыт для другого варианта)
			setShowTooltipForId(null);
		}
	};

	return (
		<div className={styles.question__container}>
			<div className={styles.radio__group}>
				{options.map(opt => {
					const isSelected = selectedOptions.includes(opt.id);
					const isOther = isOtherOption(opt.id);
					const isOtherSelected = isOther && isSelected;
					const canToggle = isSelected || !maxReached;
					const isDisabled = !canToggle && !isSelected;

					// Показываем иконку "i" только для этого варианта
					const showInfoIcon = showInfoIconForId === opt.id;
					// Показываем тултип только для этого варианта при наведении на иконку
					const showTooltip = showTooltipForId === opt.id;

					return (
						<div key={opt.id} className={styles.option__wrapper}>
							<label
								className={`${styles.custom__radio} 
									${isOther ? styles.other__option : ''} 
									${isOtherSelected ? styles.other__selected : ''}
									${isDisabled ? styles.disabled__option : ''}`}
								onClick={e => {
									// Если вариант заблокирован, обрабатываем клик
									if (isDisabled) {
										e.preventDefault();
										handleDisabledClick(opt.id);
									}
								}}
							>
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

								<div className={styles.option__content}>
									{isOtherSelected ? (
										<div
											className={
												styles.other__input_container
											}
										>
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
										<div className={styles.text__container}>
											<span
												className={
													isOther
														? styles.other__label
														: ''
												}
											>
												{opt.label}
											</span>

											{showInfoIcon && (
												<span
													className={
														styles.info__icon
													}
													onMouseEnter={e =>
														handleInfoMouseEnter(
															opt.id,
															e,
														)
													}
													onMouseLeave={
														handleInfoMouseLeave
													}
													onClick={e =>
														e.stopPropagation()
													}
												>
													<svg
														width="13"
														height="13"
														viewBox="0 0 13 13"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<circle
															cx="6.5"
															cy="6.5"
															r="6"
															stroke="#979A9A"
															strokeWidth="1"
														/>
														<text
															x="6.5"
															y="9"
															textAnchor="middle"
															fontSize="8"
															fill="#979A9A"
															fontWeight="bold"
															fontFamily="Arial, sans-serif"
														>
															i
														</text>
													</svg>
												</span>
											)}
										</div>
									)}
								</div>
							</label>

							{/* Тултип с сообщением появляется только при наведении на иконку "i" */}
							{showTooltip && (
								<div
									className={styles.tooltip}
									onMouseEnter={e =>
										handleInfoMouseEnter(opt.id, e)
									}
									onMouseLeave={handleInfoMouseLeave}
								>
									<div className={styles.tooltip__content}>
										Можно выбрать не более {maxSelections}{' '}
										вариантов
									</div>
									<div
										className={styles.tooltip__arrow}
									></div>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{maxSelections > 1 && (
				<p className={styles.info__description}>
					* выберите не более {maxSelections} вариантов
				</p>
			)}
		</div>
	);
};

export default CheckQuest;
