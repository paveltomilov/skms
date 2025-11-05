import { FC, FormEventHandler, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import LoginInput from '@/shared/UI/LoginInput';
import { generateStringArray } from '@/shared/utils/getRandomPassword/getRandomPassword';

import { useLoginForm } from '@/shared/hooks/useLoginForm';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { Role } from '@/shared/types/users';
import { postRegistration } from '@/shared/lib/registration';

const PASSWORD_ERROR = {
	email: false,
	password: true,
	first_name: false,
	last_name: false,
};

type LoginFormData = {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	role?: Role;
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
	} = useLoginForm({ toggleRegisterMode: true });

	const [responseData, setResponseData] = useState<LoginFormData | null>(
		null,
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();
		resetServerErrors();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email') as string;
		const fullName = formData.get('first_name') as string;
		const fullNameArr = fullName.split(' ');
		const first_name = fullNameArr[0];
		const last_name = `${fullNameArr[1] ?? ''} ${fullNameArr[2] ?? ''}`;
		const password = generateStringArray(12);

		handleRegistration({
			email,
			first_name,
			last_name,
			password,
			role: 'student',
		});
	};

	const handleRegistration = async (data: LoginFormData) => {
		console.log(data);
		try {
			const response = await postRegistration(data);

			if (response.success) {
				setResponseData(data);
			}

			if (response.errors) {
				setServerErrors({
					email: !!response.errors.email,
					password: !!response.errors.password,
					first_name:
						!!response.errors.first_name ||
						!!response.errors.first_name,
					last_name: !!response.errors.first_name,
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
						label={'ФИО ученика'}
						type={'text'}
						name={'first_name'}
						onChange={handleChange}
						value={values.first_name || ''}
						placeholder={'ФИО'}
						id={'first_name'}
						indicator={getIndicator(
							'first_name',
							values,
							validationStatus,
							serverErrors,
						)}
						done={getDone(
							'first_name',
							values,
							validationStatus,
							serverErrors,
							activeFields,
						)}
						error={serverErrors.first_name}
						warn={
							!serverErrors.first_name &&
							validationStatus.first_name === 2
						}
						errorMessage={
							(serverErrors.first_name
								? configMap.first_name?.errorMessage
								: undefined) || (serverErrors.last_name
								? configMap.last_name?.errorMessage
								: undefined)
						}
						warnMessage={
							(!serverErrors.first_name &&
							validationStatus.first_name === 2
								? configMap.first_name?.warnMessage
								: undefined) || (!serverErrors.last_name &&
							validationStatus.last_name === 2
								? configMap.last_name?.warnMessage
								: undefined)
						}
						required={configMap.first_name?.required}
					/>
					<LoginInput
						label={'Email'}
						type={'email'}
						name={'email'}
						onChange={handleChange}
						value={values.email || ''}
						placeholder={'Email'}
						id={'email'}
						indicator={getIndicator(
							'email',
							values,
							validationStatus,
							serverErrors,
						)}
						done={getDone(
							'email',
							values,
							validationStatus,
							serverErrors,
							activeFields,
						)}
						error={serverErrors.email}
						warn={
							!serverErrors.email && validationStatus.email === 2
						}
						errorMessage={
							serverErrors.email
								? configMap.email?.errorMessage
								: undefined
						}
						warnMessage={
							!serverErrors.email && validationStatus.email === 2
								? configMap.email?.warnMessage
								: undefined
						}
						required={configMap.email?.required}
					/>
					<Button
						className={styles.button}
						width={344}
						height={55}
						text="Создать ученика"
					/>
				</form>
			) : (
				<>
					<p className={styles.responseMessage__title}>
						Пользователь успешно зарегестрирован
					</p>
					<ul className={styles.responseMessage__list}>
						<li className={styles.responseData__item}>
							Email ученика:{responseData.email}
						</li>
						<li className={styles.responseData__item}>
							ФИО:
							{responseData.first_name} {responseData.last_name}
						</li>
						<li className={styles.responseData__item}>
							Пароль: <b>{responseData.password}</b>
						</li>
					</ul>
					<p className={styles.responseMessage__title}>
						Не забудьте сохранить пароль
					</p>
				</>
			)}
		</div>
	);
};
