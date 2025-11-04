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

type UseRecoveryFormProps = {
	steps?: number;
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

	// Мгновенная валидация при вводе (для недопустимых символов)
	useEffect(() => {
		// Проверяем только активные поля
		activeFields.forEach(field => {
			const value = values[field] ?? '';

			// Для email проверяем кириллицу
			if (field === 'email') {
				const cyrillicPattern = /[а-яёА-ЯЁ]/;
				if (cyrillicPattern.test(value)) {
					setValidationStatus(prev => ({ ...prev, [field]: 2 }));
				}
			}

			// Для пароля проверяем кириллицу и запрещённые символы
			if (field === 'password' || field === 'confirm_password') {
				const cyrillicPattern = /[а-яёА-ЯЁ]/;
				const forbiddenSymbolsPattern = /[@#!]/;
				if (
					cyrillicPattern.test(value) ||
					forbiddenSymbolsPattern.test(value)
				) {
					setValidationStatus(prev => ({ ...prev, [field]: 2 }));
				}
			}
		});
	}, [values, activeFields]);

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
		// НЕ удаляем кириллицу, чтобы валидация могла показать предупреждение
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
		configMap,
		validateForm,
		resetServerErrors,
		setServerErrors,
	};
};
