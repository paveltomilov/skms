import { findElementByID } from '../findElementByID/scheme';
import type {
	CircuitElement,
	InitialStateScheme,
	Malfunction,
} from '@/shared/types/scheme';

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
export const getMalfunctionCombinedElements = (
	element: string[],
	state: InitialStateScheme,
): Record<string, Malfunction[]> => {
	// получаем из стора ID контактов из которых состоит элемент пр.["p.0.7","p.1.7","p.2.7"]
	const contactsElement = element
		.map(id => findElementByID(id, state))
		.filter((el): el is CircuitElement => el !== undefined);

	// проверяем контакты элемента на активные неисправности
	const contactsWithActiveMalfunctions = contactsElement.reduce<
		Record<string, Malfunction[]>
	>((acc, contact) => {
		acc[contact.id] = contact.malfunctions?.filter(mal => mal.active) ?? [];
		return acc;
	}, {});

	return contactsWithActiveMalfunctions;
};
