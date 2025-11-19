import { useMemo } from 'react';
import { extractMalfunctions } from '../utils/extractMalfunctionIds/extractMalfunctions';
import { useAppSelector } from './store';
import { CircuitElementSelect } from '../types/scheme';

interface IResponse {
	urlBase: string | undefined;
	access: string | null;
	elements: CircuitElementSelect[];
}

export const useRequestData = (): IResponse => {
	const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;
	const access = localStorage.getItem('accessToken');
	const circuit = useAppSelector(state => state.circuit);
	const elements = useMemo(() => {
		return extractMalfunctions(circuit)
			.sort((a, b) =>
				a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'ru'),
			)
			.map(elem => {
				return { ...elem, view: true };
			});
	}, [circuit]);

	return {
		urlBase,
		access,
		elements,
	};
};
