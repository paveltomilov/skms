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
	});
	const [serverErrors, setServerErrors] = useState<
		Record<keyof LoginFormData, boolean>
	>({
		email: false,
		password: false,
	});
	const [isValid, setIsValid] = useState(false);

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
		});
	}, [toggleRegisterMode]);

	useEffect(() => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);
		setIsValid(
			checkFormValidity(values, newValidationStatus, serverErrors, [
				'email',
				'password',
			]),
		);
	}, [values, serverErrors]);

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
		configMap,
		handleChange,
		resetValues,
		resetServerErrors,
		setServerErrors,
		validateForm,
	};
}
