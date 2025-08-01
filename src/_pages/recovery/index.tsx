'use client';

import styles from './style.module.scss';
import FormRecovery from '@/widgets/FormRecovery';
import PopupRecoveryPassword from '@/entities/PopupRecoveryPassword';
import {useAppSelector} from '@/shared/hooks/store';
import {useState} from 'react';
import PopupRegistrationDone from '@/entities/PopupRegistrationDone';


const Recovery = () => {
	const { recoveryPassword } = useAppSelector(state => state.modal);
	const [step, setStep] = useState<1 | 2 | 3>(1);

	return (
		<main className={styles.main_recovery}>
			<span className={styles.recovery_deco_left}></span>
			<span className={styles.recovery_deco_right}></span>
			<div className={styles.main_recovery_container}>
				<h1 className={styles.main_recovery_container__title}>
					Восстановление пароля
				</h1>
				<FormRecovery steps={step} setSteps={setStep}/>
				{step === 1 && (
					<p className={styles.main_recovery_container__text}>
						Код подтверждения будет направлен на&nbsp;указанный Вами e-mail.
					</p>
				)}
				{recoveryPassword && (
					<PopupRecoveryPassword setSteps={setStep} />
				)}
				{step === 3 && (
					<PopupRegistrationDone steps={step} />
				)}
			</div>
		</main>
	);
};

export default Recovery;
