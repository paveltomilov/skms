import React, { FC } from 'react';
import styles from './styles.module.scss';

interface CardProps {
    title: string;
    description: string;
    gap?: number | string;
}

const Card: FC<CardProps> = ({ title, description, gap }) => {
    const resolvedGap = typeof gap === 'number' ? `${gap}px` : gap ?? '1rem';

    const titleLines = title.split('\n');
    const descriptionLines = description.split('\n');

    return (
        <div className={styles.card}>
            <h3 style={{ marginBottom: resolvedGap }} className={styles.title}>
                {titleLines.map((line, i) => (
                    <span className={styles.title__string} key={i}>
						{line}
					</span>
                ))}
            </h3>
            <p className={styles.description}>
                {descriptionLines.map((line, i) => (
                    <span className={styles.description__string} key={i}>
						{line}
					</span>
                ))}
            </p>
        </div>
    );
};

export default Card;