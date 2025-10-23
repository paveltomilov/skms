import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { setActiveGate } from '@/store/gateSlice';
import { openModal } from '@/store/modalSlice';

export const useOpenGatePopup = () => {
	const dispatch = useAppDispatch();

	const { isTraining } = useAppSelector(
		state => state.training,
	);

	if (isTraining) {
		const openSetsimulationPopup = (id: string) => {
			dispatch(openModal('setSimulation'));
			dispatch(setActiveGate(id));
		};
		return openSetsimulationPopup;
	} else {
		const openGatePopup = (id: string) => {
			dispatch(openModal('gateControl'));
			dispatch(setActiveGate(id));
		};
		return openGatePopup;
	}
};
