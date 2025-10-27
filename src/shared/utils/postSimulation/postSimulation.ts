import { SimulationFormData } from '@/shared/types/similation';

export async function postSimulation(
	urlBase: string | undefined,
	access: string | null,
	simulationData: SimulationFormData):
	Promise<boolean> {

	try {
		const response = await fetch(`${urlBase}/simulation/`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(simulationData),
		});

		if (response.status == 200) {
			return true;
		}
		return false;
	} catch {
		throw new Error('Данные некорректны');
	}
}