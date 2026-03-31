import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import TelegramIcon from '../../IconSvg/telegram';
import PlayIcon from '../../IconSvg/play';
import DzenIcon from '../../IconSvg/dzen';
import VkIcon from '../../IconSvg/vk';
import { LANDING_CONTACTS } from '@/shared/configs/landingContacts';

const socialLinks = [
    {
        href: LANDING_CONTACTS.telegramUrl,
        icon: <TelegramIcon size={16} className={styles.social__link__icon} />,
    },
    {
        href: 'https://rutube.ru/',
        icon: <PlayIcon size={16} className={styles.social__link__icon} />,
    },
    {
        href: 'https://dzen.ru/',
        icon: <DzenIcon size={16} className={styles.social__link__icon} />,
    },
    {
        href: 'https://vk.com',
        icon: <VkIcon size={16} className={styles.social__link__icon} />,
    },
];

const HeaderWindow: FC = () => (
    <div className={styles.window}>
        <div className={styles.window__header}>
            <div className={styles.mail}>
                <span className={styles.mail__span}>Почта</span>
                <Link
                    className={styles.mail__link}
                    href={`mailto:${LANDING_CONTACTS.email}`}
                >
                    {LANDING_CONTACTS.email}
                </Link>
            </div>
            <div className={styles.social}>
                {socialLinks.map(({ href, icon }) => (
                    <Link
                        key={href}
                        target="_blank"
                        href={href}
                        className={styles.social__link}
                    >
                        {icon}
                    </Link>
                ))}
            </div>
        </div>
    </div>
);

export default HeaderWindow;