import { useRouter } from 'next/navigation';
import { CircuitElement } from '@/shared/types/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { useRequestData } from './useRequestData';
import { Dispatch, SetStateAction, useState } from 'react';
import { SimulationFormData, SimulationItemData } from '../types/simulation';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { postSimulation } from '../utils/postSimulation/postSimulation';
import { closeModal } from '@/store/modalSlice';

interface IResponse {
	setShowListMalfunction: Dispatch<SetStateAction<boolean>>;
	showListMalfunction: boolean;
	handleChoiceMalfunction: (simulation: SimulationItemData) => void;
	elements: CircuitElement[];
	listMalfunction: SimulationItemData[];
	handleDeleteItem: (id: string, element_id: string) => void;
	listIsEmpty: boolean;
	handleSetSimulation: () => Promise<void>;
}

const useSetSimulation = (): IResponse => {
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

	return {
		setShowListMalfunction,
		showListMalfunction,
		handleChoiceMalfunction,
		elements,
		listMalfunction,
		handleDeleteItem,
		listIsEmpty,
		handleSetSimulation,
	};
};

export default useSetSimulation;
