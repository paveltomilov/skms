import { useMemo } from 'react';
import { extractMalfunctions } from '../utils/extractMalfunctionIds/extractMalfunctions';
import { useAppSelector } from './store';

export const useRequestData = () => {
    const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const access = localStorage.getItem('accessToken');
    const circuit = useAppSelector(state => state.circuit);
    const elements = useMemo(() => {
        return extractMalfunctions(circuit);
    }, [circuit]);

    return {
        urlBase,
        access,
        elements
    };
};