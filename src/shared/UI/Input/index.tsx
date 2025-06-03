import React, { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';
import Success from '../icons/Success';
import Error from '../icons/Error';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'success' | 'error' | 'default' | 'disable' | 'attention' | 'hover';
  type?: 'minimum' | 'average' | 'maximum';
  placeholder?: string;
}

type MessageStatus = 'success' | 'error' | 'attention';
type IconStatus = 'success' | 'error';

const messages: Record<MessageStatus, React.ReactNode> = {
  success: (
    <>
      <div className={s.successText}>Регистрация прошла успешно</div>
      <div className={s.successText}>Пароль подтвержден</div>
    </>
  ),
  error: <div className={s.errorText}>E-mail адрес введен неверно</div>,
  attention: <div className={s.attentionText}>E-mail адрес введен неверно</div>,
};

const icons: Record<IconStatus, FC<React.SVGProps<SVGSVGElement>>> = {
  success: Success,
  error: Error,
};

const Input: FC<InputProps> = ({
  status = 'default',
  type = 'average',
  placeholder = 'Логин',
  ...props
}) => {
  // иконка для текущего статуса
  const Icon = (status in icons) ? icons[status as IconStatus] : undefined;

  const inputClass = classNames(
    s.input,
    s[type],
    {
      [s.inputSuccess]: status === 'success',
      [s.error]: status === 'error',
      [s.disable]: status === 'disable',
      [s.attention]: status === 'attention',
      [s.hover]: status === 'hover',
    }
  );

  // Проверка для текущего статуса
  const message = (status in messages) ? messages[status as MessageStatus] : null;

  return (
    <div className={s.inputContainer}>
      <div className={s.inputWrapper}>
        <input
          {...props}
          className={inputClass}
          disabled={status === 'disable'}
          placeholder={placeholder}
        />
        {Icon && <Icon className={s.icon} />}
      </div>
      {message}
    </div>
  );
};

export default Input;
