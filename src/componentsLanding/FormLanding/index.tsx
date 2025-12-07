'use client';

import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import axios from 'axios';
import Popup from '../Popup';
import Button from '../Button';
import styles from './styles.module.scss';

/* ----------  Данные формы ---------------------------------------- */
const fields = [
	{
		key: 'name',
		label: 'Ваше имя',
		type: 'text',
		placeholder: 'ФИО',
	},
	{
		key: 'email',
		label: 'Почта',
		type: 'email',
		placeholder: 'Введите Вашу почту',
	},
	{
		key: 'company',
		label: 'Компания',
		type: 'text',
		placeholder: 'Название компании',
	},
	{
		key: 'phone',
		label: 'Телефон',
		type: 'tel',
		placeholder: 'Ваш номер телефона',
	},
];

const initialForm = {
	name: '',
	company: '',
	email: '',
	phone: '',
	consent: false,
};

interface FormFieldProps {
	label: string; // заголовок поля
	value: string | number; // текущее значение, может быть строкой или числом
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string; // тип input – text, email, tel … (необязательно)
	placeholder?: string; // плейсхолдер (необязательно)
	// любые остальные атрибуты HTML‑input могут передаваться через rest
}

// 2️⃣ Функциональный компонент с явно указанным типом пропсов
const FormField: React.FC<FormFieldProps> = ({
	label,
	value,
	onChange,
	...rest
}) => (
	<div className={styles.form__field}>
		<label className={styles.label}>{label}</label>
		<input
			value={value}
			onChange={onChange}
			className={styles.input}
			{...rest} // остальные атрибуты, например type="email"
		/>
	</div>
);

/* ----------  Основной компонент --------------------------------- */
function FormLanding() {
	const [form, setForm] = useState(initialForm);

	/* -----------  Модальное окно ----------------------------- */
	const [popup, setPopup] = useState({
		visible: false,
		message: '',
		variant: undefined, // success | error | info
	});

	const showPopup = (msg, v) => {
		setPopup({ visible: true, message: msg, variant: v });
	};

	/* -----------  Обработчики полей --------------------------- */
	const handleInputChange = useCallback(
		key => e => {
			let value = e.target.value;
			if (key === 'phone') value = value.replace(/\D/g, '');
			setForm(prev => ({ ...prev, [key]: value }));
		},
		[],
	);

	const handleConsentChange = () =>
		setForm(prev => ({ ...prev, consent: !prev.consent }));

	/* -----------  Отправка формы ------------------------------ */
	const handleSubmit = async e => {
		e.preventDefault();

		if (
			!form.name.trim() ||
			!form.email.trim() ||
			!form.company.trim() ||
			!form.phone.trim()
		) {
			showPopup('Заполните все поля формы');
			return;
		}

		if (!form.consent) {
			showPopup(
				'Необходимо дать согласие на обработку персональных данных',
			);
			return;
		}

		const payload = {
			full_name: form.name,
			company: form.company,
			email: form.email,
			phone: form.phone,
		};

		try {
			await axios.post('http://127.0.0.1:8000/api/leads/', payload, {
				headers: { 'Content-Type': 'application/json' },
			});

			setForm(initialForm);
			showPopup(
				'Заявка успешно отправлена. Мы скоро с вами свяжемся',
				'success',
			);
		} catch (err) {
			console.error(err);
			showPopup('Ошибка при отправке заявки', 'error');
			setForm(initialForm);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={styles.form}>
				<h2 className={styles.form__title}>
					Хотите&nbsp;узнать&nbsp;больше? Мы&nbsp;с вами свяжемся!
				</h2>

				<div className={styles.form__container}>
					{fields.map(({ key, label, type, placeholder }) => (
						<FormField
							key={key}
							label={label}
							value={form[key]}
							onChange={handleInputChange(key)}
							type={type}
							placeholder={placeholder}
						/>
					))}
				</div>

				<div className={styles.form__sogl}>
					<div className={styles.form__button}>
						<Button
							text="отправить"
							type="submit"
							color="var(--lan-very-dark-mostly-black-blue)"
							bgColor="var(--lan-bright-cyan---lime-green)"
							width={604}
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
						/>
						<label
							htmlFor="consent"
							className={styles.checkbox__descr}
						>
							Я даю согласие на обработку&nbsp;
							<span className={styles.checkbox__descr_span}>
								персональных данных
							</span>
						</label>
					</div>
				</div>
			</form>

			{popup.visible && (
				<Popup
					message={popup.message}
					variant={popup.variant}
					onClose={() =>
						setPopup({
							visible: false,
							message: '',
							variant: undefined,
						})
					}
					timeout={0} // можно менять по желанию
				/>
			)}
		</>
	);
}

export default FormLanding;
