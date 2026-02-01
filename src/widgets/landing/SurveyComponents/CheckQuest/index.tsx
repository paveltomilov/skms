'use client';
import { useState, useEffect } from 'react';
import Check from '../../IconSvg/check';
import Checked from '../../IconSvg/checked';
import { CheckQuestProps } from '@/shared/types/question';
import styles from './styles.module.scss';
import InfoTooltip from '../Tooltip';

const CheckQuest: React.FC<CheckQuestProps> = ({
	options,
	maxSelections = 3,
	selectedIds = [],
	otherText = '',
	onSelectionChange,
	initialSelectedIds = [],
	initialOtherText = '',
}) => {
	const [selectedOptions, setSelectedOptions] = useState<number[]>(() => {
		return initialSelectedIds.length > 0 ? initialSelectedIds : selectedIds;
	});
	const [currentOtherText, setCurrentOtherText] = useState<string>(() => {
		return initialOtherText || otherText;
	});
	const [showInfoForId, setShowInfoForId] = useState<number | null>(null);
	const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(
		null,
	);
	const [tooltipPosition, setTooltipPosition] = useState<'right' | 'bottom'>(
		'right',
	);

	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
		const tabletMediaQuery = window.matchMedia(
			'(min-width: 768px) and (max-width: 1023px)',
		);

		const handleMobileChange = (e: MediaQueryListEvent) => {
			setIsMobile(e.matches);
		};

		const handleTabletChange = (e: MediaQueryListEvent) => {
			setIsTablet(e.matches);
		};

		setIsMobile(mobileMediaQuery.matches);
		setIsTablet(tabletMediaQuery.matches);

		mobileMediaQuery.addEventListener('change', handleMobileChange);
		tabletMediaQuery.addEventListener('change', handleTabletChange);

		return () => {
			mobileMediaQuery.removeEventListener('change', handleMobileChange);
			tabletMediaQuery.removeEventListener('change', handleTabletChange);
		};
	}, []);

	const getThreshold = () => {
		if (isMobile) return 200;
		if (isTablet) return 255;
		return 420;
	};

	const otherOption = options.find(opt => opt.label === 'Другое');
	const isOtherOption = (id: number) => {
		return otherOption && id === otherOption.id;
	};

	const maxReached = selectedOptions.length >= maxSelections;

	const handleSelect = (id: number) => {
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
	};

	const handleOtherTextChange = (text: string) => {
		setCurrentOtherText(text);
		onSelectionChange(selectedOptions, text);
	};

	const handleDisabledClick = (id: number, event: React.MouseEvent) => {
		if (maxReached && !selectedOptions.includes(id)) {
			const textContainer = event.currentTarget.querySelector(
				`.${styles.text__container}`,
			);

			if (textContainer) {
				const textSpan = textContainer.querySelector('span');
				if (textSpan) {
					const width = textSpan.getBoundingClientRect().width;
					const threshold = getThreshold();
					setTooltipPosition(width > threshold ? 'bottom' : 'right');
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
	};

	useEffect(() => {
		return () => {
			if (tooltipTimer) {
				clearTimeout(tooltipTimer);
			}
		};
	}, [tooltipTimer]);

	return (
		<div className={styles.question__container}>
			<div className={styles.radio__group}>
				{options.map(opt => {
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
									className={styles.custom__radio__input}
									type="checkbox"
									checked={isSelected}
									disabled={!canToggle}
									onChange={() => handleSelect(opt.id)}
								/>
								<div className={styles.svg__container}>
									{isSelected ? (
										<Checked
											className={
												styles.svg__container_element
											}
										/>
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
											{showTooltip && (
												<InfoTooltip
													right={
														tooltipPosition ===
														'right'
															? -10
															: undefined
													}
													bottom={
														tooltipPosition ===
														'bottom'
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
