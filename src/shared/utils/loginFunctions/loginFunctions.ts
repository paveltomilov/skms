import { config } from '@/shared/configs/login';
import { LoginFormData, ValidationStatus } from '@/shared/types/login';

/**
 * Вычисляет статус валидации для всех полей формы
 */
export function computeValidationStatus(
	values: LoginFormData,
): ValidationStatus {
	const newValidationStatus: ValidationStatus = {
		email: 0,
		password: 0,
	};

	config.forEach(({ name, validate }) => {
		if (validate) {
			newValidationStatus[name] = validate(values);
		}
	});

	return newValidationStatus;
}

/**
 * Возвращает индикатор состояния поля (число 0-3)
 */
export function getIndicator(
	field: keyof LoginFormData,
	values: LoginFormData,
	validationStatus: ValidationStatus,
	serverErrors: Record<keyof LoginFormData, boolean>,
): number {
	const value: string = values[field] ?? '';

	if (!value.trim()) return 0;

	if (serverErrors[field] || validationStatus[field] === 1) return 1;

	if (validationStatus[field] === 2) return 2;

	if (validationStatus[field] === 3) return 3;

	return 0;
}
/**
 * Проверяет, считается ли поле "завершённым" (done)
 */

export function getDone(
	field: keyof LoginFormData,
	values: LoginFormData,
	validationStatus: ValidationStatus,
	serverErrors: Record<keyof LoginFormData, boolean>,
): boolean {
	const value: string = values[field] ?? '';

	if (!value.trim()) return false;

	if (serverErrors[field] || validationStatus[field] === 1) return false;

	return validationStatus[field] === 3;
}

/**
 * Проверяет валидность всей формы
 */

export function checkFormValidity(
	values: LoginFormData,
	validationStatus: ValidationStatus,
	serverErrors: Record<keyof LoginFormData, boolean>,
	activeFields: (keyof LoginFormData)[],
): boolean {
	// Проверяем, что все обязательные поля заполнены
	const allRequiredFilled: boolean = config
		.filter(c => c.required && activeFields.includes(c.name))
		.every(({ name }) => {
			const val: string = values[name] ?? '';
			return val.trim() !== '';
		});

	// Проверяем, что нет серверных ошибок
	const noServerErrors: boolean = !activeFields.some(
		field => serverErrors[field],
	);

	// Проверяем, что нет ошибок валидации (статус 1)
	const noValidationErrors: boolean = !activeFields.some(
		field => validationStatus[field] === 1,
	);

	// Проверяем, что все активные поля имеют статус 3 (OK)
	const allFieldsValid: boolean = activeFields.every(
		field => validationStatus[field] === 3,
	);

	return (
		allRequiredFilled &&
		noServerErrors &&
		noValidationErrors &&
		allFieldsValid
	);
}
