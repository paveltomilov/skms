import React, { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Success from '../icons/Success';
import Error from '../icons/Error';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'success' | 'error' | 'default' | 'disabled' | 'warn' | 'code';
  type?: 'minimum' | 'average' | 'maximum' | 'code';
  placeholder?: string;
  message?: React.ReactNode; // пропс для сообщения
}

type IconStatus = 'success' | 'error';

const icons: Record<IconStatus, FC<React.SVGProps<SVGSVGElement>>> = {
  success: Success,
  error: Error,
};

const Input: FC<InputProps> = ({
  status = 'default',
  type = 'average',
  placeholder,
  message = null, // изначально в null
  ...props
}) => {
  // Определяем иконку по статусу
  const Icon = (status in icons) ? icons[status as IconStatus] : null;
  const showIcon = type === 'maximum' && Icon;

  const inputClass = classNames(
    styles.input,
    styles[type],
    {
      [styles.success]: status === 'success',
      [styles.error]: status === 'error',
      [styles.disabled]: status === 'disabled',
      [styles.warn]: status === 'warn',
      [styles.default]: status === 'default'
    }
  );

  return (
      <div className={styles.inputWrapper}>
        <input
          {...props}
          className={inputClass}
          disabled={status === 'disabled'}
          placeholder={placeholder}
        />
        {showIcon && <Icon className={styles.icon} />}
        {message && (
          <span className={styles.message}>{message}</span>
        )}
      </div>
  );
};

export default Input;

