import React, { useEffect, useMemo, useState, useRef } from 'react';
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
		login: 0,
		email: 0,
		password: 0,
	});
	const [serverErrors, setServerErrors] = useState<
		Record<keyof LoginFormData, boolean>
	>({
		login: false,
		email: false,
		password: false,
	});
	const [isValid, setIsValid] = useState(false);
	const [isPasted, setIsPasted] = useState(false);
	const [fieldsTouched, setFieldsTouched] = useState<
		Record<keyof LoginFormData, boolean>
	>({
		login: false,
		email: false,
		password: false,
	});
	const pasteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const activeFields = useMemo<(keyof LoginFormData)[]>(() => {
		return toggleRegisterMode
			? ['login', 'password', 'email']
			: ['login', 'password'];
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
			login: false,
			email: false,
			password: false,
		});
		setIsPasted(false);
		setFieldsTouched({
			login: false,
			email: false,
			password: false,
		});
	}, [toggleRegisterMode]);

	useEffect(() => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);

		const allRequiredFieldsFilled = activeFields.every(field => {
			const fieldConfig = configMap[field];
			if (fieldConfig?.required) {
				return values[field]?.trim() !== '';
			}
			return true;
		});

		const formIsValid = checkFormValidity(
			values,
			newValidationStatus,
			serverErrors,
			activeFields,
		);
		setIsValid(formIsValid || allRequiredFieldsFilled || isPasted);
	}, [values, serverErrors, activeFields, isPasted, configMap]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const key = name as keyof LoginFormData;

		if (serverErrors[key]) {
			setServerErrors(prev => ({ ...prev, [key]: false }));
		}

		if (!fieldsTouched[key]) {
			setFieldsTouched(prev => ({ ...prev, [key]: true }));
		}

		setValues(prev => ({ ...prev, [name]: value }));

		if (isPasted) {
			setIsPasted(false);
		}
	};

	const handlePaste = (
		e: React.ClipboardEvent<HTMLInputElement>,
		fieldName: keyof LoginFormData,
	) => {
		const pastedValue = e.clipboardData.getData('text');

		setIsPasted(true);

		if (pasteTimeoutRef.current) {
			clearTimeout(pasteTimeoutRef.current);
		}

		pasteTimeoutRef.current = setTimeout(() => {
			setIsPasted(false);
		}, 1500);

		if (!fieldsTouched[fieldName]) {
			setFieldsTouched(prev => ({ ...prev, [fieldName]: true }));
		}

		if (serverErrors[fieldName]) {
			setServerErrors(prev => ({ ...prev, [fieldName]: false }));
		}
		setValues(prev => ({ ...prev, [fieldName]: pastedValue }));
	};

	const forceValidation = () => {
		const newValidationStatus = computeValidationStatus(values);
		setValidationStatus(newValidationStatus);

		const newTouched = { ...fieldsTouched };
		activeFields.forEach(field => {
			newTouched[field] = true;
		});
		setFieldsTouched(newTouched);

		return checkFormValidity(
			values,
			newValidationStatus,
			serverErrors,
			activeFields,
		);
	};

	const resetValues = (newValues: LoginFormData = initialState) => {
		setValues(newValues);
	};

	const resetServerErrors = () => {
		setServerErrors({
			login: false,
			email: false,
			password: false,
		});
	};

	const validateForm = (): boolean => {
		return forceValidation();
	};

	useEffect(() => {
		return () => {
			if (pasteTimeoutRef.current) {
				clearTimeout(pasteTimeoutRef.current);
			}
		};
	}, []);

	return {
		values,
		validationStatus,
		serverErrors,
		isValid,
		activeFields,
		configMap,
		handleChange,
		handlePaste,
		forceValidation, 
		resetValues,
		resetServerErrors,
		setServerErrors,
		validateForm,
		isPasted,
		fieldsTouched,
	};
}
