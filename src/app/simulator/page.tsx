import styles from './page.module.scss';
import Image from 'next/image';

export default function Home() {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Тренажёр</h1>
			<div className={styles.wrapper}>
				<Image src="/images/scheme.png" alt="Схема" width={1053.33} height={693.6}/>
                <Image src="/images/functional-scheme.png" alt="Функциональность" width={166} height={504}/>
			</div>
		</main>
	);
}
