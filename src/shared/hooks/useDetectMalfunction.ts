import { useState, useRef, useEffect, useCallback } from 'react';
import { useUserCookies } from './useUserCookies';
import { useAppDispatch, useAppSelector } from './store';
import { markMalfunctionAsFound } from '@/store/simulationSlice';
import { closeModal, openModal } from '@/store/modalSlice';

const useDetectMalfunction = () => {
    const [selectedMalfunction, setSelectedMalfunction] = useState('');
    const selectedMalfunctionRef = useRef<string>(selectedMalfunction);

    const { role } = useUserCookies();
    const isStudent = role === 'student';

    const dispatch = useAppDispatch();

    const originalMalfunctions = useAppSelector(state => state.simulation.originalMalfunctions);

    const isSelected = selectedMalfunction.length > 0;

    // Синхронизируем ref с состоянием после каждого ререндера
    useEffect(() => {
        selectedMalfunctionRef.current = selectedMalfunction;
    }, [selectedMalfunction]);

    const handleDetectMalfunction = useCallback((): void => {
        // Берём значение напрямую из ref — всегда актуальное
        const currentMalfunction = selectedMalfunctionRef.current;

        const isActiveMalfunction = originalMalfunctions.filter(item => item.id === currentMalfunction && item.active).length > 0;

        if (isActiveMalfunction) {
            dispatch(openModal('detectInfo'));
            dispatch(closeModal('setSimulation'));
            dispatch(markMalfunctionAsFound(currentMalfunction));
        } else {
            dispatch(openModal('detectInfoError'));
        }
        setSelectedMalfunction('');
    }, [dispatch]); 

    const handleSelectMalfunction = useCallback((malfunctionId: string): void => {
        setSelectedMalfunction(malfunctionId);
    }, []);

    return {
        selectedMalfunction,
        isStudent,
        isSelected,
        handleSelectMalfunction,
        handleDetectMalfunction,
    };
};

export default useDetectMalfunction;