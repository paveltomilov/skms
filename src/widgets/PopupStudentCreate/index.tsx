import { FC, FormEventHandler, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LoginInput from '@/shared/UI/LoginInput';
import { useLoginForm } from '@/shared/hooks/useLoginForm';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { postRegistration } from '@/shared/lib/registration';
import RegistrationMessage from '../RegistrationMessage/RegistrationMessage';
import { LoginFormData } from '@/shared/types/login';
import { getRandomPassword } from '@/shared/utils/getRandomPassword/getRandomPassword';
import { useAppDispatch } from '@/shared/hooks/store';
import { updateList } from '@/store/updateListSlice';
import { FieldConfig } from '../Form';

const PASSWORD_ERROR = {
	email: false,
	password: true,
	first_name: false,
	last_name: false,
};

export const PopupStudentCreate: FC = () => {
	const modeForm = 'createUser' as const;
	const {
		isValid,
		values,
		validationStatus,
		serverErrors,
		activeFields,
		configMap,
		handleChange,
		resetServerErrors,
		setServerErrors,
	} = useLoginForm({ toggleRegisterMode: modeForm });

	const dispatch = useAppDispatch();
	const [responseData, setResponseData] = useState<LoginFormData | null>(
		null,
	);
	const fieldConfigs: FieldConfig[] = [
		{
			name: 'last_name',
			label: 'Фамилия',
			type: 'text',
			placeholder: 'Фамилия',
		},
		{
			name: 'first_name',
			label: 'Имя',
			type: 'text',
			placeholder: 'Имя',
		},
		{ name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
	];

	// Функция для рендеринга поля
	const renderField = (field: FieldConfig) => {
		const { name, label, type, placeholder } = field;
		const hasError = serverErrors[name];
		const hasWarn = !hasError && validationStatus[name] === 2;
		const customErrorText = name === 'password' && undefined;
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
				warnMessage={hasWarn ? configMap[name]?.warnMessage : undefined}
				required={configMap[name]?.required}
			/>
		);
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		resetServerErrors();
		if (!isValid) return;
		handleRegistration();
	};
	const handleRegistration = async () => {
		const dataForm: LoginFormData = {
			...values,
			password: getRandomPassword(12),
		};
		try {
			const response = await postRegistration(dataForm);
			if (response.success) {
				setResponseData(dataForm);
				dispatch(updateList());
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
			console.error('Ошибка при регистрации');
			setServerErrors(PASSWORD_ERROR);
		}
	};
	return (
		<div className={styles.popup}>
			{!responseData ? (
				<form onSubmit={handleSubmit} className={styles.form}>
					{fieldConfigs.map(renderField)}
					<Button
						className={styles.button}
						width={344}
						height={55}
						text="Создать ученика"
						success={isValid}
					/>
				</form>
			) : (
				RegistrationMessage(responseData)
			)}
		</div>
	);
};