import axios, { AxiosError } from 'axios';
import { CircuitElement } from '@/shared/types/scheme';

export const postMalfunctions = async (
    urlBase: string | undefined,
    elements: CircuitElement[]
): Promise<boolean[]> => {
    const requests = elements.flatMap(element =>
        element.malfunctions.map(async ({ id, name }) => {
            const data = {
                malfunction_id: id,
                description: `${name}(${element.name})`.slice(0, 99),
            };

            try {
                await axios
                    .post(`${urlBase}/malfunction/`, data);
                return true;
            } catch (error) {
                const axiosError = error as AxiosError;
                const message = axiosError.response?.data
                    ? JSON.stringify(axiosError.response.data)
                    : 'Failed to fetch';
                throw new Error(message);
            }
        })
    );

    try {
        const results = await Promise.all(requests);
        return results;
    } catch (error) {
        const axiosError = error as AxiosError;
        const message = axiosError.response?.data
            ? JSON.stringify(axiosError.response.data)
            : 'Failed to fetch';
        throw new Error(message);
    }
};

