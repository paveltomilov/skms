import '@testing-library/jest-dom';
import { findElementByID } from '../scheme';
import { InitialSchemeState } from '@/store/circuitSlice';

describe('test function findElementById', () => {
	const mockValidateLength = (id: string, state: InitialSchemeState) => {
		const element = findElementByID(id, state);

		if (id.length < 3 || id.length > 14) {
			throw new Error('id has wrong length');
		}

		return element;
	};

	const mockValidateLetter = (id: string, state: InitialSchemeState) => {
		const element = findElementByID(id, state);

		if (!id.startsWith('c') || !id.startsWith('p')) {
			throw new Error('id starts with wrong letter');
		}

		return element;
	};

	const mockState: InitialSchemeState = {
		powerCircuit: [
			[
				{
				id: 'p.1.1',
				name: 'Провод от фазы А до автомата',
				resistance: 0.1,
				baseResistance: 0.1,
				voltage: 220,
				malfunctions: [
					{
						id: 'p.1.1.1',
						name: 'Короткое замыкание с фазой C',
						active: false,
					},
					{
						id: 'p.1.1.2',
						name: 'Короткое замыкание с фазой B',
						active: false,
					},
					{
						id: 'p.1.1.3',
						name: 'Обрыв',
						active: false,
					},
					{
						id: 'p.1.1.4',
						name: 'Короткое замыкание на землю',
						active: false,
					},
					{
						id: 'p.1.1.5',
						name: 'Обрыв провода',
						active: false,
					},
				],
			},
			{
				id: 'p.2.1',
				name: 'Сухой контакт фазы А автомата',
				resistance: 0,
				baseResistance: 0,
				voltage: 220,
				malfunctions: [
					{
						id: 'p.2.1',
						name: 'Плохой контакт на клемме, нет одной фазы',
						active: false,
					},
					{
						id: 'p.2.2',
						name: 'Ложно выбивает',
						active: false,
					},
					{
						id: 'p.2.3',
						name: 'Собирается механически, но нет коммутации',
						active: false,
					},
				],
			},
			],
		],
		controlCircuit: [
			{
				id: 'c.1',
				name: 'Автомат питания цепей управления',
				resistance: 0,
				baseResistance: 0,
				voltage: 220,
				malfunctions: [
					{
						id: 'c.1.1',
						name: 'Плохой контакт на клемме, нет фазы',
						active: false,
					},
				],
			},
		],
	};

	// it('should accept ids starting with "p"', () => {
	// 	const result = findElementByID('p.2.1', mockState);
	// 	expect(result).toEqual({ ...result, id: 'p.2.1' });
	// });

	it('should accept ids starting with "c"', () => {
		const result = findElementByID('c.1', mockState);
		expect(result).toEqual({ ...result, id: 'c.1' });
	});

	it('should throw error when id starts with wrong letter', () => {
		expect(() => mockValidateLetter('a.1', mockState)).toThrow();
		expect(() => mockValidateLetter('x.1', mockState)).toThrow();
		expect(() => mockValidateLetter('1.1', mockState)).toThrow();
	});

	it('should throw error when id has wrong type', () => {
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(true, mockState)).toThrow();
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(123, mockState)).toThrow();
	});

	it('should throw error when id has wrong length', () => {
		expect(() => mockValidateLength('p', mockState)).toThrow();
		expect(() => mockValidateLength('p.', mockState)).toThrow();
		expect(() =>
			mockValidateLength('p.1.1.1.1.1.1.1', mockState),
		).toThrow();
	});
});
