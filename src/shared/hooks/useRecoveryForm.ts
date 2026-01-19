import React, { useEffect, useMemo, useState } from 'react';
import {
	RecoveryFormData,
	ValidationStatusRecovery,
} from '@/shared/types/recovery';
import {
	configRecovery,
	initialStateRecovery,
} from '@/shared/configs/recovery';
import {
	checkFormValidity,
	computeValidationStatus,
} from '@/shared/utils/recoveryFunctions/recoveryFunctions';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
	CONTAINS_DIGITS_REGEX,
	CYRILLIC_REGEX,
	DOUBLE_DASHES_OR_DOTS_REGEX,
	EMAIL_DOMAIN_MAX_LENGTH,
	EMAIL_LOCAL_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	FORBIDDEN_SYMBOLS_REGEX,
	PASSWORD_LOWERCASE_REGEX,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_SPECIAL_CHARS_REGEX,
	PASSWORD_UPPERCASE_REGEX,
	SPACES_REGEX,
	STARTS_WITH_DOT_OR_DASH_REGEX
} from '@/shared/configs/login';

type UseRecoveryFormProps = {
	steps?: number;
};

const getValidationMessage = (fieldName: keyof RecoveryFormData, value: string): string => {
	const triggedValue:string = value.trim();

	switch (fieldName) {
		case 'email':
			const atIndex:number = triggedValue.indexOf('@');
			const localPart:string = triggedValue.slice(0, atIndex);
			const domainPart:string = triggedValue.slice(atIndex + 1);

			if (localPart.length > EMAIL_LOCAL_MAX_LENGTH) {
				return 'Локальная часть (до @) ≤ 64 символов';
			}
			if (domainPart.length > EMAIL_DOMAIN_MAX_LENGTH) {
				return 'Доменная часть (после @) ≤ 63 символов не включая точку';
			}
			if (triggedValue.length > EMAIL_MAX_LENGTH - 1) {
				return `Длина Email не должна превышать ${EMAIL_MAX_LENGTH} символа`;
			}
			if (SPACES_REGEX.test(triggedValue)) {
				return 'Пробелы не допускаются';
			}
			if (CYRILLIC_REGEX.test(triggedValue)) {
				return 'Кириллица не допускается';
			}
			if (FORBIDDEN_SYMBOLS_REGEX.test(triggedValue)) {
				return 'Запрещенные символы';
			}
			if (DOUBLE_DASHES_OR_DOTS_REGEX.test(triggedValue)) {
				return 'Два тире или две точки подряд';
			}
			if (STARTS_WITH_DOT_OR_DASH_REGEX.test(localPart)) {
				return 'Начало email с точки или тире';
			}
			return 'E-mail введен не корректно';
		case 'password':
		case 'confirm_password':
			if (triggedValue.length < PASSWORD_MIN_LENGTH) {
				return 'Пароль должен содержать не менее 12 символов';
			}
			if (triggedValue.length > PASSWORD_MAX_LENGTH - 1) {
				return 'Пароль должен содержать не более 100 символов';
			}
			if (!PASSWORD_UPPERCASE_REGEX.test(triggedValue)) {
				return 'Отсутствует заглавная латинская буква';
			}
			if (!PASSWORD_LOWERCASE_REGEX.test(triggedValue)) {
				return 'Отсутствует строчная латинская буква';
			}
			if (!CONTAINS_DIGITS_REGEX.test(triggedValue)) {
				return 'Отсутствует цифра';
			}
			if (!PASSWORD_SPECIAL_CHARS_REGEX.test(triggedValue)) {
				return 'Отсутствует специальный символ';
			}
			return 'Пароль должен содержать заглавную и строчную букву, цифру и специальный символ';

		default:
			const fieldConfig = configRecovery.find(field => field.name === fieldName);
			return fieldConfig?.warnMessage || '';
	}
};

export const useRecoveryForm = ({ steps }: UseRecoveryFormProps) => {
	const [values, setValues] =
		useState<RecoveryFormData>(initialStateRecovery);
	const [validationStatus, setValidationStatus] =
		useState<ValidationStatusRecovery>({
			email: 0,
			password: 0,
			confirm_password: 0,
		});
	const [serverErrors, setServerErrors] = useState<
		Record<keyof RecoveryFormData, boolean>
	>({
		email: false,
		password: false,
		confirm_password: false,
	});
	const [isValid, setIsValid] = useState(false);

	// Дебоунс для значений полей (задержка 300мс)
	const debouncedValues = useDebounce(values, 300);

	// Формируем активные поля в зависимости от шага
	const activeFields = useMemo<(keyof RecoveryFormData)[]>(() => {
		return steps === 2 ? ['password', 'confirm_password'] : ['email'];
	}, [steps]);

	// Мапа конфигурации по имени поля для удобного доступа
	const configMap = useMemo(() => {
		const map: Record<string, (typeof configRecovery)[number]> = {};
		configRecovery.forEach(c => {
			map[c.name] = c;
		});
		return map;
	}, []);

	const getWarnMessage = (fieldName: keyof RecoveryFormData): string => {
		return getValidationMessage(fieldName, values[fieldName] || '');
	};

	// Сброс формы и ошибок при смене шага
	useEffect(() => {
		setValues(initialStateRecovery);
		setServerErrors({
			email: false,
			password: false,
			confirm_password: false,
		});
		// Сбрасываем валидацию при смене шага
		setValidationStatus({
			email: 0,
			password: 0,
			confirm_password: 0,
		});
	}, [steps]);

	// Дебоунс-валидация для остальных проверок
	useEffect(() => {
		const newValidationStatus = computeValidationStatus(debouncedValues);
		setValidationStatus(newValidationStatus);
		setIsValid(
			checkFormValidity(
				debouncedValues,
				newValidationStatus,
				serverErrors,
				activeFields,
			),
		);
	}, [debouncedValues, serverErrors, activeFields]);

	// Обработчик изменения полей формы
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		let { value } = e.target;

		// Для email только удаляем пробелы и приводим к нижнему регистру
		if (name === 'email') {
			value = value.replace(/\s+/g, '').toLowerCase();
		}

		const key = name as keyof RecoveryFormData;

		if (serverErrors[key]) {
			setServerErrors(prev => ({ ...prev, [key]: false }));
		}
		setValues(prev => ({ ...prev, [name]: value }));
	};

	// Валидация формы при сабмите
	const validateForm = (): boolean => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);

		const hasLocalErrors = Object.values(newValidationStatus).some(
			level => level === 1,
		);
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
		getWarnMessage,
		configMap,
		validateForm,
		resetServerErrors,
		setServerErrors,
	};
};
