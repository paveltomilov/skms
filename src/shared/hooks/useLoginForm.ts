import React, { useEffect, useMemo, useState } from 'react';
import { LoginFormData, ValidationStatus } from '@/shared/types/login';
import { config, initialState } from '@/shared/configs/login';
import {
	checkFormValidity,
	computeValidationStatus,
} from '@/shared/utils/loginFunctions/loginFunctions';

interface UseLoginFormProps {
	toggleRegisterMode?: boolean;
}

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
	const activeFields = useMemo<(keyof LoginFormData)[]>(() => {
		return toggleRegisterMode
			? ['first_name', 'last_name', 'password', 'email']
			: ['email', 'password'];
	}, [toggleRegisterMode]);

	const configMap = useMemo(() => {
		const map: Record<string, (typeof config)[number]> = {};
		config.forEach(c => {
			map[c.name] = c;
		});
		return map;
	}, []);

	useEffect(() => {
		setValues(initialState);
		setServerErrors({
			email: false,
			password: false,
			first_name: false,
			last_name: false,
		});
	}, [toggleRegisterMode]);

	useEffect(() => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);
		setIsValid(
			checkFormValidity(
				values,
				newValidationStatus,
				serverErrors,
				activeFields,
			),
		);
	}, [values, serverErrors, activeFields]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		let { value } = e.target;
		// Блокируем кириллицу в email: удаляем символы кириллицы и пробелы, приводим к нижнему регистру
		if (name === 'email') {
			value = value
				.replace(/[а-яёА-ЯЁ]/g, '')
				.replace(/\s+/g, '')
				.toLowerCase();
		}
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
		return !hasLocalErrors && !hasServerErrors;
	};

	return {
		values,
		validationStatus,
		serverErrors,
		isValid,
		activeFields,
		configMap,
		handleChange,
		resetValues,
		resetServerErrors,
		setServerErrors,
		validateForm,
	};
}
