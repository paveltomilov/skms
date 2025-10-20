import { CircuitElement, CircuitBranch, InitialStateScheme } from '@/shared/types/scheme';

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

	const result = searchInBranches(branch, id);

	if (!result) {
		throw new Error(`Element with id "${id}" not found`);
	}

	return result;
};
