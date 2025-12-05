'use client';
import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import axios from 'axios';
import Button from '../Button';
import styles from './styles.module.scss';

type FormValues = {
	name: string;
	company: string;
	email: string;
	phone: string;
	consent: boolean;
};

type FieldKey = keyof Omit<FormValues, 'consent'>;

interface Field {
	key: FieldKey;
	label: string;
	type: 'text' | 'email' | 'tel';
	placeholder: string;
	required: boolean;
}

const fields: ReadonlyArray<Field> = [
	{
		key: 'name',
		label: 'Ваше имя',
		type: 'text',
		placeholder: 'ФИО',
		required: true,
	},
	{
		key: 'email',
		label: 'Почта',
		type: 'email',
		placeholder: 'Введите Вашу почту',
		required: true,
	},
	{
		key: 'company',
		label: 'Компания',
		type: 'text',
		placeholder: 'Название компании',
		required: true,
	},
	{
		key: 'phone',
		label: 'Телефон',
		type: 'tel',
		placeholder: 'Ваш номер телефона',
		required: true,
	},
] as const;

const FormField = ({
	label,
	value,
	onChange,
	...rest
}: {
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentProps<'input'>) => (
	<div className={styles.form__field}>
		<label className={styles.label}>{label}</label>
		<input
			value={value}
			onChange={onChange}
			className={styles.input}
			{...rest}
		/>
	</div>
);

const initialForm: FormValues = {
	name: '',
	company: '',
	email: '',
	phone: '',
	consent: false,
};

function FormLanding() {
	const [form, setForm] = useState<FormValues>(initialForm);

	const handleInputChange = useCallback(
		(key: keyof Omit<FormValues, 'consent'>) => {
			return (e: ChangeEvent<HTMLInputElement>) => {
				let value = e.target.value;

				if (key === 'phone') {
					value = value.replace(/\D/g, '');
				}

				setForm(prev => ({
					...prev,
					[key]: value,
				}));
			};
		},
		[],
	);

	const handleConsentChange = () =>
		setForm(prev => ({ ...prev, consent: !prev.consent }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!form.name.trim() ||
			!form.email.trim() ||
			!form.company.trim() ||
			!form.phone.trim()
		) {
			alert('Заполните все поля');
			return;
		}

		if (!form.consent) {
			alert('Необходимо дать согласие на обработку персональных данных');
			return;
		}

		const payload = {
			full_name: form.name,
			company: form.company,
			email: form.email,
			phone: form.phone,
		};

		const apiUrl = 'http://127.0.0.1:8000/api/leads/';
		try {
			const response = await axios.post(apiUrl, payload, {
				headers: { 'Content-Type': 'application/json' },
			});

			setForm(initialForm);

			console.log('Response data:', response.data);
			alert('Форма успешно отправлена. Мы скоро с вами свяжемся');
		} catch (err) {
			if (axios.isAxiosError(err)) {
				console.error('Server error:', err.response?.data);
			} else {
				console.error('Unexpected error:', err);
			}

			setForm(initialForm);
			alert('Форма не отправлена');
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2 className={styles.form__title}>
				Хотите&nbsp;узнать&nbsp;больше? Мы&nbsp;с вами свяжемся!
			</h2>

			<div className={styles.form__container}>
				{fields.map(({ key, label, type, placeholder, required }) => (
					<FormField
						key={key}
						label={label}
						value={form[key]}
						onChange={handleInputChange(key)}
						type={type}
						placeholder={placeholder}
						required={required}
					/>
				))}
			</div>

			<div className={styles.form__sogl}>
				<div className={styles.form__button}>
					<Button
						text="отправить"
						onClick={handleSubmit}
						color="var(--lan-very-dark-mostly-black-blue)"
						bgColor="var(--lan-bright-cyan---lime-green)"
						width={0}
						height={40}
						radius={4}
						border="1px solid var(--lan-very-dark-gray)"
					/>
				</div>

				<div className={styles.form__check}>
					<input
						className={styles.input__checkbox}
						id="consent"
						type="checkbox"
						checked={form.consent}
						onChange={handleConsentChange}
						required
					/>
					<label htmlFor="consent" className={styles.checkbox__descr}>
						Я даю согласие на обработку&nbsp;
						<span className={styles.checkbox__descr_span}>
							персональных данных
						</span>
					</label>
				</div>
			</div>
		</form>
	);
}

export default FormLanding;
