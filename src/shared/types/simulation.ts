interface Malfunction {
	malfunction_id: string;
}

export interface SimulationFormData {
	user: number;
	malfunctions: Malfunction[];
	gate: string;
}

export interface SimulationGetData {
	id: number;
	owner: number;
	user: number;
	created_at: Date;
	active: boolean;
	time_spent: number;
	malfunctions: Malfunction[];
}

export interface SimulationItemData {
	malfunction_id: string;
	element: string;
	element_id: string;
	malfunctions: string;
}
