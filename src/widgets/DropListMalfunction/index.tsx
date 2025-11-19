import { FC, RefObject } from 'react';
import styles from './styles.module.scss';
import { Malfunction } from '@/shared/types/scheme';

interface Props {
	malfunctions: Malfunction[] | null;
	handleChoice: (item: Malfunction) => void;
	ref: RefObject<HTMLDivElement | null>;
}

const DropListMalfunction: FC<Props> = ({
	malfunctions,
	handleChoice,
	ref,
}) => {
	
	return (
		<div className={styles.list} ref={ref}>
			<ul className={styles.elementList}>
				{malfunctions ? (
					malfunctions.map(item => {
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
								role="option"
								tabIndex={0}
								onKeyDown={e =>
									e.key === 'Enter' && handleChoice(item)
								}
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
