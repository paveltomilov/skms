import type {
    InitialState,
    CircuitElement,
    BaseElement,
    ElementWithBranches,
    Malfunction,
} from '@/store/valveSchemeSlice';


export type NodeId = string;

export interface NodeData {
    id: NodeId;
}

export type BranchType =
    | 'RESISTOR'
    | 'VOLTAGE_SOURCE' 
    | 'WIRE'           
    | 'SWITCH'         
    | 'FUSE'     
    | 'MOTOR'     
    | 'LAMP'     
    | 'COIL'       
    | 'GROUND_CONNECTION'; 


export interface Branch {
    id: string;
    type: BranchType;
    nodeA: NodeId;
    nodeB: NodeId;
    resistance: number; 
    voltage: number;  
    originalElementId: string; 
}

export interface CalculationModel {
    nodes: Map<NodeId, NodeData>;
    branches: Branch[];
    groundNodeId: NodeId;
}


let nodeCounter = 0;
const generateNodeId = (): NodeId => `node_${nodeCounter++}`;

function isBaseElement(element: CircuitElement): element is BaseElement {
  return typeof element === 'object' && element !== null && 'id' in element && 'malfunctions' in element && !('branches' in element);
}



function processElement(
    element: CircuitElement | CircuitElement[],
    inputNodeId: NodeId,
    model: CalculationModel,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parentMalfunctions: Malfunction[] = []
): NodeId {
    if (Array.isArray(element)) {
        let currentNodeId = inputNodeId;
        element.forEach(el => {
            currentNodeId = processElement(el, currentNodeId, model, []);
        });
        return currentNodeId;
    }

    if (!isBaseElement(element)) {
        const branchContainer = element as ElementWithBranches;
        const outputNodeId = generateNodeId();
        model.nodes.set(outputNodeId, { id: outputNodeId });

        branchContainer.branches.forEach(branchElement => {
            const branchOutputNodeId = processElement(branchElement, inputNodeId, model, []);

            if (branchOutputNodeId !== outputNodeId && !model.branches.some(
                (b: Branch) =>
                    (b.nodeA === branchOutputNodeId && b.nodeB === outputNodeId) ||
                    (b.nodeB === branchOutputNodeId && b.nodeA === outputNodeId)
            )) {
                model.branches.push({
                    id: `wire_close_${branchOutputNodeId}_${outputNodeId}`,
                    type: 'WIRE',
                    nodeA: branchOutputNodeId,
                    nodeB: outputNodeId,
                    resistance: 0.001,
                    voltage: 0,
                    originalElementId: `branch_container_closing_${inputNodeId}`
                });
            }
        });
        return outputNodeId;

    } else {
        const baseElement = element; 
        const outputNodeId = generateNodeId();
        model.nodes.set(outputNodeId, { id: outputNodeId });

        let resistance = baseElement.resistance ?? 0;
        const voltage = 0;
        let determinedBranchType: BranchType = 'WIRE';

        const nameLower = baseElement.name.toLowerCase();
        if (nameLower.includes('резистор')) determinedBranchType = 'RESISTOR';
        else if (nameLower.includes('двигатель')) determinedBranchType = 'MOTOR';
        else if (nameLower.includes('пускатель')) determinedBranchType = 'SWITCH';
        else if (nameLower.includes('кнопка')) determinedBranchType = 'SWITCH';
        else if (nameLower.includes('автомат')) determinedBranchType = 'FUSE';
        else if (nameLower.includes('концевой')) determinedBranchType = 'SWITCH';
        else if (nameLower.includes('лампа')) determinedBranchType = 'LAMP';
        else if (nameLower.includes('катушка')) determinedBranchType = 'COIL';

        const activeMalfunctions = baseElement.malfunctions.filter(m => m.active);
        activeMalfunctions.forEach(malfunction => {
            const mName = malfunction.name.toLowerCase();
            if (mName.includes('обрыв') || mName.includes('нет коммутации') || mName.includes('нет контакта') || mName.includes('не подтягивается')) {
                resistance = Infinity;
            }
            if (mName.includes('плохой контакт')) {
                resistance += 10; 
            }
            if (mName.includes('залипший контакт')) {
                resistance = 0.01;
            }
            if (mName.includes('короткое замыкание на землю')) {
                model.branches.push({
                    id: `${baseElement.id}_kz_ground`, type: 'GROUND_CONNECTION',
                    nodeA: outputNodeId, nodeB: model.groundNodeId,
                    resistance: 0.001, voltage: 0, originalElementId: baseElement.id
                });
            }
            if (mName.includes('короткое замыкание с') || mName.includes('кз с')) {
                 // TODO: Реализовать КЗ между элементами
            }
            // TODO: Обработать другие неисправности
        });

        const mainBranch: Branch = {
            id: `branch_${baseElement.id}`,
            type: determinedBranchType,
            nodeA: inputNodeId,
            nodeB: outputNodeId,
            resistance: resistance,
            voltage: voltage, 
            originalElementId: baseElement.id,
        };
        model.branches.push(mainBranch);

        return outputNodeId;
    }
}


export function parseCircuitState(circuitState: InitialState): CalculationModel {
    nodeCounter = 0;
    const groundNodeId = generateNodeId(); 

    const model: CalculationModel = {
        nodes: new Map<NodeId, NodeData>([[groundNodeId, { id: groundNodeId }]]), 
        branches: [],
        groundNodeId: groundNodeId,
    };

    const powerInputNode = generateNodeId();
    model.nodes.set(powerInputNode, { id: powerInputNode });
    const controlInputNode = generateNodeId();
    model.nodes.set(controlInputNode, { id: controlInputNode });

    let currentPowerNode = powerInputNode;
    circuitState.powerCircuit.forEach(element => {
        currentPowerNode = processElement(element, currentPowerNode, model);
    });

    let currentControlNode = controlInputNode;
    circuitState.controlCircuit.forEach(element => {
        if (isBaseElement(element) && element.name.toLowerCase().includes('нейтраль')) {
            model.branches.push({
                id: `branch_${element.id}`, type: 'WIRE',
                nodeA: currentControlNode,   
                nodeB: model.groundNodeId,      
                resistance: element.resistance ?? 0.001, 
                voltage: 0, originalElementId: element.id,
            });
        } else {
            currentControlNode = processElement(element, currentControlNode, model);
        }
    });

    const powerSourceVoltage = 220; 
    model.branches.push({
        id: 'power_source', type: 'VOLTAGE_SOURCE',
        nodeA: powerInputNode,    
        nodeB: model.groundNodeId, 
        resistance: 0.001,      
        voltage: powerSourceVoltage,
        originalElementId: 'SOURCE_POWER'
    });

    const controlSourceVoltage = 220;
     model.branches.push({
        id: 'control_source', type: 'VOLTAGE_SOURCE',
        nodeA: controlInputNode,   
        nodeB: model.groundNodeId, 
        resistance: 0.001,
        voltage: controlSourceVoltage,
        originalElementId: 'SOURCE_CONTROL'
    });

    return model;
}