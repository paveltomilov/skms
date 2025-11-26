import { FC, RefObject, useEffect } from 'react';
import styles from './styles.module.scss';
import Side from '@/shared/UI/icons/Side';
import { CircuitElement } from '@/shared/types/scheme';
import cn from 'classnames';
import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';

interface Props {
	data: CircuitElement[];
	handleChoiceElement: (item: CircuitElement) => void;
	choiceElement: CircuitElement | null;
	forwardRef: RefObject<HTMLDivElement | null>;
}

const DropListElements: FC<Props> = ({
	data,
	handleChoiceElement,
	choiceElement,
	forwardRef,
}) => {
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

	return (
		<>
			<div className={styles.list} ref={forwardRef}>
				<ul
					className={styles.elementList}
					role="listbox"
					aria-label="Выберите элемент схемы"
				>
					{data.map(item => {
						return (
							<li
								className={cn(styles.elementList__item, {
									[styles.active]:
										choiceElement?.id === item.id,
								})}
								key={item.id}
								role="option"
								aria-selected={choiceElement?.id === item.id}
								aria-label={`Элемент ${item.name}`}
								tabIndex={0}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										handleChoiceElement(item);
									}
								}}
								onClick={() => handleChoiceElement(item)}
							>
								<span className={styles.elementList__name}>
									{item.name}
								</span>
								<Side />
							</li>
						);
					})}
				</ul>
			</div>
			<LineRupture />
		</>
	);
};

export default DropListElements;
