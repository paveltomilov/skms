import React, { useEffect, useMemo, useState } from 'react';
import { LoginFormData, ValidationStatus } from '@/shared/types/login';
import { config, initialState } from '@/shared/configs/login';
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
		case 'password':
			if (triggedValue.length < 12) {
				return 'Пароль должен содержать не менее 12 символов';
			}
			if (triggedValue.length > 20) {
				return 'Пароль должен содержать не более 20 символов';
			}
			if (!/[A-Z]/.test(triggedValue)) {
				return 'Отсутствует символ в верхнем регистре';
			}
			if (/[а-яёА-ЯЁ]/.test(triggedValue)) {
				return 'Пароль не должен содержать кириллицу';
			}
			return 'Пароль должен содержать заглавную и строчную букву, цифру и специальный символ';

		case 'first_name':
		case 'last_name':
			if (triggedValue.length > 64) {
				return 'Поле должно содержать не более 64 символов';
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
