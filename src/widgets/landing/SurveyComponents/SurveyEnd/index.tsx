'use client';

import React, { useEffect, useRef, useState } from 'react';
import TopCircle from '../../IconSvg/topCircle';
import BottomCircle from '../../IconSvg/bottomCircle';
import Button from '../../Button';
import { SURVEY_ANSWERS_STORAGE_KEY } from '@/shared/configs/surveyStorageKey';
import { postSurveySubmission } from '@/shared/api/surveys/postSurveySubmission';
import styles from './styles.module.scss';

type SurveyEndProps = {
	onStart: () => void;
	/** Сброс сохранённых ответов и возврат к началу опроса */
	onRestartSurvey: () => void;
	/** После успешной отправки: показать сообщение и вызвать (например закрыть модалку). */
	onSurveyAccepted?: () => void;
};

interface ServerAnswer {
	question: number;
	answer_choices: number[];
	other_text?: string;
}

const SURVEY_CLOSE_DELAY_MS = 2200;

function SurveyEnd({
	onStart,
	onRestartSurvey,
	onSurveyAccepted,
}: SurveyEndProps) {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSavedLocally, setIsSavedLocally] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting || isSubmitted) return;
		setIsSubmitting(true);

		try {
			const raw = localStorage.getItem(SURVEY_ANSWERS_STORAGE_KEY);
			if (!raw) return;

			const { answers = [] } = JSON.parse(raw) as {
				answers?: ServerAnswer[];
			};

			await postSurveySubmission({
				lead_email: email.trim(),
				answers,
			});

			localStorage.removeItem(SURVEY_ANSWERS_STORAGE_KEY);
			setIsSubmitted(true);
			setIsSavedLocally(false);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				if (onSurveyAccepted) {
					onSurveyAccepted();
				} else {
					setEmail('');
					setIsSubmitted(false);
					setIsSavedLocally(false);
				}
				timeoutRef.current = null;
			}, onSurveyAccepted ? SURVEY_CLOSE_DELAY_MS : 3000);
		} catch (err) {
			setIsSubmitted(false);
			setIsSavedLocally(true);
			console.warn(
				'Сеть недоступна: ответы сохранены локально и будут отправлены позже.',
				err,
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.survey__container}>
			<TopCircle className={styles.survey__svg_top} />

			<h2 className={styles.survey__title}>
				<span className={styles.survey__title_span}>Спасибо!</span>
				Ваши ответы помогут улучшить цифровое обучение в промышленности
			</h2>

			<p className={styles.survey__description}>
				Если остались идеи или предложения по улучшению — оставьте
				e‑mail, мы с Вами свяжемся
			</p>

			{!isSubmitted && (
				<button
					type="button"
					className={styles.restart}
					onClick={onRestartSurvey}
				>
					Пройти опрос заново
				</button>
			)}

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					className={`${styles.form__email} ${isSubmitted ? styles.email__submitted : ''}`}
					type="email"
					placeholder="Введите E-mail"
					value={email}
					onChange={e => {
						setEmail(e.target.value);
						if (isSavedLocally) {
							setIsSavedLocally(false);
						}
					}}
					disabled={isSubmitted}
				/>

				<Button
					className={`
						${styles.form__button}
						${isSubmitted || isSavedLocally ? styles.button__submitted : ''}
					`}
					radius={4}
					width={256}
					height={48}
					text={
						isSubmitted
							? 'ОТПРАВЛЕНО'
							: isSavedLocally
								? 'СОХРАНЕНО ЛОКАЛЬНО'
								: 'отправить'
					}
					type="submit"
				/>
			</form>
			{isSubmitted && (
				<p className={styles.successNotice} role="status">
					{onSurveyAccepted
						? 'Ваши ответы приняты. Окно закроется автоматически.'
						: 'Ваши ответы приняты. Спасибо!'}
				</p>
			)}

			{isSavedLocally && (
				<p className={styles.survey__status}>
					Сеть недоступна: ответы сохранены локально. Повторите отправку
					чуть позже.
				</p>
			)}

			<Button
				className={styles.survey__button}
				radius={4}
				width={776}
				height={48}
				text="протестировать тренажер"
				onClick={onStart}
				type="button"
			/>

			<BottomCircle className={styles.survey__svg_bottom} />
		</div>
	);
}

export default SurveyEnd;
