import styles from './page.module.scss';
import Loader from '@c/Loader/Loader';
export default function Home() {
	return (
		<div className={styles.page}>
			<Loader />
		</div>
	);
}
