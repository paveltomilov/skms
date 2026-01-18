import { useMemo } from 'react';
import { extractMalfunctions } from '../utils/extractMalfunctionIds/extractMalfunctions';
import { useAppSelector } from './store';
import { CircuitElement } from '../types/scheme';
import {
	implementedMalfunctions,
	type ImplementedMalfunctionsConfigItem,
} from '../configs/implementedMalfunctions';

interface IResponse {
	urlBase: string | undefined;
	access: string | null;
	elements: CircuitElement[];
}

export const useRequestData = (): IResponse => {
	const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;
	const access = localStorage.getItem('accessToken');
	const circuit = useAppSelector(state => state.circuit);
	const elements = useMemo(() => {
		const allElements = extractMalfunctions(circuit);

		if (implementedMalfunctions.length === 0) {
			return allElements.sort((a, b) =>
				a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'ru'),
			);
		}

		const elementMap = new Map(
			allElements.map(element => [element.id, element]),
		);

		const filteredElements = implementedMalfunctions.flatMap(
			(configItem: ImplementedMalfunctionsConfigItem) => {
				const element = elementMap.get(configItem.elementId);
				if (!element) {
					return [];
				}

				const allowedMalfunctions = new Set(configItem.malfunctionIds);
				const malfunctions = element.malfunctions.filter(malfunction =>
					allowedMalfunctions.has(malfunction.id),
				);

				if (malfunctions.length === 0) {
					return [];
				}

				return [
					{
						...element,
						malfunctions,
					},
				];
			},
		);

		return filteredElements.sort((a, b) =>
			a.name.toLowerCase().localeCompare(b.name.toLowerCase(), 'ru'),
		);
	}, [circuit]);

	return {
		urlBase,
		access,
		elements,
	};
};
