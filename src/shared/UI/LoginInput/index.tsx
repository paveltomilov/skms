import styles from './styles.module.scss';
import Image from 'next/image';
import { FC, useState } from 'react';
import {InputProps} from '@/shared/types/inputLogin';


export const LoginInput: FC<InputProps> = (props) => {
    const {
        label,
        placeholder,
        errorMessage,
        warnMessage,
        error = false,
        warn = false,
        type = 'text',
        name,
        id,
        indicator = 0,
        done = false,
        ...rest
    } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && isPasswordVisible ? 'text' : type;

    return (
        <div className={styles.form_item}>
            {label && (
                <label htmlFor={id} className={styles.form_item__label}>
                    {label}
                </label>
            )}
            <div className={styles.form_item__control}>
                <input
                    className={`${styles.form_item__input} ${isPasswordField ? styles.form_item__input_password : ''}`}
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    data-error={error}
                    data-warn={warn}
                    data-done={done}
                    id={id}
                    {...rest}
                />
                {isPasswordField && (
                    <button
                        type="button"
                        className={styles.form_item__passwordToggle}
                        aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
                        onClick={() => setIsPasswordVisible(prev => !prev)}
                    >
                        <Image src="/svg/eye.svg" alt="Показать или скрыть пароль" width={24} height={24} />
                    </button>
                )}
                <span data-indicator={indicator} className={styles.form_item__input__indicator}></span>
            </div>
            {(errorMessage || warnMessage) && (
                <span
                    data-error={error}
                    data-warn={warn}
                    className={styles.form_item__error}
                >
                {errorMessage || warnMessage}
            </span>
            )}
        </div>
    );
};

export default LoginInput;