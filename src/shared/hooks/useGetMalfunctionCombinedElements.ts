import { useMemo } from 'react';
import { findElementByID } from '../utils/findElementByID/scheme';
import { useAppSelector } from './store';
import type { CircuitElement, Malfunction } from '@/shared/types/scheme';

/**
 * Получаем объект с контактами элемента, где свойство объекта — это ID КОНТАКТА,
 * которое содержит массив активных неисправностей или пустой массив
 * @param пример:
 * @example
 * {
 * 	"p.0.7": [
 * 		{
 * 			id: 'p.0.7.1',
 * 			name: 'Обрыв фазы',
 * 			active: true
 * 		},
 * 		{
 * 			id: 'p.0.7.2',
 * 			name: 'Короткое замыкание между фазами',
 * 			active: true
 * 		}
 * 	],
 * 	"p.1.7": [],
 * 	"p.2.7": []
 * }
 */
export const useGetMalfunctionCombinedElements = (
	element: string[],
): Record<string, Malfunction[]> => {
	const state = useAppSelector(state => state.circuit);

	// получаем из стора ID контактов из которых состоит элемент пр.["p.0.7","p.1.7","p.2.7"]
	const contactsElement = useMemo(
		() =>
			element
				.map(id => findElementByID(id, state))
				.filter((el): el is CircuitElement => el !== undefined),
		[state, element],
	);

	// проверяем контакты элемента на активные неисправности
	const contactsWithActiveMalfunctions = useMemo(() => {
		return contactsElement.reduce<Record<string, Malfunction[]>>(
			(acc, contact) => {
				acc[contact.id] =
					contact.malfunctions?.filter(mal => mal.active) ?? [];
				return acc;
			},
			{},
		);
	}, [contactsElement]);

	return contactsWithActiveMalfunctions;
};
