interface Malfunction {
    malfunction_id: string;
}

export interface SimulationFormData  {
    user: number;
    malfunctions: Malfunction[];
}

