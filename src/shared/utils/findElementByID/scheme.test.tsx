import '@testing-library/jest-dom';
import { initialStateScheme } from '@/shared/configs/scheme';
import { WIRE_POWER_TO_CONTROL_BREAKER_ID } from '@/shared/constants';
import { InitialStateScheme } from '@/shared/types/scheme';
import { findElementByID } from './scheme';

describe('test function findElementById', () => {
	it('should accept ids starting with "p"', () => {
		const result = findElementByID('p.1.1', initialStateScheme);
		expect(result.id).toBe('p.1.1');
	});

	it('should accept ids starting with "c"', () => {
		const result = findElementByID(
			WIRE_POWER_TO_CONTROL_BREAKER_ID,
			initialStateScheme,
		);
		expect(result.id).toBe(WIRE_POWER_TO_CONTROL_BREAKER_ID);
	});

	it('should throw error when id starts with wrong letter', () => {
		expect(() => findElementByID('a.1', initialStateScheme)).toThrow();
		expect(() => findElementByID('x.1', initialStateScheme)).toThrow();
		expect(() => findElementByID('1.1', initialStateScheme)).toThrow();
	});

	it('should throw error when id has wrong type', () => {
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(true, initialStateScheme)).toThrow();
		// @ts-expect-error - специально передаем неверный тип для тестов
		expect(() => findElementByID(123, initialStateScheme)).toThrow();
	});

	it('should fallback to initial state when element missing in provided state', () => {
		const emptyState = {
			powerCircuit: [],
			controlCircuit: [],
		} as unknown as InitialStateScheme;

		const result = findElementByID(WIRE_POWER_TO_CONTROL_BREAKER_ID, emptyState);
		expect(result?.id).toBe(WIRE_POWER_TO_CONTROL_BREAKER_ID);
	});

	it('should throw error when id has wrong length', () => {
		expect(() => findElementByID('p', initialStateScheme)).toThrow();
		expect(() => findElementByID('p.', initialStateScheme)).toThrow();
		expect(() =>
			findElementByID('p.1.1.1.1.1.1.1', initialStateScheme),
		).toThrow();
	});
});
