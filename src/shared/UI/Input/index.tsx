import React, { FC, InputHTMLAttributes } from 'react';
import s from './styles.module.scss';
import Success from '../icons/Success';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'success' | 'error' | 'default' | 'disable' | 'attention' | 'hover';
  type?: 'minimum' | 'average' | 'maximum';
  subscribe?: boolean;
}

const Input: FC<InputProps> = ({
  status = 'default',
  type = 'average',
  subscribe,
  ...props
}) => {

  const inputClass = [
    s.input,
    status === 'success' ? s.inputSuccess : '',
    s[type],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={s.inputContainer}>
      <input
        {...props}
        className={inputClass}
        disabled={status === 'disable'}
        placeholder='Логин'
      />
      {status === 'success' && (
        <>
          <Success className={s.successIcon} />
          <div className={s.successText}>Регистрация прошла успешно</div>
        </>
      )}
    </div>
  );
};

export default Input;
