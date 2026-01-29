'use client';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';
import MalfunctionSelector from '../MalfunctionSelector';
import ListMalfunction from '../ListMalfunction';
import useSetSimulation from '@/shared/hooks/useSetSimulation';
import ErrorMessageText from '../ErrorMessageText';
import cn from 'classnames';
import useDetectMalfunction from '@/shared/hooks/useDetectMalfunction';

export const PopupSetSimulation: FC = () => {
	const {
		errors,
		setShowListMalfunction,
		showListMalfunction,
		handleChoiceMalfunction,
		elements,
		listMalfunction,
		handleDeleteItem,
		listIsEmpty,
		handleSetSimulation,
		isLoading,
	} = useSetSimulation();

	const {
		selectedMalfunction,
		isStudent,
		isSelected,
		handleSelectMalfunction,
		handleDetectMalfunction,
	} = useDetectMalfunction();

	useEffect(() => {
		console.log('selectedMalfunction обновлен:', selectedMalfunction);
	}, [selectedMalfunction]);

	return (
		<div className={styles.popup}>
			<div className={styles.popup__wrapper}>
				<Button
					aria-label={'Добавить неисправность'}
					className={cn(styles.popup__btn, {
						[styles.popup__btn__first]: !showListMalfunction,
					})}
					width={326}
					height={38}
					text="+ Добавить неисправность"
					onClick={() => setShowListMalfunction(true)}
				/>
				{showListMalfunction && (
					<MalfunctionSelector
						setMalfun={handleChoiceMalfunction}
						selectMalfun={handleSelectMalfunction}
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
				{isStudent
					? <Button
						data-ignore-click-outside="true"
						aria-label={'Определить неисправность'}
						className={`${styles.popup__btn} ignore-click-outside`}
						width={326}
						height={38}
						disabled={!isSelected || isLoading}
						text={
							isLoading
								? 'Создание неисправности...'
								: 'Определить неисправность'
						}
						onClick={handleDetectMalfunction}
					/>
					: <Button
						aria-label={'Назначить симуляцию'}
						className={styles.popup__btn}
						width={326}
						height={38}
						disabled={listIsEmpty || isLoading}
						text={
							isLoading
								? 'Создание симуляции...'
								: 'Назначить симуляцию'
						}
						onClick={handleSetSimulation}

					/>
				}
				{errors && <ErrorMessageText text={errors} />}
			</div>
		</div>
	);
};
