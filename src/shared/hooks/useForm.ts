import {useCallback, useState} from 'react';

export function useForm<T>(inputValues: T) {
    const [values, setValues] = useState<T>(inputValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const resetValues = useCallback((newValues: T) => {
        setValues(newValues);
    }, []);

    return {
        values,
        handleChange,
        setValues,
        resetValues,
    };
}
