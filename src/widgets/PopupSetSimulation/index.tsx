'use client';
import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LineRupture from '@/shared/UI/icons/LineRupture/LineRupture';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import {
	SimulationFormData,
	SimulationItemData,
} from '@/shared/types/simulation';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { postSimulation } from '@/shared/utils/postSimulation/postSimulation';
import { closeModal } from '@/store/modalSlice';
import { useRequestData } from '@/shared/hooks/useRequestData';
import ListChoiceMalfunction from '../ListChoiceMalfunction/ListChoiceMalfunction';
import { CircuitElement } from '@/shared/types/scheme';
import ListMalfunction from '../ListMalfunction/ListMalfunction';
import { useRouter } from 'next/navigation';

export const PopupSetSimulation: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { urlBase, access, elements: contElem } = useRequestData();
	const studentId = useAppSelector(
		state => state.training.currentStudent?.id,
	);
	const [elements, setElements] = useState<CircuitElement[]>(
		contElem.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'ru'),
		),
	);

	const [listMalfunction, setListMalfunction] = useState<
		SimulationItemData[]
	>([]);

	const [showListMalfunction, setShowListMalfunction] =
		useState<boolean>(false);

	const listIsEmpty: boolean = listMalfunction.length === 0;

	function handleChoiceMalfunction(simulation: SimulationItemData): void {
		const filterElements = elements.filter(
			item => item.id !== simulation.element_id,
		);
		const dataNew = [...listMalfunction, simulation];
		setElements(filterElements);
		setListMalfunction(dataNew);
		setShowListMalfunction(false);
	}

	function handleDeleteItem(id: string, element_id: string) {
		const filterListMalfunction = listMalfunction.filter(
			item => item.malfunction_id !== id,
		);
		setListMalfunction(filterListMalfunction);
		const foundElement = contElem.find(item => item.id === element_id);
		if (foundElement) {
			const restoredList = [...elements, foundElement].sort((a, b) =>
				a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'ru'),
			) as CircuitElement[];
			setElements(restoredList);
		} else {
			console.warn(`Элемент с данным id ${element_id} не найден`);
		}
	}

	const handleSetSimulation = async () => {
		if (studentId && !listIsEmpty) {
			const formData: SimulationFormData = {
				user: studentId,
				malfunctions: listMalfunction.map(item => {
					return { malfunction_id: item.malfunction_id };
				}),
			};
			dispatch(clearCurrentStudent());
			try {
				const response = await postSimulation(
					urlBase,
					access,
					formData,
				);

				if (response.status >= 200 && response.status <= 299) {
					console.log('Simulation', response.statusText);
					dispatch(closeModal('setSimulation'));
					router.push('/training');
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

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
