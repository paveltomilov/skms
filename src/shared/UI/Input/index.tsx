import classNames from 'classnames';
import React, { FC, InputHTMLAttributes } from 'react';
import Error from '../icons/Error';
import Success from '../icons/Success';
import styles from './styles.module.scss';
import Lamp from '../icons/Lamp';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'success' | 'error' | 'default' | 'disabled' | 'warn';
  type?: 'minimum' | 'average' | 'maximum' | 'code';
  placeholder?: string;
  message?: React.ReactNode;
}

type LampStatus = 'success' | 'error' | 'warn' | 'default' | 'disabled';
type IconStatus = 'success' | 'error';

const lamp: Record<LampStatus, FC<React.SVGProps<SVGSVGElement>>> = {
  success: (props) => <Lamp variant="success" {...props} />,
  error: (props) => <Lamp variant="error" {...props} />,
  warn: (props) => <Lamp variant="warn" {...props} />,
  default: (props) => <Lamp variant="default" {...props} />,
  disabled: (props) => <Lamp variant="default" {...props} />
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

  const messageClass = classNames(styles.messageText, {
    [styles['messageText--success']]: status === 'success',
    [styles['messageText--error']]: status === 'error',
    [styles['messageText--warn']]: status === 'warn',
    }
  );

  // Определяем, какую иконку отображать на основе type

  const IconToRender = type === 'maximum' && Lamp ? Lamp : (Icon || null);

  const iconClass = type === 'maximum' ? styles.iconLamp : styles.icon;

  return (
    <div className={styles.inputWrapper}>
      {type !== 'code' && (
        <label className={styles.login}>
          Логин
        </label>
      )}
      <input
        {...props}
        className={inputClass}
        disabled={status === 'disabled'}
        placeholder={placeholder}
      />
      {IconToRender && type !== 'code' && <IconToRender className={iconClass} />}
      {message && (
          <span
            className={messageClass}
          >
            {message}
          </span>
      )}
    </div>
  );
};

export default Input;
