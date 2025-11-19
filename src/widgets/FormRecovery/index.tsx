'use client';

import styles from './style.module.scss';
import { FC, FormEventHandler } from 'react';
import LoginInput from '@/shared/UI/LoginInput';
import Button from '@/shared/UI/Button';
import { getDone, getIndicator } from '@/shared/utils/recoveryFunctions/recoveryFunctions';
import { useRecoveryForm } from '@/shared/hooks/useRecoveryForm';
import { requestPasswordReset, setNewPassword as apiSetNewPassword } from '@/shared/lib/passwordRecovery';

type FormRecoveryProps = {
    steps?: number,
    setSteps?: (value: 1 | 2 | 3) => void,
    isOpen?: (value: boolean) => void,
}

const FormRecovery: FC<FormRecoveryProps> = ({ steps, setSteps, isOpen }) => {
    const {
        values,
        handleChange,
        validationStatus,
        serverErrors,
        isValid,
        activeFields,
        configMap,
        validateForm,
        resetServerErrors,
        setServerErrors,
        getWarnMessage,
    } = useRecoveryForm({ steps });

    const handleOpenPopupRecoveryPassword = async () => {
        if (steps !== 1) return;
        // отправка кода на e-mail перед открытием попапа
        const email = values.email?.trim();
        if (!email) return;

        const res = await requestPasswordReset(email);
        if (!res.success) {
            // подсветить ошибку под полем
            setServerErrors(prev => ({ ...prev, email: true }));
            return;
        }

        // сохраняем session_token из первого шага (request), e-mail и стартовое время таймера
        try {
            if (res.data.session_token) {
                localStorage.setItem('recovery:request_session_token', res.data.session_token);
            }
            localStorage.setItem('recovery:email', email);
            localStorage.setItem(`recovery:lastSentAt:${email}`, String(Date.now()));
        } catch { }

        if (isOpen) {
            isOpen(true);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        resetServerErrors();

        if (!validateForm()) return;

        if (steps === 2) {
            const password = values.password?.trim();
            const confirmPassword = values.confirm_password?.trim();
            try {
                const sessionToken = localStorage.getItem('recovery:session_token') || '';
                if (!password || !confirmPassword || !sessionToken) return;
                const res = await apiSetNewPassword(sessionToken, password, confirmPassword);
                if (res.success) {
                    // очистка временных данных восстановления пароля
                    try {
                        localStorage.removeItem('recovery:request_session_token');
                        localStorage.removeItem('recovery:session_token');
                        localStorage.removeItem('recovery:email');
                        const email = values.email?.trim();
                        if (email) {
                            localStorage.removeItem(`recovery:lastSentAt:${email}`);
                        }
                    } catch { }
                    if (setSteps) setSteps(3);
                } else {
                    setServerErrors(prev => ({ ...prev, password: true, confirm_password: true }));
                }
            } catch {
                setServerErrors(prev => ({ ...prev, password: true, confirm_password: true }));
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.recoveryForm}
        >
            {steps === 1 && (
                <LoginInput
                    label={'E-mail'}
                    type={'email'}
                    name={'email'}
                    placeholder={'E-mail'}
                    id={'email'}
                    onChange={handleChange}
                    indicator={getIndicator('email', values, validationStatus, serverErrors)}
                    done={getDone('email', values, validationStatus, serverErrors, activeFields)}
                    error={serverErrors.email}
                    warn={!serverErrors.email && validationStatus.email === 2}
                    errorMessage={serverErrors.email ? configMap.email?.errorMessage : undefined}
                    warnMessage={!serverErrors.email && validationStatus.email === 2 ? configMap.email?.warnMessage : undefined}
                    required
                />
            )}
            {steps === 2 && (
                <>
                    <LoginInput
                        label={'Пароль'}
                        type={'password'}
                        name={'password'}
                        placeholder={'Пароль'}
                        id={'password'}
                        onChange={handleChange}
                        indicator={getIndicator('password', values, validationStatus, serverErrors)}
                        done={getDone('password', values, validationStatus, serverErrors, activeFields)}
                        error={serverErrors.password}
                        warn={!serverErrors.password && validationStatus.password === 2}
                        errorMessage={serverErrors.password ? configMap.password?.errorMessage : undefined}
                        warnMessage={!serverErrors.password && validationStatus.password === 2 ? getWarnMessage('password') : undefined}
                        required
                    />
                    <LoginInput
                        label={'Пароль'}
                        type={'password'}
                        name={'confirm_password'}
                        placeholder={'Пароль'}
                        id={'confirm_password'}
                        onChange={handleChange}
                        indicator={getIndicator('confirm_password', values, validationStatus, serverErrors)}
                        done={getDone('confirm_password', values, validationStatus, serverErrors, activeFields)}
                        error={serverErrors.confirm_password}
                        warn={!serverErrors.confirm_password && validationStatus.confirm_password === 2}
                        errorMessage={serverErrors.confirm_password ? configMap.confirm_password?.errorMessage : undefined}
                        warnMessage={!serverErrors.confirm_password && validationStatus.confirm_password === 2 ? getWarnMessage('confirm_password') : undefined}
                        required
                    />
                </>
            )}
            <Button
                width={steps === 1 ? 240 : 278}
                height={55}
                text={steps === 1 ? 'Отправить' : 'Подтвердить'}
                ariaLabel={steps === 1 ? 'Отправить' : 'Подтвердить'}
                onClick={handleOpenPopupRecoveryPassword}
                disabled={!isValid}
                className={styles.recoveryForm__button}
            />
        </form>
    );
};

export default FormRecovery;