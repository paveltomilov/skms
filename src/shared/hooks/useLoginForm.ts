import React, { useEffect, useMemo, useState } from 'react';
import { LoginFormData, ValidationStatus } from '@/shared/types/login';
import {
	config,
	CONTAINS_DIGITS_REGEX,
	CYRILLIC_REGEX,
	DOUBLE_DASHES_OR_DOTS_REGEX,
	DOUBLE_DASHES_REGEX, DOUBLE_SPACES_REGEX,
	EMAIL_DOMAIN_MAX_LENGTH,
	EMAIL_LOCAL_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	FORBIDDEN_SYMBOLS_REGEX,
	initialState,
	NAME_SURNAME_MAX_LENGTH,
	PASSWORD_LOWERCASE_REGEX,
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	PASSWORD_SPECIAL_CHARS_REGEX,
	PASSWORD_UPPERCASE_REGEX,
	SPACES_REGEX,
	STARTS_WITH_DOT_OR_DASH_REGEX
} from '@/shared/configs/login';
import {
	checkFormValidity,
	computeValidationStatus,
} from '@/shared/utils/loginFunctions/loginFunctions';

export interface UseLoginFormProps {
	toggleRegisterMode: 'register' | 'login' | 'createUser';
}

const getValidationMessage = (fieldName: keyof LoginFormData, value: string): string => {
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
				return 'Доменная часть (после @) ≤ 63 символов';
			}
			if (triggedValue.length > EMAIL_MAX_LENGTH) {
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
			if (triggedValue.length < PASSWORD_MIN_LENGTH) {
				return `Пароль должен содержать не менее ${PASSWORD_MIN_LENGTH} символов`;
			}
			if (triggedValue.length > PASSWORD_MAX_LENGTH) {
				return `Пароль должен содержать не более ${PASSWORD_MAX_LENGTH} символов`;
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

		case 'first_name':
		case 'last_name':
			if (triggedValue.length > NAME_SURNAME_MAX_LENGTH) {
				return `Поле должно содержать не более ${NAME_SURNAME_MAX_LENGTH} символов`;
			}
			if (DOUBLE_SPACES_REGEX.test(triggedValue)) {
				return 'Не допускается более двух пробелов подряд';
			}
			if (CYRILLIC_REGEX.test(triggedValue)) {
				return 'Не допускается кириллица';
			}
			if (DOUBLE_DASHES_REGEX.test(triggedValue)) {
				return 'Не допускается более двух тире подряд';
			}
			return 'Поле может содержать только буквы латиницы, пробел, тире и цифры';

		default:
			const fieldConfig = config.find(field => field.name === fieldName);
			return fieldConfig?.warnMessage || '';
	}
};

export function useLoginForm({ toggleRegisterMode }: UseLoginFormProps) {
	const [values, setValues] = useState<LoginFormData>(initialState);
	const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
		email: 0,
		password: 0,
		first_name: 0,
		last_name: 0,
	});
	const [serverErrors, setServerErrors] = useState<
		Record<keyof LoginFormData, boolean>
	>({
		email: false,
		password: false,
		first_name: false,
		last_name: false,
	});
	const [isValid, setIsValid] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	// Для регистрации: согласие на обработку персональных данных
	const [policyAccepted, setPolicyAccepted] = useState(false);
	const activeFields = useMemo<(keyof LoginFormData)[]>(() => {
		if (toggleRegisterMode === 'register')
			return ['first_name', 'last_name', 'password', 'email'];
		if (toggleRegisterMode === 'createUser')
			return ['first_name', 'last_name', 'email'];
		return ['email', 'password'];
	}, [toggleRegisterMode]);

	const configMap = useMemo(() => {
		const map: Record<string, (typeof config)[number]> = {};
		config.forEach(c => {
			map[c.name] = c;
		});
		return map;
	}, []);

	const getWarnMessage = (fieldName: keyof LoginFormData): string => {
		return getValidationMessage(fieldName, values[fieldName] || '');
	};

	useEffect(() => {
		setValues(initialState);
		setServerErrors({
			email: false,
			password: false,
			first_name: false,
			last_name: false,
		});
		// Сброс состояния чекбоксов при переключении режимов
		setRememberMe(false);
		setPolicyAccepted(false);
	}, [toggleRegisterMode]);

	useEffect(() => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);
		const baseValid = checkFormValidity(
			values,
			newValidationStatus,
			serverErrors,
			activeFields,
		);
		// В режиме регистрации учитываем согласие на обработку данных
		setIsValid(() => {
			if (
				toggleRegisterMode === 'login' ||
				toggleRegisterMode === 'createUser'
			) {
				return baseValid;
			}
			return baseValid && policyAccepted;
		});
	}, [
		values,
		serverErrors,
		activeFields,
		toggleRegisterMode,
		policyAccepted,
	]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const key = name as keyof LoginFormData;

		if (serverErrors[key]) {
			setServerErrors(prev => ({ ...prev, [key]: false }));
		}
		setValues(prev => ({ ...prev, [name]: value }));
	};

	const resetValues = (newValues: LoginFormData = initialState) => {
		setValues(newValues);
	};

	const resetServerErrors = () => {
		setServerErrors({
			email: false,
			password: false,
			first_name: false,
			last_name: false,
		});
	};

	const validateForm = (): boolean => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);

		const hasLocalErrors = Object.values(newValidationStatus).some(
			level => level === 1,
		);
		const hasServerErrors = Object.values(serverErrors).some(Boolean);
		const base = !hasLocalErrors && !hasServerErrors;

		if (
			toggleRegisterMode === 'login' ||
			toggleRegisterMode === 'createUser'
		) {
			return base;
		}
		return base && policyAccepted;
	};

	const handleRememberMeChange = (checked: boolean) => {
		setRememberMe(checked);
	};

	const handlePolicyChange = (checked: boolean) => {
		setPolicyAccepted(checked);
	};

	return {
		values,
		validationStatus,
		serverErrors,
		isValid,
		activeFields,
		configMap,
		rememberMe,
		policyAccepted,
		getWarnMessage,
		handleChange,
		handleRememberMeChange,
		handlePolicyChange,
		resetValues,
		resetServerErrors,
		setServerErrors,
		validateForm,
	};
}
