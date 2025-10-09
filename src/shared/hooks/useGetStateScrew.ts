import { RootState } from '@/store/store';
import { useAppSelector } from './store';
import { pointsState } from '../configs/points';

const useGetStateScrew = (id: keyof typeof pointsState) => {
	const screwStates = useAppSelector((state: RootState) => state.points);
	return screwStates[id];
};

export default useGetStateScrew;
