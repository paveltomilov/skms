import {useEffect, useMemo, useState} from 'react';
import {RecoveryFormData, ValidationStatusRecovery} from '@/shared/types/recovery';
import {configRecovery, initialStateRecovery} from '@/shared/configs/recovery';
import {checkFormValidity, computeValidationStatus} from '@/shared/utils/recoveryFunctions/recoveryFunctions';

type UseRecoveryFormProps = {
    steps?: number;
}

export const useRecoveryForm = ({steps}: UseRecoveryFormProps) => {
    const [values, setValues] = useState<RecoveryFormData>(initialStateRecovery);
    const [validationStatus, setValidationStatus] = useState<ValidationStatusRecovery>({
        email: 0,
        password: 0,
        confirm_password: 0,
    });
    const [serverErrors, setServerErrors] = useState<Record<keyof RecoveryFormData, boolean>>({
        email: false,
        password: false,
        confirm_password: false,
    });
    const [isValid, setIsValid] = useState(false);

    // Формируем активные поля в зависимости от шага
    const activeFields = useMemo<(keyof RecoveryFormData)[]>(() => {
        return steps === 2 ? ['password', 'confirm_password'] : ['email'];
    }, [steps]);

    // Мапа конфигурации по имени поля для удобного доступа
    const configMap = useMemo(() => {
        const map: Record<string, typeof configRecovery[number]> = {};
        configRecovery.forEach(c => {
            map[c.name] = c;
        });
        return map;
    }, []);

    // Сброс формы и ошибок при смене шага
    useEffect(() => {
        setValues(initialStateRecovery);
        setServerErrors({
            email: false,
            password: false,
            confirm_password: false,
        });
    }, [steps]);

    // Обновление статуса валидации и общей валидности при изменении значений, ошибок и активных полей
    useEffect(() => {
        const newValidationStatus = computeValidationStatus(values);
        setValidationStatus(newValidationStatus);
        setIsValid(checkFormValidity(values, newValidationStatus, serverErrors, activeFields));
    }, [values, serverErrors, activeFields]);

    // Обработчик изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    // Валидация формы при сабмите
    const validateForm = (): boolean => {
        const newValidationStatus = computeValidationStatus(values);
        setValidationStatus(newValidationStatus);

        const hasLocalErrors = Object.values(newValidationStatus).some(level => level === 1);
        const hasServerErrors = Object.values(serverErrors).some(Boolean);
        return !hasLocalErrors && !hasServerErrors;
    };

    // Сброс ошибок сервера
    const resetServerErrors = () => {
        setServerErrors({
            email: false,
            password: false,
            confirm_password: false,
        });
    };

    return {
        values,
        handleChange,
        validationStatus,
        serverErrors,
        isValid,
        activeFields,
        configMap,
        validateForm,
        resetServerErrors,
        setServerErrors,
    };
};