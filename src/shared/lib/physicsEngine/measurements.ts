import type { MultimeterState, MultimeterMode } from '@/shared/types/multimeter';
import type { InitialState as CircuitState } from '@/store/valveSchemeSlice';
import { parseCircuitState, CalculationModel } from './parser';
import {
    calculateEquivalentResistance,
    calculateVoltageDifference
} from './circuitSolver';

interface MeasurementResult {
    value: number | string | null;
    unit: string | null;
    isOverload?: boolean;
}

/**
 * @param multimeterState 
 * @param circuitState 
 * @returns 
 */
export function calculateMeasurement(
    multimeterState: Pick<MultimeterState, 'currentMode' | 'probeConnections'>,
    circuitState: CircuitState
): MeasurementResult | null {

    const { currentMode, probeConnections } = multimeterState;

    if (currentMode === 'OFF') {
        return { value: null, unit: null };
    }

    const nodeAId = probeConnections.red.targetType === 'node' ? probeConnections.red.targetId : null;
    const nodeBId = probeConnections.black.targetType === 'node' ? probeConnections.black.targetId : null;

    let model: CalculationModel;
    try {
         model = parseCircuitState(circuitState);
    } catch {
         return { value: 'Err', unit: null }; 
    }

    if (currentMode.startsWith('OHM_') || currentMode === 'DIODE') {
        if (!nodeAId || !nodeBId) {
            return { value: null, unit: currentMode === 'DIODE' ? null : 'Ω', isOverload: true };
        }

        const resistance = calculateEquivalentResistance(nodeAId, nodeBId, model);

        if (!isFinite(resistance)) {
            return { value: null, unit: currentMode === 'DIODE' ? null : 'Ω', isOverload: true };
        }

        if (currentMode === 'DIODE') {
            const continuityThreshold = 50;
            return (resistance < continuityThreshold && resistance >= 0)
                 ? { value: resistance, unit: null } 
                 : { value: null, unit: null, isOverload: true }; 
        }

        let limit = Infinity;
        switch(currentMode) {
            case 'OHM_200': limit = 200; break;
            case 'OHM_2000': limit = 2000; break;
            case 'OHM_20k': limit = 20000; break;
            case 'OHM_200k': limit = 200000; break;
            case 'OHM_2000k': limit = 2000000; break;
        }
        const isOverload = resistance > limit;

        return isOverload
            ? { value: null, unit: 'Ω', isOverload: true } // OL
            : { value: resistance, unit: 'Ω' };
    }

    if (currentMode.startsWith('DCV_') || currentMode.startsWith('ACV_')) {
        if (!nodeAId || !nodeBId) {
            return { value: 0, unit: 'V' };
        }

        const calculatedVoltage = calculateVoltageDifference(nodeAId, nodeBId, model);

        if (isNaN(calculatedVoltage)) {
            return { value: 'Err', unit: null }; 
        }

        let limit = Infinity;
        const modeForLimit = currentMode.startsWith('ACV_') ? currentMode.replace('ACV_', 'DCV_') as MultimeterMode : currentMode;
        switch(modeForLimit) {
            case 'DCV_200m': limit = 0.2; break;
            case 'DCV_2000m': limit = 2; break;
            case 'DCV_20': limit = 20; break;
            case 'DCV_200': limit = 200; break;
            case 'DCV_1000': limit = 1000; break;
            case 'ACV_200': limit = 200; break; 
            case 'ACV_750': limit = 750; break; 
        }

        const isOverload = Math.abs(calculatedVoltage) > limit;

        return isOverload
            ? { value: null, unit: 'V', isOverload: true } 
            : { value: calculatedVoltage, unit: 'V' };  
    }
    return { value: null, unit: null }; 
}