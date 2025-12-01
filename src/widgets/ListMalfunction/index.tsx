import { SimulationItemData } from '@/shared/types/simulation';
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import Close from '@/shared/UI/icons/Close';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';

interface Props {
	data: SimulationItemData[];
	deleteItem: (id: string) => void;
}

const ListMalfunction: FC<Props> = ({ data, deleteItem }) => {
	return (
		<>
			<p className={styles.title}>Выбранные неисправности</p>
			<ul className={styles.list}>
				{data.map((item, index) => {
					return (
						<li
							key={`${item.element_id}:${item.malfunction_id}`}
							className={styles.list__item}
						>
							<div className={styles.list__item__top}>
								<span className={styles.list__item__name}>
									{index < 9
										? `Неисправность_0${index + 1}`
										: `Неисправность_${index + 1}`}
								</span>
								<Button
									width={20}
									height={20}
									icon={
										<Close size={'xs'} strokeWidth={1.5} />
									}
									onClick={() =>
										deleteItem(item.malfunction_id)
									}
									aria-label={`Удалить симуляцию элемента ${item.element} с неисправностью ${item.malfunctions}`}
								/>
							</div>
							<span className={styles.list__item__description}>
								Элемент: {item.element}
							</span>
							<span className={styles.list__item__description}>
								Неисправность: {item.malfunctions}
							</span>
						</li>
					);
				})}
			</ul>
			<LineRupture />
		</>
	);
};

export default ListMalfunction;
