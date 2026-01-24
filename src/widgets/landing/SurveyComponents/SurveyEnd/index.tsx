'use client';

import React, { useState } from 'react';
import TopCircle from '../../IconSvg/topCircle';
import BottomCircle from '../../IconSvg/bottomCircle';
import Button from '../../Button';
import styles from './styles.module.scss';

type SurveyEndProps = {
	onStart: () => void;
};

const SurveyEnd: React.FC<SurveyEndProps> = ({ onStart }) => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim() || isSubmitting || isSubmitted) return;

		setIsSubmitting(true);

		try {
			console.log('Email отправлен:', email);
			setIsSubmitted(true);

			setTimeout(() => {
				setIsSubmitted(false);
				setEmail('');
			}, 4000);
		} catch (error) {
			console.error('Ошибка отправки:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Определяем, должна ли кнопка быть неактивной
	const isButtonDisabled = !email.trim() || isSubmitting || isSubmitted;
	return (
		<div className={styles.survey__container}>
			<TopCircle className={styles.survey__svg1} />

			<h2 className={styles.survey__title}>
				Спасибо! Ваши ответы помогут улучшить цифровое обучение в
				промышленности
			</h2>

			<p className={styles.survey__description}>
				Если остались идеи или предложения по улучшению — оставьте
				e-mail, мы с Вами свяжемся
			</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					className={styles.form__email}
					type="email"
					placeholder="Введите E-mail"
					value={email}
					onChange={handleEmailChange}
					disabled={isSubmitting || isSubmitted}
					required
				/>
				<Button
					className={`
        ${styles.form__button}
        ${isButtonDisabled ? styles.button__disabled : ''}
        ${isSubmitted ? styles.button__submitted : ''}
    `}
					radius={4}
					width={256}
					height={48}
					text={isSubmitted ? 'ОТПРАВЛЕНО' : 'отправить'}
					type="submit"
					border="1px solid var(--lan-light-grayish-blue)"
				/>
			</form>

			<Button
				className={styles.survey__button}
				radius={4}
				width={776}
				height={48}
				text="протестировать тренажер"
				onClick={onStart}
			/>

			<BottomCircle className={styles.survey__svg2} />
		</div>
	);
};

export default SurveyEnd;
