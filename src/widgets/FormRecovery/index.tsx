'use client';

import styles from './style.module.scss';
import {FC, FormEventHandler} from 'react';
import LoginInput from '@/shared/UI/LoginInput';
import Button from '@/shared/UI/Button';
import {getDone, getIndicator} from '@/shared/utils/recoveryFunctions/recoveryFunctions';
import {useRecoveryForm} from '@/shared/hooks/useRecoveryForm';

type FormRecoveryProps = {
    steps?: number,
    setSteps?: (value: 1 | 2 | 3) => void,
    isOpen?: (value: boolean) => void,
}

const FormRecovery: FC<FormRecoveryProps> = ({steps, setSteps, isOpen}) => {
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
        // setServerErrors,
    } = useRecoveryForm({ steps });

    const handleOpenPopupRecoveryPassword = () => {
        if (isOpen && steps === 1) {
            isOpen(true);
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        resetServerErrors();

        if (!validateForm()) return;

        if (steps === 2) {
            if (setSteps) {
                setSteps(3);
            }
            // Реализация отправки данных на сервер и обработка ошибок
        }
    };

    return(
        <form
            onSubmit={handleSubmit}
            className={styles.recoveryForm}
        >
            {steps === 1 && (
                <LoginInput
                    label={'E-mail'}
                    type={'text'}
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
                        warnMessage={!serverErrors.password && validationStatus.password === 2 ? configMap.password?.warnMessage : undefined}
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
                        warnMessage={!serverErrors.confirm_password && validationStatus.confirm_password === 2 ? configMap.confirm_password?.warnMessage : undefined}
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