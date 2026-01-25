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
  scheme.powerCircuit.forEach((group) => {
    if (Array.isArray(group)) {
      group.forEach(traverse);
    } else {
      // если по ошибке не массив, обрабатываем как элемент
      traverse(group);
    }
  });

  // Обход controlCircuit: CircuitBranch[]
  if (Array.isArray(scheme.controlCircuit)) {
    scheme.controlCircuit.forEach(traverse);
  } else if (scheme.controlCircuit) {
    // если controlCircuit по ошибке не массив, обрабатываем как элемент
    traverse(scheme.controlCircuit);
  }

  return result;
}