'use client';

import Button from '@/shared/UI/Button';
import Input from '@/shared/UI/Input';
import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import Close from '@/shared/UI/icons/Close';

interface ModalProps  {
	header?: string
	second?: number
}

const ModalWrapper: FC<ModalProps & {onClose: () => void; isBlur?: boolean }> = ({
	header = 'ПКДВ-2',
	second = 59,
	onClose,
	isBlur = false,
  }) => {

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		 // Добавим/удалим класс блюра кроме header/footer/sidebar
		 const blurContainer = document.getElementById('blur-container');
		if (blurContainer) {
			if (isBlur) {
				blurContainer.classList.add(styles.blurBackground);
			} else {
				blurContainer.classList.remove(styles.blurBackground);
			}
		}


		return () => {
			document.body.style.overflow = '';
			if (blurContainer) {
				blurContainer.classList.remove(styles.blurBackground);
			}
		};
	}, [isBlur]);
	const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// Если кликнули именно по оверлею
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
	<div className={styles.overlay} onClick={onOverlayClick}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.headerText}>{header}</p>
          <button className={styles.button} aria-label='Close' onClick={onClose}>
            <Close size={'xs'} />
          </button>
        </div>
        <p className={styles.text}>
          Введите полученный код из 6 символов, которые мы отправили на указанный <br /> Вами e-mail
        </p>
        <div className={styles.input}>
          <Input status='default' type='code' />
        </div>
        <p className={styles.textTimer}>Отправить код повторно через {second} сек.</p>
        <Button id={'1'} height={55} width={270} disabled text='Войти' className={styles.buttonChandge} />
    </div>
	</div>
  );
};


export default ModalWrapper;
