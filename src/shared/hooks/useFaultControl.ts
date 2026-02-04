import {useCallback, useState} from 'react';

export const useFaultControl = (initialFaultState = false) => {
    const [isFaultActive, setIsFaultActive] = useState<boolean>(initialFaultState);

    const activateFault = useCallback(() => {
        setIsFaultActive(true);
    }, []);

    const deactivateFault = useCallback(() => {
        setIsFaultActive(false);
    }, []);

    const toggleFault = useCallback(() => {
        setIsFaultActive(prev => !prev);
    }, []);

    return {
        isFaultActive,
        activateFault,
        deactivateFault,
        toggleFault,
    };
};