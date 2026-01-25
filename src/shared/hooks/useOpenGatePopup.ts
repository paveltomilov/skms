import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { setActiveGate } from '@/store/gateSlice';
import { openModal } from '@/store/modalSlice';
import { useUserCookies } from './useUserCookies';

export const useOpenGatePopup = () => {
	const dispatch = useAppDispatch();

	const { role } = useUserCookies();

	const studentId = useAppSelector(
		state => state.training.currentStudent?.id,
	);

	if (role === 'teacher') {
		const openSetsimulationPopup = (id: string) => {
			if(studentId) {
			dispatch(openModal('setSimulation'));
			dispatch(setActiveGate(id));
		} else {
			dispatch(openModal('note'));
		}
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
