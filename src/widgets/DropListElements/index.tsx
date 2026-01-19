'use client';

import {FC, RefObject, useCallback, useEffect, useMemo, useState} from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from './styles.module.scss';
import Side from '@/shared/UI/icons/Side';
import { CircuitElement } from '@/shared/types/scheme';
import cn from 'classnames';
import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';
import {useScrollControls} from '@/shared/hooks/useScrollControls';
import ScrollArrow from '@/shared/UI/icons/ScrollArrow';

interface Props {
	data: CircuitElement[];
	handleChoiceElement: (item: CircuitElement) => void;
	choiceElement: CircuitElement | null;
	forwardRef: RefObject<HTMLDivElement | null>;
}

const SCROLL_PERCENTAGE = 10;
const SCROLL_UPDATE_DELAY = 300;

const DropListElements: FC<Props> = ({
	data,
	handleChoiceElement,
	choiceElement,
	forwardRef,
}) => {
	const [isClient, setIsClient] = useState(false);
	const {
		simplebarRef,
		canScrollUp,
		canScrollDown,
		isScrollable,
		handleScrollUp,
		handleScrollDown,
		updateScrollButtons,
	} = useScrollControls({
		scrollPercentage: SCROLL_PERCENTAGE,
		scrollUpdateDelay: SCROLL_UPDATE_DELAY
	});

	useEffect(() => {
		setIsClient(true);
		const timer = setTimeout(() => {
			updateScrollButtons();
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (isClient) {
			requestAnimationFrame(() => {
				updateScrollButtons();
			});
		}
	}, [data, isClient]);

	useEffect(() => {
		if (data && forwardRef.current) {
			const firstItem =
				forwardRef.current.querySelector<HTMLElement>(
					'[role="option"]',
				);
			if (firstItem) {
				firstItem.focus();
			}
		}
	}, [data, forwardRef]);
	useArrowNavigation(forwardRef);

	const handleKeyDown = useCallback((e: React.KeyboardEvent, item: CircuitElement) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleChoiceElement(item);
		}
	}, [handleChoiceElement]);

	const renderListItem = useCallback((item: CircuitElement, idx: number) => {
		const isActive = choiceElement?.id === item.id;

		return (
			<li
				className={cn(styles.elementList__item, {
					[styles.active]: isActive,
				})}
				key={`${item.id}:${idx}`}
				role="option"
				aria-selected={isActive}
				aria-label={`Элемент ${item.name}`}
				tabIndex={0}
				onKeyDown={(e) => handleKeyDown(e, item)}
				onClick={() => handleChoiceElement(item)}
			>
                <span className={styles.elementList__name}>
                    {item.name}
                </span>
				<Side />
			</li>
		);
	}, [choiceElement, handleChoiceElement, handleKeyDown]);

	const renderScrollButtons = useMemo(() => (
		<>
			<button
				className={cn(styles.scroll_button_top, {
					[styles.scroll_button_disabled]: !canScrollUp
				})}
				aria-label="Прокрутить вверх"
				onClick={handleScrollUp}
				disabled={!canScrollUp}
			>
				<ScrollArrow />
			</button>
			<button
				className={cn(styles.scroll_button_bottom, {
					[styles.scroll_button_disabled]: !canScrollDown
				})}
				onClick={handleScrollDown}
				disabled={!canScrollDown}
				aria-label="Прокрутить вниз"
			>
				<ScrollArrow />
			</button>
		</>
	), [isScrollable, isClient, canScrollUp, canScrollDown, handleScrollUp, handleScrollDown]);

	return (
		<>
			<div className={styles.list} ref={forwardRef}>
				{isScrollable && isClient && renderScrollButtons}
				<ul
					className={styles.elementList}
					role="listbox"
					aria-label="Выберите элемент схемы"
				>
					<SimpleBar
						className={'simplbarTop'}
						autoHide={false}
						ref={simplebarRef}
						onScroll={updateScrollButtons}
					>
						{data.map(renderListItem)}
					</SimpleBar>
				</ul>
			</div>
		</>
	);
};

export default DropListElements;
