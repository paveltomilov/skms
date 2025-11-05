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
import { generateStringArray } from '@/shared/utils/getRandomPassword/getRandomPassword';

const PASSWORD_ERROR = {
	email: false,
	password: true,
	first_name: false,
	last_name: false,
};

export const PopupStudentCreate: FC = () => {
	const {
		values,
		validationStatus,
		serverErrors,
		activeFields,
		configMap,
		handleChange,
		resetServerErrors,
		setServerErrors,
		validateForm,
	} = useLoginForm({ toggleRegisterMode: true });

	const [responseData, setResponseData] = useState<LoginFormData | null>(
		null,
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		resetServerErrors();

		if (!validateForm()) return;

		handleRegistration();
	};

	const handleRegistration = async () => {
		const dataForm: LoginFormData = {
			...values,
			password: generateStringArray(12),
		};
		try {
			const response = await postRegistration(dataForm);

			if (response.success) {
				setResponseData(dataForm);
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
					<LoginInput
						label={'Фамилия ученика'}
						type={'text'}
						name={'first_name'}
						onChange={handleChange}
						value={values.first_name || ''}
						placeholder={'Фамилия ученика'}
						id={'first_name'}
						indicator={getIndicator('first_name',values,validationStatus,serverErrors)}
						done={getDone('first_name',values,validationStatus,serverErrors,activeFields)}
						error={serverErrors.first_name}
						warn={!serverErrors.first_name && validationStatus.first_name === 2}
						errorMessage={serverErrors.first_name ? configMap.first_name?.errorMessage: undefined}
						warnMessage={!serverErrors.first_name && validationStatus.first_name === 2 ? configMap.first_name?.warnMessage: undefined}
						required={configMap.first_name?.required}
					/>
					<LoginInput
						label={'Имя ученика'}
						type={'text'}
						name={'last_name'}
						onChange={handleChange}
						value={values.last_name || ''}
						placeholder={'Имя ученика'}
						id={'last_name'}
						indicator={getIndicator('last_name',values,validationStatus,serverErrors)}
						done={getDone('last_name',values,validationStatus,serverErrors,activeFields)}
						error={serverErrors.last_name}
						warn={!serverErrors.last_name && validationStatus.last_name === 2}
						errorMessage={serverErrors.last_name? configMap.last_name?.errorMessage: undefined}
						warnMessage={!serverErrors.last_name && validationStatus.last_name === 2 ? configMap.last_name?.warnMessage: undefined}
						required={configMap.last_name?.required}
					/>
					<LoginInput
						label={'Email'}
						type={'email'}
						name={'email'}
						onChange={handleChange}
						value={values.email || ''}
						placeholder={'Email ученика'}
						id={'email'}
						indicator={getIndicator('email',values,validationStatus,serverErrors)}
						done={getDone('email',values,validationStatus,serverErrors,activeFields)}
						error={serverErrors.email}
						warn={!serverErrors.email && validationStatus.email === 2}
						errorMessage={serverErrors.email? configMap.email?.errorMessage: undefined}
						warnMessage={!serverErrors.email && validationStatus.email === 2 ? configMap.email?.warnMessage : undefined}
						required={configMap.email?.required}
					/>
					<Button
						className={styles.button}
						width={344}
						height={55}
						text="Создать ученика"
						success={
							getDone('first_name',values,validationStatus,serverErrors,activeFields) &&
							getDone('last_name',values,validationStatus,serverErrors,activeFields) &&
							getDone('email',values,validationStatus,serverErrors,activeFields)
						}
					/>
				</form>
			) : (
				RegistrationMessage(responseData)
			)}
		</div>
	);
};
