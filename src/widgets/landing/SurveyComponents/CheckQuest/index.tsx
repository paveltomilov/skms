'use client';
import { useState, useEffect, useCallback } from 'react';
import Check from '../../IconSvg/check';
import Checked from '../../IconSvg/checked';
import { CheckQuestProps } from '@/shared/types/question';
import styles from './styles.module.scss';
import InfoTooltip from '../Tooltip';

const CheckQuest: React.FC<CheckQuestProps> = ({
	options,
	maxSelections = 3,
	otherText = '',
	onSelectionChange,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
	const [currentOtherText, setCurrentOtherText] = useState<string>('');
	const [showInfoForId, setShowInfoForId] = useState<number | null>(null);
	const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(
		null,
	);
	const [tooltipPosition, setTooltipPosition] = useState<'right' | 'bottom'>(
		'right',
	);
	const [windowWidtch, setWindowWidth] = useState(0);

	useEffect(() => {
		setCurrentOtherText(otherText);
	}, [otherText]);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = windowWidtch <= 767;
	const isTablet = windowWidtch >= 768 && windowWidtch <= 1023;

	const large = 200;
	const small = 255;
	const max = 420;

	const getThreshold = useCallback(() => {
		if (isMobile) return large;
		if (isTablet) return small;
		return max;
	}, [isMobile, isTablet]);

	const otherOption = options.find(opt => opt.label === 'Другое');
	const isOtherOption = useCallback(
		(id: number) => {
			return otherOption && id === otherOption.id;
		},
		[otherOption],
	);

	const maxReached = selectedOptions.length >= maxSelections;

	const handleSelect = useCallback(
		(id: number) => {
			let newSelected: number[];

			if (selectedOptions.includes(id)) {
				newSelected = selectedOptions.filter(item => item !== id);
				setSelectedOptions(newSelected);

				if (isOtherOption(id)) {
					setCurrentOtherText('');
					onSelectionChange(newSelected, '');
				} else {
					onSelectionChange(newSelected, currentOtherText);
				}

				setShowInfoForId(null);
				if (tooltipTimer) {
					clearTimeout(tooltipTimer);
				}
			} else if (selectedOptions.length < maxSelections) {
				newSelected = [...selectedOptions, id];
				setSelectedOptions(newSelected);

				if (isOtherOption(id)) {
					onSelectionChange(newSelected, currentOtherText || '');
				} else {
					onSelectionChange(newSelected, currentOtherText);
				}

				setShowInfoForId(null);
				if (tooltipTimer) {
					clearTimeout(tooltipTimer);
				}
			}
		},
		[
			selectedOptions,
			isOtherOption,
			maxSelections,
			onSelectionChange,
			currentOtherText,
			tooltipTimer,
		],
	);

	const handleOtherTextChange = useCallback(
		(text: string) => {
			setCurrentOtherText(text);
			onSelectionChange(selectedOptions, text);
		},
		[selectedOptions, onSelectionChange],
	);

	const handleDisabledClick = useCallback(
		(id: number, event: React.MouseEvent) => {
			if (maxReached && !selectedOptions.includes(id)) {
				const textContainer = event.currentTarget.querySelector(
					`.${styles.text__container}`,
				);

				if (textContainer) {
					const textSpan = textContainer.querySelector('span');
					if (textSpan) {
						const width = textSpan.getBoundingClientRect().width;
						const threshold = getThreshold();
						setTooltipPosition(
							width > threshold ? 'bottom' : 'right',
						);
					}
				}

				setShowInfoForId(id);

				if (tooltipTimer) {
					clearTimeout(tooltipTimer);
				}

				const timer = setTimeout(() => {
					setShowInfoForId(null);
				}, 3000);

				setTooltipTimer(timer);
			}
		},
		[maxReached, selectedOptions, getThreshold, tooltipTimer],
	);

	useEffect(() => {
		return () => {
			if (tooltipTimer) {
				clearTimeout(tooltipTimer);
			}
		};
	}, [tooltipTimer]);

	const renderOptions = useCallback(() => {
		return options.map(opt => {
			const isSelected = selectedOptions.includes(opt.id);
			const isOther = isOtherOption(opt.id);
			const isOtherSelected = isOther && isSelected;
			const canToggle = isSelected || !maxReached;
			const isDisabled = !canToggle && !isSelected;
			const showTooltip = showInfoForId === opt.id;

			return (
				<div key={opt.id} className={styles.option__wrapper}>
					<label
						className={`${styles.custom__radio} 
							${isOther ? styles.other__option : ''} 
							${isOtherSelected ? styles.other__selected : ''}
							${isDisabled ? styles.disabled__option : ''}`}
						onClick={e => {
							if (isDisabled) {
								e.preventDefault();
								handleDisabledClick(opt.id, e);
							}
						}}
					>
						<input
							className={styles.custom__radio_input}
							type="checkbox"
							checked={isSelected}
							disabled={!canToggle}
							onChange={() => handleSelect(opt.id)}
						/>
						<div className={styles.svg__container}>
							{isSelected ? (
								<Checked
									className={styles.svg__container_element}
								/>
							) : (
								<Check disabled={!isSelected && maxReached} />
							)}
						</div>

						<div className={styles.option__content}>
							{isOtherSelected ? (
								<div className={styles.other__input_container}>
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
								<div className={styles.text__container}>
									<span
										className={
											isOther ? styles.other__label : ''
										}
									>
										{opt.label}
									</span>
									{showTooltip && (
										<InfoTooltip
											right={
												tooltipPosition === 'right'
													? -10
													: undefined
											}
											bottom={
												tooltipPosition === 'bottom'
													? -10
													: undefined
											}
											show={true}
										/>
									)}
								</div>
							)}
						</div>
					</label>
				</div>
			);
		});
	}, [
		options,
		selectedOptions,
		isOtherOption,
		maxReached,
		showInfoForId,
		handleDisabledClick,
		handleSelect,
		currentOtherText,
		handleOtherTextChange,
		tooltipPosition,
	]);

	return (
		<div className={styles.question__container}>
			<div className={styles.radio__group}>{renderOptions()}</div>

			{maxSelections > 1 && (
				<p className={styles.info__description}>
					* выберите не более трех вариантов
				</p>
			)}
		</div>
	);
};

export default CheckQuest;
