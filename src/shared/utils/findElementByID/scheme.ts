import { CircuitElement, CircuitBranch, InitialStateScheme } from '@/shared/types/scheme';
import { initialStateScheme } from '@/shared/configs/scheme';

const searchInBranches = (branches: CircuitBranch[], targetId: string): CircuitElement | null => {
	for (const branch of branches) {
		if (Array.isArray(branch)) {
			const found = searchInBranches(branch, targetId);
			if (found) {
				return found;
			}
		} else if (branch.id === targetId) {
			return branch;
		}
	}

	return null;
};

export const findElementByID = (id: string, state: InitialStateScheme) => {
	if (typeof id !== 'string') {
		throw new Error('ID must be a string');
	}

	if (id.length < 3) {
		throw new Error('id has wrong length');
	}

	if (!(id.startsWith('c') || id.startsWith('p'))) {
		throw new Error('id starts with wrong letter');
	}

	const branch = id.startsWith('p') ? state.powerCircuit : state.controlCircuit;

	let result = searchInBranches(branch, id);

	// Если элемент не найден в текущем состоянии (например, при рассинхроне стора),
	// пробуем достать его из изначальной схемы, чтобы не падать ошибкой.
	if (!result) {
		const fallbackBranch = id.startsWith('p')
			? initialStateScheme.powerCircuit
			: initialStateScheme.controlCircuit;
		result = searchInBranches(fallbackBranch, id);
	}

	if (!result) {
		throw new Error(`Element with id "${id}" not found`);
	}

	return result;
};
