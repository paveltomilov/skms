import { useAppDispatch } from '@/shared/hooks/store';
import { setActiveGate } from '@/store/gateSlice';
import { openModal } from '@/store/modalSlice';

export const useOpenGatePopup = () => {
	const dispatch = useAppDispatch();

	const openGatePopup = (id: string) => {
		dispatch(openModal('gateControl'));
		dispatch(setActiveGate(id));
	};

	return openGatePopup;
};
