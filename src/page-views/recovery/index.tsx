'use client';

import styles from './style.module.scss';
import FormRecovery from '@/widgets/FormRecovery';
import PopupRecoveryPassword from '@/entities/PopupRecoveryPassword';
import {useState} from 'react';
import PopupRegistrationDone from '@/entities/PopupRegistrationDone';


const Recovery = () => {
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const [step, setStep] = useState<1 | 2 | 3>(1);

	return (
		<main className={styles.main_recovery}>
			<span className={styles.recovery_deco_left}></span>
			<span className={styles.recovery_deco_right}></span>
			<div className={styles.main_recovery_container}>
				<h1 className={styles.main_recovery_container__title}>
					Восстановление пароля
				</h1>
				{step === 2 && (
					<span className={styles.main_recovery_container__description}>
						Введите новый пароль
					</span>
				)}
				<FormRecovery steps={step} setSteps={setStep} isOpen={setOpenPopup} />
				{step === 1 && (
					<p className={styles.main_recovery_container__text}>
						Код подтверждения будет направлен на&nbsp;указанный Вами e-mail.
					</p>
				)}
				{openPopup && (
					<PopupRecoveryPassword setSteps={setStep} isOpen={setOpenPopup} />
				)}
				{step === 3 && (
					<PopupRegistrationDone steps={step} />
				)}
			</div>
		</main>
	);
};

export default Recovery;
