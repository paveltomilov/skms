export type ActuatorState = 'on' | 'off' | 'no power';

export interface IActuator {
	name: string;
	state: ActuatorState;
}
