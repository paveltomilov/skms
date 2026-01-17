import { useRouter } from 'next/navigation';
import { CircuitElement } from '@/shared/types/scheme';
import { useAppDispatch, useAppSelector } from './store';
import { useRequestData } from './useRequestData';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { SimulationFormData, SimulationItemData } from '../types/simulation';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { postSimulation, ResponseData } from '../api';
import { closeModal } from '@/store/modalSlice';

interface IResponse {
	setShowListMalfunction: Dispatch<SetStateAction<boolean>>;
	showListMalfunction: boolean;
	handleChoiceMalfunction: (simulation: SimulationItemData) => void;
	elements: CircuitElement[];
	listMalfunction: SimulationItemData[];
	handleDeleteItem: (id: string) => void;
	listIsEmpty: boolean;
	isLoading: boolean;
	handleSetSimulation: () => Promise<void>;
	success: boolean;
	errors: string | null;
	data: ResponseData | null;
}

const useSetSimulation = (): IResponse => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [success, setSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<string | null>(null);
	const [data, setData] = useState<ResponseData | null>(null);
	const [elements, setElements] = useState<CircuitElement[]>([]);
	const [listMalfunction, setListMalfunction] = useState<
		SimulationItemData[]
	>([]);
	const [showListMalfunction, setShowListMalfunction] =
		useState<boolean>(false);

	const { urlBase, access, elements: defaultElements } = useRequestData();
	const studentId = useAppSelector(
		state => state.training.currentStudent?.id,
	);

	const idActiveGate = useAppSelector(state => state.gate.activeGateId);

	useEffect(() => {
		if (defaultElements) setElements(defaultElements);
	}, [defaultElements]);

	const selectedIds = useMemo(
		() => new Set(listMalfunction.map(item => item.element_id)),
		[listMalfunction],
	);

	const visibleElements = useMemo(
		() => elements.filter(item => !selectedIds.has(item.id)),
		[elements, selectedIds],
	);

	const listIsEmpty: boolean = listMalfunction.length === 0;

	const handleChoiceMalfunction = useCallback(
		(simulation: SimulationItemData): void => {
			if (
				listMalfunction.some(
					m => m.malfunction_id === simulation.malfunction_id,
				)
			) {
				setErrors('Эта неисправность уже добавлена');
				return;
			}

			setListMalfunction(prev => [...prev, simulation]);
			setShowListMalfunction(false);
			setErrors(null);
		},
		[listMalfunction],
	);

	const handleDeleteItem = useCallback(
		(id: string) => {
			if (listMalfunction.some(m => m.malfunction_id === id)) {
				setListMalfunction(prev =>
					prev.filter(m => m.malfunction_id !== id),
				);
				setErrors(null);
			} else {
				setErrors('Эта неисправность не найдена в списе');
				return;
			}
		},
		[listMalfunction],
	);

	const handleSetSimulation = async () => {
		if (!studentId || listIsEmpty || !idActiveGate) {
			const errorText = listIsEmpty
				? 'Cписок неисправностей пуст'
				: !studentId
				? 'Студент не выбран'
				: 'Не задан id задвижки';
			setSuccess(false);
			setErrors(errorText);
			setData(null);
			setIsLoading(false);
			return;
		}

		const formData: SimulationFormData = {
			user: studentId,
			malfunctions: listMalfunction.map(item => {
				return { malfunction_id: item.malfunction_id };
			}),
			gate: idActiveGate,
		};
		setErrors(null);
		setIsLoading(true);
		dispatch(clearCurrentStudent());
		const result = await postSimulation(urlBase, access, formData);
		if (result.success) {
			setSuccess(result.success);
			setErrors(result.errors);
			setData(result.data);
			setIsLoading(!result.success);
			dispatch(closeModal('setSimulation'));
			router.push('/training');
		}
		if (result.errors) {
			setSuccess(result.success);
			setErrors(result.errors);
			setData(result.data);
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		success,
		errors,
		data,
		setShowListMalfunction,
		showListMalfunction,
		handleChoiceMalfunction,
		elements: visibleElements,
		listMalfunction,
		handleDeleteItem,
		listIsEmpty,
		handleSetSimulation,
	};
};

export default useSetSimulation;
