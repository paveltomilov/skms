import { FC, RefObject } from 'react';
import styles from './styles.module.scss';
import Side from '@/shared/UI/icons/Side';
import { CircuitElement } from '@/shared/types/scheme';
import cn from 'classnames';

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
	ref
}) => {
	return (
		<div className={styles.list} ref={ref}>
			<ul className={styles.elementList}>
				{data.map(item => {
					return (
						<li
							key={item.id}
							className={cn(styles.elementList__item, {
								[styles.active]:
									choiceElement?.name === item.name,
							})}
							title={
								item.name.length > 45 ? item.name : undefined
							}
							onClick={() => handleChoiceElement(item)}
						>
							<span className={styles.elementList__name}>
								{item.name}
							</span>
							<Side
								transform={
									choiceElement?.name === item.name
										? 'rotate90'
										: undefined
								}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DropListElements;
