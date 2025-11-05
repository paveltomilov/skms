import { configRecovery } from '@/shared/configs/recovery';
import {
	RecoveryFormData,
	ValidationStatusRecovery,
} from '@/shared/types/recovery';

/**
 * Вычисляет статус валидации для всех полей формы
 */
export function computeValidationStatus(
	values: RecoveryFormData,
): ValidationStatusRecovery {
	const newValidationStatus: ValidationStatusRecovery =
		{} as ValidationStatusRecovery;

	configRecovery.forEach(({ name, required, validate }) => {
		const value: string = values[name] ?? '';

		// Сначала запускаем кастомную валидацию, если она есть
		// Это позволит проверить недопустимые символы до проверки на пустоту
		if (validate) {
			newValidationStatus[name] = validate(values);
			return;
		}

		// Если нет кастомной валидации, проверяем только обязательность
		if (required && !value.trim()) {
			newValidationStatus[name] = 0;
			return;
		}

		newValidationStatus[name] = 0;
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
	serverErrors: Record<keyof RecoveryFormData, boolean>,
): number {
	const value: string = values[field] ?? '';

	// Сначала проверяем ошибки сервера
	if (serverErrors[field]) return 1;

	// Затем проверяем статус валидации (включая предупреждения о недопустимых символах)
	if (validationStatus[field] === 1) return 1; // error
	if (validationStatus[field] === 2) return 2; // warning

	// Если поле пустое и нет предупреждений/ошибок — нейтральное состояние
	if (!value.trim()) return 0;

	// Поле заполнено и валидно
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
	activeFields: (keyof RecoveryFormData)[],
): boolean {
	if (!activeFields.includes(field)) {
		return true;
	}

	const value: string = values[field] ?? '';
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
	activeFields: (keyof RecoveryFormData)[],
): boolean {
	const allRequiredFilled: boolean = configRecovery
		.filter(c => c.required && activeFields.includes(c.name))
		.every(({ name }) => {
			const val: string = values[name];
			return (
				val !== undefined &&
				val !== null &&
				val.toString().trim() !== ''
			);
		});

	const noServerErrors: boolean = !activeFields.some(
		field => serverErrors[field],
	);

	// Проверяем только критические ошибки (level 1), warning (level 2) не блокирует кнопку
	const noErrors: boolean = !activeFields.some(
		field => validationStatus[field] === 1,
	);

	// Форма валидна если: все обязательные поля заполнены, нет серверных ошибок, нет критических ошибок
	// Warning (level 2) НЕ блокирует отправку формы
	return allRequiredFilled && noServerErrors && noErrors;
}
