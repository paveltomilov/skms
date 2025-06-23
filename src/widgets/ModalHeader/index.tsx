'use client';

import Close from '@/shared/UI/icons/Close';
import { FC } from 'react';
import styles from './styles.module.scss';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  headerWidthPx?: number;   // ширина хедера в px
  headerHeightPx?: number;  // высота хедера в px
  buttonSize?: number;  // размер кнопки в px
  sizeClose?: 'xs' | 'sm' | 'lg',
  className?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  onClose,
  headerWidthPx,
  headerHeightPx,
  buttonSize,
  sizeClose = 'xs',
  className,
}) => {
  const style = {
    '--header-width': headerWidthPx ? `${headerWidthPx}px` : undefined,
    '--header-height': headerHeightPx ? `${headerHeightPx}px` : undefined,
    '--buttonSize': buttonSize ? `${buttonSize}px` : undefined,
  } as React.CSSProperties;

  return (
	<div className={`${styles.header} ${className ?? ''}`} style={style}>
		<div className={styles.headerSize}>
			<p className={styles.headerText}>{title}</p>
			<button
				className={styles.buttonModal}
				aria-label="Close"
				onClick={onClose}
			>
				<Close size={`${sizeClose}`} />
			</button>
		</div>
	</div>
  );
};

export default ModalHeader;
