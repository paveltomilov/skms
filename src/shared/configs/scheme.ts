import { InitialStateScheme } from '../types/scheme';
import { controlCircuit } from './controlCircuit/controlCircuit';
import { powerCircuit } from './powerCircuit/powerCircuit';

export const initialStateScheme: InitialStateScheme = {
	powerCircuit,
	controlCircuit,
};
