import classNames from 'classnames';
import React, { FC, InputHTMLAttributes } from 'react';
import Error from '../icons/Error';
import LampError from '../icons/LampError';
import LampSucess from '../icons/LampSucess';
import Success from '../icons/Success';
import styles from './styles.module.scss';
import LampWarn from '../icons/LampWarn';
import LampDefault from '../icons/LampDefault';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'success' | 'error' | 'default' | 'disabled' | 'warn' | 'code';
  type?: 'minimum' | 'average' | 'maximum' | 'code';
  placeholder?: string;
  message?: React.ReactNode;
}

type LampStatus = 'success' | 'error' | 'warn' | 'default' | 'disabled';
type IconStatus = 'success' | 'error';

const lamp: Record<LampStatus, FC<React.SVGProps<SVGSVGElement>>> = {
  success: LampSucess,
  error: LampError,
  warn: LampWarn,
  default: LampDefault,
  disabled: LampDefault,
};

const icons: Record<IconStatus, FC<React.SVGProps<SVGSVGElement>>> = {
  success: Success,
  error: Error,
};

const Input: FC<InputProps> = ({
  status = 'default',
  type = 'average',
  placeholder,
  message = null,
  ...props
}) => {
  const Icon = status in icons ? icons[status as IconStatus] : null;
  const Lamp = status in lamp ? lamp[status as LampStatus] : null;

  const inputClass = classNames(
    styles.input,
    styles[type],
    {
      [styles.success]: status === 'success',
      [styles.error]: status === 'error',
      [styles.disabled]: status === 'disabled',
      [styles.warn]: status === 'warn',
      [styles.default]: status === 'default',
    }
  );

  // Определяем, какую иконку отображать на основе type

  const IconToRender = type === 'maximum' && Lamp ? Lamp : (Icon || null);

  const iconClass = type === 'maximum' ? styles.iconLamp : styles.icon;

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        className={inputClass}
        disabled={status === 'disabled'}
        placeholder={placeholder}
      />
      {IconToRender && type !== 'code' && <IconToRender className={iconClass} />}
      {message && <span className={styles.message}>{message}</span>}
    </div>
  );
};

export default Input;
