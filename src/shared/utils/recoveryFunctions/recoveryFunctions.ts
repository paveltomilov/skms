import {configRecovery} from '@/shared/configs/recovery';
import {RecoveryFormData, ValidationStatusRecovery} from '@/shared/types/recovery';


/**
 * Вычисляет статус валидации для всех полей формы
 */
export function computeValidationStatus(values: RecoveryFormData): ValidationStatusRecovery {
    const newValidationStatus: ValidationStatusRecovery = {} as ValidationStatusRecovery;

    configRecovery.forEach(({ name, required, validate }) => {
        const value:string = values[name] ?? '';
        if (required && !value.trim()) {
            newValidationStatus[name] = 0;
            return;
        }
        if (validate) {
            newValidationStatus[name] = validate(values);
            return newValidationStatus;
        } else {
            newValidationStatus[name] = 0;
        }
    });
    return newValidationStatus;
}

/**
 * Возвращает индикатор состояния поля (число 0-3)
 */
export function getIndicator(
    field: keyof RecoveryFormData,
    values: RecoveryFormData,
    validationStatus: ValidationStatusRecovery,
    serverErrors: Record<keyof RecoveryFormData, boolean>
): number {
    const value:string = values[field] ?? '';

    if (!value.trim()) return 0;
    if (serverErrors[field]) return 1;
    if (validationStatus[field] === 1) return 1;
    if (validationStatus[field] === 2) return 2;
    return 3;
}

/**
 * Проверяет, считается ли поле "завершённым" (done)
 */
export function getDone(
    field: keyof RecoveryFormData,
    values: RecoveryFormData,
    validationStatus: ValidationStatusRecovery,
    serverErrors: Record<keyof RecoveryFormData, boolean>,
    activeFields: (keyof RecoveryFormData)[]
): boolean {
    if (!activeFields.includes(field)) {
        return true;
    }

    const value:string = values[field] ?? '';
    const fieldConfig = configRecovery.find(c => c.name === field);

    if (!fieldConfig) {
        return false;
    }

    if (!fieldConfig.required && !value.trim()) {
        return true;
    }

    if (!value.trim()) {
        return false;
    }

    if (serverErrors[field]) {
        return false;
    }

    if (validationStatus[field] === 1) {
        return false;
    }

    return validationStatus[field] !== 2;

}

/**
 * Проверяет валидность всей формы
 */
export function checkFormValidity(
    values: RecoveryFormData,
    validationStatus: ValidationStatusRecovery,
    serverErrors: Record<keyof RecoveryFormData, boolean>,
    activeFields: (keyof RecoveryFormData)[]
): boolean {
    const allRequiredFilled:boolean = configRecovery
        .filter(c => c.required && activeFields.includes(c.name))
        .every(({ name }) => {
            const val:string = values[name];
            return val !== undefined && val !== null && val.toString().trim() !== '';
        });

    const noServerErrors:boolean = !activeFields.some(field => serverErrors[field]);
    const noWarn:boolean = !activeFields.some(field => validationStatus[field] === 1 && !serverErrors[field]);
    const allDone:boolean = activeFields.every(field => getDone(field, values, validationStatus, serverErrors, activeFields));

    return allRequiredFilled && noServerErrors && noWarn && allDone;
}