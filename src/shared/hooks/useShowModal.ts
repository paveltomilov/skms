import { useAppDispatch } from './store';
import { Modals, openModal } from '@/store/modalSlice';
import { useCallback } from 'react';

const useShowModal = (type: Modals) => {
	const dispatch = useAppDispatch();

	const handleModal = useCallback(() => {
		dispatch(openModal(type));
	}, [dispatch]);

	return handleModal;
};

export default useShowModal;
