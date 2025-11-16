import { FC, RefObject } from 'react';
import styles from './styles.module.scss';
import { CircuitElement, Malfunction } from '@/shared/types/scheme';

interface Props {
	data: CircuitElement[];
	choiceElement: CircuitElement;
	handleChoice: (item: Malfunction) => void;
	ref: RefObject<HTMLDivElement | null>;
}

const DropListMalfunction: FC<Props> = ({
	data,
	choiceElement,
	handleChoice,
	ref,
}) => {
	return (
		<div className={styles.list} ref={ref}>
			<ul className={styles.elementList}>
				{data
					.filter(mal => mal.id === choiceElement.id)[0]
					.malfunctions.map(item => {
						return (
							<li
								key={item.id}
								className={styles.elementList__item}
								title={
									item.name.length > 45
										? item.name
										: undefined
								}
								onClick={() => handleChoice(item)}
							>
								<span className={styles.elementList__name}>
									{item.name}
								</span>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default DropListMalfunction;
