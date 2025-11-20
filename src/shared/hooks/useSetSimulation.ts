import { useRouter } from 'next/navigation';
import { CircuitElementSelect } from '@/shared/types/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { useRequestData } from './useRequestData';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { SimulationFormData, SimulationItemData } from '../types/simulation';
import { clearCurrentStudent } from '@/store/trainingSlice';
import {
	postSimulation,
	ResponseData,
} from '../utils/postSimulation/postSimulation';
import { closeModal } from '@/store/modalSlice';

interface IResponse {
	setShowListMalfunction: Dispatch<SetStateAction<boolean>>;
	showListMalfunction: boolean;
	handleChoiceMalfunction: (simulation: SimulationItemData) => void;
	elements: CircuitElementSelect[];
	listMalfunction: SimulationItemData[];
	handleDeleteItem: (id: string, element_id: string) => void;
	listIsEmpty: boolean;
	handleSetSimulation: () => Promise<void>;
	success: boolean;
	errors: string | null;
	data: ResponseData | null;
}

const useSetSimulation = (): IResponse => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [success, setSuccess] = useState<boolean>(false);
	const [errors, setErrors] = useState<string | null>(null);
	const [data, setData] = useState<ResponseData | null>(null);
	const [listIsEmpty, setListIsEmpty] = useState<boolean>(true);

	const { urlBase, access, elements: contElem } = useRequestData();
	const studentId = useAppSelector(
		state => state.training.currentStudent?.id,
	);
	const [elements, setElements] = useState<CircuitElementSelect[]>([]);

	const [listMalfunction, setListMalfunction] = useState<
		SimulationItemData[]
	>([]);

	const [showListMalfunction, setShowListMalfunction] =
		useState<boolean>(false);

	useEffect(() => {
		if (contElem) {
			const initialized = contElem.map(item => ({ ...item, view: true }));
			setElements(initialized);
		}
	}, [contElem]);

	useEffect(() => {
		setListIsEmpty(listMalfunction.length === 0);
	}, [listMalfunction.length]);

	function handleChoiceMalfunction(simulation: SimulationItemData): void {
		const selectElements = elements.map(item =>
			item.id === simulation.element_id ? { ...item, view: false } : item,
		);
		const dataNew = [...listMalfunction, simulation];
		setElements(selectElements);
		setListMalfunction(dataNew);
		setShowListMalfunction(false);
	}

	function handleDeleteItem(id: string, element_id: string) {
		const filterListMalfunction = listMalfunction.filter(
			item => item.malfunction_id !== id,
		);
		setListMalfunction(filterListMalfunction);

		setElements(prev =>
			prev.map(item =>
				item.id === element_id ? { ...item, view: true } : item,
			),
		);
	}

	const handleSetSimulation = async () => {
		if (!studentId || listIsEmpty) {
			const errorText = listIsEmpty
				? 'Cписок неисправностей пуст'
				: 'Студент не выбран';
			setSuccess(false);
			setErrors(errorText);
			setData(null);
			return;
		}

		const formData: SimulationFormData = {
			user: studentId,
			malfunctions: listMalfunction.map(item => {
				return { malfunction_id: item.malfunction_id };
			}),
		};
		dispatch(clearCurrentStudent());
		const result = await postSimulation(urlBase, access, formData);
		if (result.success) {
			setSuccess(result.success);
			setErrors(result.errors);
			setData(result.data);
			dispatch(closeModal('setSimulation'));
			router.push('/training');
		}
		if (result.errors) {
			setSuccess(result.success);
			setErrors(result.errors);
			setData(result.data);
		}
	};

	return {
		success,
		errors,
		data,
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
