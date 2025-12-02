'use client';
import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
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
		required: false,
	},
	{
		key: 'phone',
		label: 'Телефон',
		type: 'tel',
		placeholder: 'Ваш номер телефона',
		required: false,
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

function FormLanding() {
	const [form, setForm] = useState<FormValues>({
		name: '',
		company: '',
		email: '',
		phone: '',
		consent: false,
	});

	const handleInputChange = useCallback(
		(key: keyof Omit<FormValues, 'consent'>) => {
			return (e: ChangeEvent<HTMLInputElement>) => {
				setForm(prev => ({
					...prev,
					[key]: e.target.value,
				}));
			};
		},
		[],
	);

	const handleConsentChange = () =>
		setForm(prev => ({ ...prev, consent: !prev.consent }));

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form.name.trim() || !form.email.trim()) {
			alert('Заполните обязательные поля');
			return;
		}

		if (!form.consent) {
			alert('Необходимо дать согласие на обработку персональных данных');
			return;
		}
		alert('Форма не отправлена');
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
