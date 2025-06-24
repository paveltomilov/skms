'use client';

import Close from '@/shared/UI/icons/Close';
import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  headerWidthPx?: number;
  headerHeightPx?: number;
  buttonWidthPx?: number;
  buttonHeightPx?: number;
  iconWidthPx?: number;
  iconHeightPx?: number;
  className?: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  onClose,
  headerWidthPx,
  headerHeightPx,
  buttonWidthPx = 26,
  buttonHeightPx = 26,
  iconWidthPx = 20,
  iconHeightPx = 20,
  className,
}) => {
  const style = {
    '--header-width': headerWidthPx ? `${headerWidthPx}px` : undefined,
    '--header-height': headerHeightPx ? `${headerHeightPx}px` : undefined,
  } as React.CSSProperties;

  return (
    <div className={`${styles.header} ${className ?? ''}`} style={style}>
      <div className={styles.headerWrapper}>
        <p className={styles.headerText}>{title}</p>
        <Button
          id="ModalHeader"
          height={buttonHeightPx}
          width={buttonWidthPx}
          className={styles.buttonHeader}
          icon={<Close size={{ width: iconWidthPx, height: iconHeightPx }} />}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ModalHeader;
