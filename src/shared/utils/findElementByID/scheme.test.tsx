import '@testing-library/jest-dom';
import { initialSchemState } from '@/shared/configs/scheme';
import { findElementByID } from '../scheme';

describe('test function findElementById', () => {
	// it('should accept ids starting with "p"', () => {
	// 	const result = findElementByID('p.2.1', initialState);
	// 	expect(result.id).toBe('p.2.1' );
	// });

	it('should accept ids starting with "c"', () => {
		const result = findElementByID('c.1', initialSchemState);
		expect(result.id).toBe('c.1');
	});

	it('should throw error when id starts with wrong letter', () => {
		expect(() => findElementByID('a.1', initialSchemState)).toThrow();
		expect(() => findElementByID('x.1', initialSchemState)).toThrow();
		expect(() => findElementByID('1.1', initialSchemState)).toThrow();
	});

	it('should throw error when id has wrong type', () => {
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(true, initialSchemState)).toThrow();
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(123, initialSchemState)).toThrow();
	});

	it('should throw error when id has wrong length', () => {
		expect(() => findElementByID('p', initialSchemState)).toThrow();
		expect(() => findElementByID('p.', initialSchemState)).toThrow();
		expect(() =>
			findElementByID('p.1.1.1.1.1.1.1', initialSchemState),
		).toThrow();
	});
});
