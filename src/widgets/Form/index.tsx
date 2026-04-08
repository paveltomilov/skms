'use client';

import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { FC, FormEventHandler, useState } from 'react';
import LoginInput from '../../shared/UI/LoginInput';
import Link from 'next/link';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { useLoginForm } from '@/shared/hooks/useLoginForm';
import { postAuth, postRegistration } from '@/shared/api';
import { LoginFormData } from '@/shared/types/login';
import { getDashboardRoute, UserRole } from '@/shared/configs/routes';
import {
	EMAIL_MAX_LENGTH,
	NAME_SURNAME_MAX_LENGTH,
	PASSWORD_MAX_LENGTH,
} from '@/shared/configs/login';

interface FormProps {
	toggleRegisterMode: 'register' | 'login' | 'createUser';
	activateModalSuccess?: (value: boolean) => void;
}
const PASSWORD_ERROR = {
	email: false,
	password: true,
	first_name: false,
	last_name: false,
};
export interface FieldConfig {
	name: keyof LoginFormData;
	label: string;
	type: string;
	placeholder: string;
	maxLength: number;
}

const Form: FC<FormProps> = ({ toggleRegisterMode, activateModalSuccess }) => {
	const router = useRouter();
	const {
		values,
		validationStatus,
		serverErrors,
		isValid,
		activeFields,
		configMap,
		rememberMe,
		policyAccepted,
		handleChange,
		handleRememberMeChange,
		handlePolicyChange,
		resetServerErrors,
		setServerErrors,
		validateForm,
		getWarnMessage,
	} = useLoginForm({ toggleRegisterMode });

	const [authErrorText, setAuthErrorText] = useState<string | undefined>(
		undefined,
	);

	// Конфигурация полей формы
	const fieldConfigs: FieldConfig[] = [
		...((toggleRegisterMode === 'register'
			? [
					{
						name: 'first_name',
						label: 'Имя',
						type: 'text',
						placeholder: 'Имя',
						maxLength: NAME_SURNAME_MAX_LENGTH + 1,
					},
					{
						name: 'last_name',
						label: 'Фамилия',
						type: 'text',
						placeholder: 'Фамилия',
						maxLength: NAME_SURNAME_MAX_LENGTH + 1,
					},
			  ]
			: []) as FieldConfig[]),
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Email',
			maxLength: EMAIL_MAX_LENGTH,
		},
		{
			name: 'password',
			label: 'Пароль',
			type: 'password',
			placeholder: 'Пароль',
			maxLength: PASSWORD_MAX_LENGTH + 1,
		},
	];

	// Функция для рендеринга поля
	const renderField = (field: FieldConfig) => {
		const { name, label, type, placeholder, maxLength } = field;
		const hasError = serverErrors[name];
		const hasWarn = !hasError && validationStatus[name] === 2;

		const customErrorText = name === 'password' ? authErrorText : undefined;
		return (
			<LoginInput
				key={name}
				label={label}
				type={type}
				name={name}
				onChange={handleChange}
				value={values[name] || ''}
				placeholder={placeholder}
				id={name}
				indicator={getIndicator(
					name,
					values,
					validationStatus,
					serverErrors,
				)}
				done={getDone(
					name,
					values,
					validationStatus,
					serverErrors,
					activeFields,
				)}
				error={hasError}
				warn={hasWarn}
				errorMessage={
					hasError
						? customErrorText || configMap[name]?.errorMessage
						: undefined
				}
				warnMessage={hasWarn ? getWarnMessage(name) : undefined}
				required={configMap[name]?.required}
				maxLength={maxLength}
			/>
		);
	};

	// Обработка регистрации
	const handleRegistration = async () => {
		try {
			const response = await postRegistration(values);

			if (response.success && activateModalSuccess) {
				activateModalSuccess(true);
			}

			if (response.errors) {
				setServerErrors({
					email: !!response.errors.email,
					password: !!response.errors.password,
					first_name: !!response.errors.first_name,
					last_name: !!response.errors.last_name,
				});
			}
		} catch {
			setServerErrors(PASSWORD_ERROR);
		}
	};

	// Обработка авторизации
	const handleAuth = async () => {
		try {
			const response = await postAuth(values, rememberMe);
			if (response.success) {
				router.push(getDashboardRoute(response.role as UserRole));
			} else {
				setServerErrors(PASSWORD_ERROR);
				setAuthErrorText(
					response.errorText || 'Неверные учётные данные',
				);
			}
		} catch (error) {
			setServerErrors(PASSWORD_ERROR);
			const errorMessage =
				error instanceof Error
					? error.message 
					: 'Произошла ошибка при авторизации';
			setAuthErrorText(errorMessage);
		}
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		resetServerErrors();

		if (!validateForm()) return;

		if (toggleRegisterMode === 'register') {
			await handleRegistration();
		} else {
			await handleAuth();
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{fieldConfigs.map(renderField)}

			<div
				className={`${styles.form_inner} ${
					toggleRegisterMode === 'register' ? styles.policy : ''
				}`}
			>
				<label className={styles.form_inner_label}>
					<input
						type="checkbox"
						name={
							toggleRegisterMode === 'register'
								? 'policy'
								: 'remember'
						}
						className={styles.form_inner_label__checkbox}
						checked={
							toggleRegisterMode === 'register'
								? policyAccepted
								: rememberMe
						}
						onChange={e =>
							toggleRegisterMode === 'register'
								? handlePolicyChange(e.target.checked)
								: handleRememberMeChange(e.target.checked)
						}
					/>
					{toggleRegisterMode === 'register'
						? 'Соглашаюсь на'
						: 'Запомнить'}
				</label>
				<Link
					href={
						toggleRegisterMode === 'register'
							? '/policy'
							: '/recovery'
					}
					className={styles.form_inner__forget}
				>
					{toggleRegisterMode === 'register'
						? 'обработку персональных данных'
						: 'Забыли пароль?'}
				</Link>
			</div>

			<Button
				width={toggleRegisterMode === 'register' ? 278 : 171}
				height={55}
				aria-label={
					toggleRegisterMode === 'register' ? 'Подтвердить' : 'Войти'
				}
				text={
					toggleRegisterMode === 'register' ? 'Подтвердить' : 'Войти'
				}
				className={styles.form__button}
				disabled={!isValid}
			/>
		</form>
	);
};

export default Form;
