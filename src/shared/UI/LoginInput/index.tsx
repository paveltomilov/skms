import styles from './styles.module.scss';
import {FC} from 'react';
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

    return (
        <div className={styles.form_item}>
            {label && (
                <label htmlFor={id} className={styles.form_item__label}>
                    {label}
                </label>
            )}
            <input
                className={styles.form_item__input}
                type={type}
                name={name}
                placeholder={placeholder}
                data-error={error}
                data-warn={warn}
                data-done={done}
                id={id}
                {...rest}
            />
            {(errorMessage || warnMessage) && (
                <span
                    data-error={error}
                    data-warn={warn}
                    className={styles.form_item__error}
                >
                {errorMessage || warnMessage}
            </span>
            )}
            <span data-indicator={indicator} className={styles.form_item__input__indicator}></span>
        </div>
    );
};

export default LoginInput;