'use client';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Check from '../../IconSvg/check';
import Checked from '../../IconSvg/checked';
import { CheckQuestProps, Option } from '@/shared/types/question';
import styles from './styles.module.scss';
import InfoTooltip from '../Tooltip';

const CheckQuest: React.FC<CheckQuestProps<Option>> = ({
	options,
	maxSelections = 3,
	otherText = '',
	onSelectionChange,
}) => {
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
	const [showInfoForId, setShowInfoForId] = useState<number | null>(null);
	const [tooltipPosition, setTooltipPosition] = useState<'right' | 'bottom'>(
		'right',
	);
	const [windowWidth, setWindowWidth] = useState(0);
	const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (tooltipTimerRef.current) {
				clearTimeout(tooltipTimerRef.current);
			}
		};
	}, []);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isMobile = windowWidth <= 767;
	const isTablet = windowWidth >= 768 && windowWidth <= 1023;

	const large = 200;
	const small = 255;
	const max = 420;

	const getThreshold = useCallback(() => {
		if (isMobile) return large;
		if (isTablet) return small;
		return max;
	}, [isMobile, isTablet]);

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

	const maxReached = selectedOptions.length >= maxSelections;

	const handleSelect = useCallback(
		(id: number) => {
			let newSelected: number[];

			if (selectedOptions.includes(id)) {
				newSelected = selectedOptions.filter(item => item !== id);
				setSelectedOptions(newSelected);

				if (isOtherOption(id)) {
					onSelectionChange(newSelected, '');
				} else {
					onSelectionChange(newSelected, otherText);
				}

				setShowInfoForId(null);
				if (tooltipTimerRef.current) {
					clearTimeout(tooltipTimerRef.current);
					tooltipTimerRef.current = null;
				}
			} else if (selectedOptions.length < maxSelections) {
				newSelected = [...selectedOptions, id];
				setSelectedOptions(newSelected);

				if (isOtherOption(id)) {
					onSelectionChange(newSelected, otherText || '');
				} else {
					onSelectionChange(newSelected, otherText);
				}

				setShowInfoForId(null);
				if (tooltipTimerRef.current) {
					clearTimeout(tooltipTimerRef.current);
					tooltipTimerRef.current = null;
				}
			}
		},
		[
			selectedOptions,
			isOtherOption,
			maxSelections,
			onSelectionChange,
			otherText,
		],
	);

	const handleOtherTextChange = useCallback(
		(text: string) => {
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

				if (tooltipTimerRef.current) {
					clearTimeout(tooltipTimerRef.current);
				}

				tooltipTimerRef.current = setTimeout(() => {
					setShowInfoForId(null);
					tooltipTimerRef.current = null;
				}, 3000);
			}
		},
		[maxReached, selectedOptions, getThreshold],
	);

	const renderOptions = useCallback(() => {
		return options.map(opt => {
			const isSelected = selectedOptions.includes(opt.id);
			const isOther = Boolean(opt.isOther);
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
										value={otherText}
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
		maxReached,
		showInfoForId,
		handleDisabledClick,
		handleSelect,
		otherText,
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
