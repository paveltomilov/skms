'use client';

import { SimulationItemData } from '@/shared/types/simulation';
import 'simplebar-react/dist/simplebar.min.css';
import { FC, useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Close from '@/shared/UI/icons/Close';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';
import cn from 'classnames';
import ScrollArrow from '@/shared/UI/icons/ScrollArrow';
import { useScrollControls } from '@/shared/hooks/useScrollControls';
import dynamic from 'next/dynamic';

const SimpleBar = dynamic(
	() => import('simplebar-react'),
	{
		ssr: false,
		loading: () => <div className={styles.simplebar} />
	}
);

interface Props {
	data: SimulationItemData[];
	deleteItem: (id: string) => void;
}

const SCROLL_PERCENTAGE = 10;
const SCROLL_UPDATE_DELAY = 300;

const ListMalfunction: FC<Props> = ({ data, deleteItem }) => {
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

	const renderItem = useCallback((item: SimulationItemData, index: number) => (
		<li key={`${item.element_id}:${item.malfunction_id}`}
			className={cn(styles.list__item, {
				[styles.list__item_scrollable]: isScrollable,
				[styles.list__item_not_scrollable]: !isScrollable,
			})}>
			<div className={styles.list__item__top}>
				<span className={styles.list__item__name}>
					{index < 9 ? `Неисправность_0${index + 1}` : `Неисправность_${index + 1}`}
				</span>
				<Button
					width={20}
					height={20}
					icon={<Close size="xs" strokeWidth={1.5} />}
					onClick={() => deleteItem(item.malfunction_id)}
					aria-label={`Удалить симуляцию элемента ${item.element} с неисправностью ${item.malfunctions}`}
				/>
			</div>
			<span className={styles.list__item__description}>Элемент: {item.element}</span>
			<span className={styles.list__item__description}>Неисправность: {item.malfunctions}</span>
		</li>
	), [isScrollable]);

	const renderScrollButtons = () => (
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
	);

	return (
		<div className={styles.wrap}>
			{isScrollable && isClient && renderScrollButtons()}

			<p className={styles.title}>Выбранная неисправность</p>

			<ul className={styles.list}>
				{isClient ? (
					<SimpleBar
						className={'simplbarBottom'}
						autoHide={false}
						ref={simplebarRef}
						onScroll={updateScrollButtons}
					>
						{data.map(renderItem)}
					</SimpleBar>
				) : (
					<div className={styles.simplebar}>
						{data.map(renderItem)}
					</div>
				)}
			</ul>
			<LineRupture/>
		</div>
	);
};

export default ListMalfunction;
