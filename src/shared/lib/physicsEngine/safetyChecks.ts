import type { MultimeterState } from '@/shared/types/multimeter';
import type { InitialState as CircuitState } from '@/store/valveSchemeSlice';
import { parseCircuitState, CalculationModel, NodeId } from './parser';

export type SafetyErrorType =
  | 'WRONG_JACKS_FOR_10A'     
  | 'WRONG_MODE_VOLTAGE_PRESENT' 
  | 'WRONG_CONNECTION_FOR_CURRENT' 
  | 'JACK_10A_MISUSE'     
  | null;       

interface SafetyCheckResult {
    error: SafetyErrorType;
}

/**
 * @param nodeAId ID первого узла.
 * @param nodeBId ID второго узла.
 * @param model Расчетная модель схемы.
 * @returns .
 */
function hasDirectVoltageSourceBetween(nodeAId: NodeId, nodeBId: NodeId, model: CalculationModel): boolean {
    if (!nodeAId || !nodeBId) return false;

    return model.branches.some(branch =>
        branch.type === 'VOLTAGE_SOURCE' && branch.voltage !== 0 &&
        ((branch.nodeA === nodeAId && branch.nodeB === nodeBId) ||
         (branch.nodeB === nodeAId && branch.nodeA === nodeBId))
    );
}


/**
 * @param multimeterState 
 * @param circuitState 
 * @returns 
 */
export function runSafetyChecks(
    multimeterState: Pick<MultimeterState, 'currentMode' | 'probeConnections'>,
    circuitState: CircuitState
): SafetyCheckResult {

    const { currentMode, probeConnections } = multimeterState;
    const { red, black } = probeConnections;

    if (currentMode === 'DCA_10A' && red.targetType === 'jack' && red.targetId !== 'jack-10a') {
        return { error: 'WRONG_JACKS_FOR_10A' };
    }

    if (currentMode !== 'DCA_10A' && currentMode !== 'OFF' && red.targetType === 'jack' && red.targetId === 'jack-10a') {
        return { error: 'JACK_10A_MISUSE' };
    }

    let model: CalculationModel | null = null;
    try {
        if (currentMode.startsWith('OHM_') || currentMode === 'DIODE' || currentMode.startsWith('DCA_')) {
            model = parseCircuitState(circuitState);
        }
    } catch { 
        return { error: null }; 
    }

    if (model && (currentMode.startsWith('OHM_') || currentMode === 'DIODE')) {
        const nodeAId = red.targetType === 'node' ? red.targetId : null;
        const nodeBId = black.targetType === 'node' ? black.targetId : null;

        if (nodeAId && nodeBId) {
            if (hasDirectVoltageSourceBetween(nodeAId, nodeBId, model)) {
                return { error: 'WRONG_MODE_VOLTAGE_PRESENT' };
            }
        }
    }

    if (model && currentMode.startsWith('DCA_')) {
        if (red.targetType === 'node' && black.targetType === 'node' && red.targetId !== black.targetId) {
             if (red.targetId && black.targetId && hasDirectVoltageSourceBetween(red.targetId, black.targetId, model)) {
                  return { error: 'WRONG_CONNECTION_FOR_CURRENT' }; 
             }
             return { error: 'WRONG_CONNECTION_FOR_CURRENT' };
        }
    }

    return { error: null };
}