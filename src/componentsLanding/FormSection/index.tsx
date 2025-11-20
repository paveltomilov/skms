import styles from './styles.module.scss';
import FormLanding from '../FormLanding';
import Link from 'next/link';
import TelegramIcon from '../IconSvg/telegram';
import VkIcon from '../IconSvg/vk';
import YoutubeIcon from '../IconSvg/youtube';
import DzenIcon from '../IconSvg/dzen';

const socialLinks = [
    {
        href: 'https://web.telegram.org/k/',
        icon: TelegramIcon,
        text: 'Telegram',
        iconClass: styles.link__icon,
    },
    {
        href: 'https://vk.com',
        icon: VkIcon,
        text: 'Вконтакте',
        iconClass: styles.link__icon,
    },
    {
        href: 'https://www.youtube.com/',
        icon: YoutubeIcon,
        text: 'Youtube',
        iconClass: styles.link__icon,
    },
    {
        href: 'https://dzen.ru/',
        icon: DzenIcon,
        text: 'Дзен',
        iconClass: styles.link__icon__dzen,
    },
];

function FormSection() {
    return (
        <section className={styles.form__section}>
            <div className={`${styles.form__container} container`}>
                <FormLanding />
                <ul className={styles.social__list}>
                    {socialLinks.map(
                        ({ href, icon: IconComponent, text, iconClass }) => (
                            <li key={href} className={styles.social__item}>
                                <Link
                                    className={styles.link}
                                    target="_blank"
                                    href={href}
                                    rel="noopener noreferrer"
                                >
                                    <IconComponent className={iconClass} />
                                    {text}
                                </Link>
                            </li>
                        ),
                    )}
                </ul>
            </div>
        </section>
    );
}

export default FormSection;