import { FC, RefObject, useEffect } from 'react';
import styles from './styles.module.scss';
import { Malfunction } from '@/shared/types/scheme';
import { useArrowNavigation } from '@/shared/hooks/useArrowNavigation';

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
	useEffect(() => {
		if (malfunctions && ref.current) {
			const firstItem =
				ref.current.querySelector<HTMLElement>('[role="option"]');
			if (firstItem) {
				firstItem.focus();
			}
		}
	}, [malfunctions, ref]);

	useArrowNavigation(ref);

	return (
		<div className={styles.list} ref={ref}>
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
								title={
									item.name.length > 45
										? item.name
										: undefined
								}
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
