import { CircuitBranch } from '../../types/scheme';

/**
 * Линейная последовательность элементов схемы: A → B → C.
 */
export const seq = <const T extends readonly CircuitBranch[]>(...items: T): T => items;

/**
 * Параллельные ветки управления: (A → B) ∥ (C → D).
 */
export const par = <const T extends readonly (readonly CircuitBranch[])[]>(...branches: T): T => branches;
