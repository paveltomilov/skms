import React from 'react';
import { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import TelegramIcon from '../../IconSvg/telegram';
import YoutubeIcon from '../../IconSvg/youtube';
import DzenIcon from '../../IconSvg/dzen';
import VkIcon from '../../IconSvg/vk';
import WhatsappIcon from '../../IconSvg/whatsapp';

const socialLinks = [
    {
        href: 'https://www.whatsapp.com/',
        icon: <WhatsappIcon size={16} className={styles.social__link__icon} />,
    },
    {
        href: 'https://web.telegram.org/',
        icon: <TelegramIcon size={16} className={styles.social__link__icon} />,
    },
    {
        href: 'https://www.youtube.com/',
        icon: <YoutubeIcon size={16} className={styles.social__link__icon} />,
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
                    href="mailto:Skillmanagment@mail.ru"
                >
                    Skillmanagment@mail.ru
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