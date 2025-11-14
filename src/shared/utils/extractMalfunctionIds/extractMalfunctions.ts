import { InitialStateScheme, CircuitElement, CircuitBranch } from '@/shared/types/scheme';

export function extractMalfunctions(scheme: InitialStateScheme): CircuitElement[] {
  const result: CircuitElement[] = [];

  function traverse(branch: CircuitBranch): void {
    if (Array.isArray(branch)) {
      // Это CircuitGroup — рекурсивно обходим каждый элемент
      branch.forEach(traverse);
    } else {
      // Это CircuitElement — добавляем в результат
      result.push(branch);
    }
  }

  // Обход powerCircuit: CircuitBranch[][]
  scheme.powerCircuit.forEach(group => {
    group.forEach(traverse);
  });

  // Обход controlCircuit: CircuitBranch[]
  scheme.controlCircuit.forEach(traverse);

  return result;
}