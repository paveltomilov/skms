interface Malfunction {
	malfunction_id: string;
}

export interface SimulationFormData {
	user: number;
	malfunctions: Malfunction[];
}

export interface SimulationGetData {
	id: number;
	owner: number;
    user: number;
    created_at: Date;
    active: boolean;
    time_spent: number;
    malfunctions: Malfunction[]
}
