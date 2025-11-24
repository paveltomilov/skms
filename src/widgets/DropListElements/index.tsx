import { FC, RefObject, useEffect } from 'react';
import styles from './styles.module.scss';
import Side from '@/shared/UI/icons/Side';
import { CircuitElement } from '@/shared/types/scheme';
import cn from 'classnames';
import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

interface Props {
	data: CircuitElement[];
	handleChoiceElement: (item: CircuitElement) => void;
	choiceElement: CircuitElement | null;
	ref: RefObject<HTMLDivElement | null>;
}

const DropListElements: FC<Props> = ({
	data,
	handleChoiceElement,
	choiceElement,
	ref,
}) => {
	useEffect(() => {
		if (data && ref.current) {
			const firstItem =
				ref.current.querySelector<HTMLElement>('[role="option"]');
			if (firstItem) {
				firstItem.focus();
			}
		}
	}, [data, ref]);

	useArrowNavigation(ref);

	return (
		<div className={styles.list} ref={ref}>
			<ul
				className={styles.elementList}
				role="listbox"
				aria-label="Выберите элемент схемы"
			>
				{data
					.filter(item => item.view)
					.map(item => {
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
								title={
									item.name.length > 45
										? item.name
										: undefined
								}
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
	);
};

export default DropListElements;
