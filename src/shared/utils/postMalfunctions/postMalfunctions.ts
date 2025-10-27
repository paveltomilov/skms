import { CircuitElement } from '../../types/scheme';

export const postMalfunctions = (urlBase:string|undefined, access:string|null, elements:CircuitElement[]) => {

    elements.forEach(element => {
        setTimeout(() => {
            element.malfunctions.forEach(({ id, name }) => {
                setTimeout(async () => {
                    const data = {
                        malfunction_id: id,
                        description: `${name}(${element.name})`.slice(0, 99)
                    };
                    try {
                        const response = await fetch(`${urlBase}/malfunction/`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${access}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data),
                        });

                        if (response.status == 200) {
                            return true;
                        }
                        return false;
                    } catch {
                        throw new Error('Данные некорректны');
                    }
                }, 500);
            });

        }, 2000);
    });
};
