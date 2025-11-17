'use client';
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';
import ListChoiceMalfunction from '../ListChoiceMalfunction/ListChoiceMalfunction';
import ListMalfunction from '../ListMalfunction/ListMalfunction';
import useSetSimulation from '@/shared/hooks/useSetSimulation';

export const PopupSetSimulation: FC = () => {
	const {
		setShowListMalfunction,
		showListMalfunction,
		handleChoiceMalfunction,
		elements,
		listMalfunction,
		handleDeleteItem,
		listIsEmpty,
		handleSetSimulation,
	} = useSetSimulation();

	return (
		<div className={styles.popup}>
			<div className={styles.popup__wrapper}>
				<Button
					className={styles.popup__btn}
					width={326}
					height={38}
					text="+ Добавить неисправность"
					onClick={() => setShowListMalfunction(true)}
				/>
				{showListMalfunction && (
					<ListChoiceMalfunction
						setMalfun={handleChoiceMalfunction}
						data={elements}
						closeList={setShowListMalfunction}
					/>
				)}
				<LineRupture />

				{listMalfunction.length ? (
					<ListMalfunction
						data={listMalfunction}
						deleteItem={handleDeleteItem}
					/>
				) : null}
				<Button
					className={styles.popup__btn}
					width={326}
					height={38}
					disabled={listIsEmpty}
					text="Назначить симуляцию"
					onClick={handleSetSimulation}
				/>
			</div>
		</div>
	);
};
