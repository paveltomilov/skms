import React from 'react';
import styles from './style.module.scss';

interface CodeDisplayProps {
    code: string[];
    onClick: () => void;
    validationStatus: boolean | null;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({code, onClick, validationStatus}) => (
    <div
        className={styles.codeDisplay}
        onClick={onClick}
        role="textbox"
        tabIndex={0}
        aria-live="polite"
        aria-atomic="true"
        data-error={validationStatus}
        aria-label="Код подтверждения"
    >
        {code.map((ch, i) => (
            <span key={i}>{ch}</span>
        ))}
    </div>
);