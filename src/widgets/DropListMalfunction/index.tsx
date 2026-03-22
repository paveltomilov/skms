import { FC, RefObject } from 'react';
import styles from './styles.module.scss';
import { Malfunction } from '@/shared/types/scheme';
import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

interface Props {
	forwardRef: RefObject<HTMLDivElement | null>;
	malfunctions: Malfunction[] | null;
	handleChoice: (item: Malfunction) => void;	
}

const DropListMalfunction: FC<Props> = ({
	malfunctions,
	handleChoice,
	forwardRef,
}) => {

	useArrowNavigation(forwardRef);

	return (
		<div className={styles.list} ref={forwardRef}>
			<ul
				className={styles.elementList}
				role="listbox"
				aria-label="Выберите неисправность"
			>
				{malfunctions?.length ? (
					malfunctions.map(item => {
						return (
							<li
								key={item.id}
								className={styles.elementList__item}
								onClick={() => handleChoice(item)}
								role="option"
								aria-label={`Неисправность ${item.name}`}
								tabIndex={0}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										handleChoice(item);
									}
								}}
							>
								<span className={styles.elementList__name}>
									{item.name}
								</span>
							</li>
						);
					})
				) : (
					<li className={styles.elementList__itemEmpty}>
						<span className={styles.elementList__name}>
							Неисправности отсутствуют
						</span>
					</li>
				)}
			</ul>
		</div>
	);
};

export default DropListMalfunction;
