import type { CalculationModel, NodeId, Branch } from './parser';
import { matrix, lusolve, evaluate } from 'mathjs';


export function findPaths(startNodeId: NodeId, endNodeId: NodeId, model: CalculationModel): Branch[][] {
    const paths: Branch[][] = [];
    const stack: { nodeId: NodeId; path: Branch[]; visitedNodes: Set<NodeId> }[] = [
        { nodeId: startNodeId, path: [], visitedNodes: new Set([startNodeId]) }
    ];

    while (stack.length > 0) {
    
        const current = stack.pop();
        if (!current) continue; 
        const { nodeId, path, visitedNodes } = current;

        if (nodeId === endNodeId) {
            paths.push([...path]);
            continue;
        }
        const outgoingBranches = model.branches.filter(branch => {
            const nextNode = branch.nodeA === nodeId ? branch.nodeB : branch.nodeA;
            return model.nodes.has(nextNode) && (branch.nodeA === nodeId || branch.nodeB === nodeId) && !visitedNodes.has(nextNode);
        });
        for (const branch of outgoingBranches) {
            const nextNodeId = branch.nodeA === nodeId ? branch.nodeB : branch.nodeA;
            const newVisitedNodes = new Set(visitedNodes);
            newVisitedNodes.add(nextNodeId);
            const newPath = [...path, branch];
            stack.push({ nodeId: nextNodeId, path: newPath, visitedNodes: newVisitedNodes });
        }
    }
    return paths;
}


export function calculatePathResistance(path: Branch[]): number {
    return path.reduce((sum, branch) => {
        const resistance = branch.resistance;
        if (resistance === null || resistance === undefined || !isFinite(resistance)) {
            return Infinity; 
        }
        if (!isFinite(sum)) return Infinity;
        return sum + resistance;
    }, 0); 
}


export function calculateEquivalentResistance(
    nodeAId: NodeId,
    nodeBId: NodeId,
    model: CalculationModel
): number {
    if (!nodeAId || !nodeBId || nodeAId === nodeBId) return 0;

    if (!model.nodes.has(nodeAId) || !model.nodes.has(nodeBId)) {
        return Infinity; 
    }


    const directBranch = model.branches.find(b =>
        (b.nodeA === nodeAId && b.nodeB === nodeBId) ||
        (b.nodeB === nodeAId && b.nodeA === nodeBId)
    );
    if (directBranch) {
        const directResistance = directBranch.resistance;
        return (directResistance === null || directResistance === undefined || !isFinite(directResistance)) ? Infinity : directResistance;
    }


    const paths = findPaths(nodeAId, nodeBId, model);
    if (paths.length === 0) return Infinity;

    const resistance = calculatePathResistance(paths[0]);
    return resistance;
}

export function calculateVoltages(model: CalculationModel): Map<NodeId, number> {
    const nodes = Array.from(model.nodes.keys());
    const nonGroundNodes = nodes.filter(n => n !== model.groundNodeId);
    const voltageSources = model.branches.filter(b => b.type === 'VOLTAGE_SOURCE');

    const nodeIndexMap = new Map<NodeId, number>();
    nonGroundNodes.forEach((nodeId, index) => nodeIndexMap.set(nodeId, index));

    const numNodes = nonGroundNodes.length;
    const numVSources = voltageSources.length;
    const matrixSize = numNodes + numVSources;

    if (matrixSize === 0) {
        return new Map([[model.groundNodeId, 0]]);
    }

    const Y_array = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0)) as number[][];
    const J_array = Array(matrixSize).fill(0) as number[];

    model.branches.forEach(branch => {
        if (branch.type === 'VOLTAGE_SOURCE') return;
        const resistance = branch.resistance ?? Infinity;

        let conductance = 0;
        if (typeof resistance === 'number' && isFinite(resistance)) {
            if (resistance > 1e-9) {
                conductance = 1 / resistance;
            } else if (resistance >= 0) { 
                conductance = 1e9; 
            }
        }

        if (conductance === 0) return; 

        const n1 = branch.nodeA;
        const n2 = branch.nodeB;
        const idx1 = nodeIndexMap.get(n1);
        const idx2 = nodeIndexMap.get(n2);

        if (idx1 !== undefined) Y_array[idx1][idx1] += conductance;
        if (idx2 !== undefined) Y_array[idx2][idx2] += conductance;
        if (idx1 !== undefined && idx2 !== undefined) {
            Y_array[idx1][idx2] -= conductance;
            Y_array[idx2][idx1] -= conductance;
        }
    });

    voltageSources.forEach((branch, vSourceIndex) => {
        const n_plus = branch.nodeA;
        const n_minus = branch.nodeB;
        const voltageValue = typeof branch.voltage === 'number' ? branch.voltage : 0;
        const idx_plus = nodeIndexMap.get(n_plus);
        const idx_minus = nodeIndexMap.get(n_minus);
        const vSourceEqRow = numNodes + vSourceIndex;

        if (idx_plus !== undefined) {
            Y_array[idx_plus][vSourceEqRow] += 1;
            Y_array[vSourceEqRow][idx_plus] += 1;
        }
        if (idx_minus !== undefined) {
            Y_array[idx_minus][vSourceEqRow] -= 1;
            Y_array[vSourceEqRow][idx_minus] -= 1;
        }
        J_array[vSourceEqRow] = voltageValue;
    });

    let solution: number[];
    try {
        const Y_matrix = matrix(Y_array);
        const J_vector = matrix(J_array);

        const resultMatrix = lusolve(Y_matrix, J_vector);

        if (!resultMatrix || typeof resultMatrix.toArray !== 'function') {
             throw new Error('Solver did not return a valid matrix');
        }

        solution = evaluate('flatten(result)', { result: resultMatrix }) as number[];

        if (!Array.isArray(solution) || solution.some(isNaN)) {
             throw new Error('Solver returned NaN or invalid values');
        }

    } catch  {
        const errorPotentials = new Map<NodeId, number>();
        nonGroundNodes.forEach(nodeId => errorPotentials.set(nodeId, NaN));
        errorPotentials.set(model.groundNodeId, 0);
        return errorPotentials;
    }

    const potentials = new Map<NodeId, number>();
    potentials.set(model.groundNodeId, 0);
    nonGroundNodes.forEach((nodeId, index) => {
        const potential = solution[index];
        potentials.set(nodeId, potential);
    });

    return potentials;
}


export function calculateVoltageDifference(
    nodeAId: NodeId,
    nodeBId: NodeId,
    model: CalculationModel
): number {
    if (!nodeAId || !nodeBId) return NaN;
    if (nodeAId === nodeBId) return 0;
    if (!model.nodes.has(nodeAId) || !model.nodes.has(nodeBId)) return NaN;


    const potentials = calculateVoltages(model);
    const potentialA = potentials.get(nodeAId);
    const potentialB = potentials.get(nodeBId);

    if (potentialA === undefined || potentialB === undefined || isNaN(potentialA) || isNaN(potentialB)) {
        return NaN;
    }
    return potentialA - potentialB;
}