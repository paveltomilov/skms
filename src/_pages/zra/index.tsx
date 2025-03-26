import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Measurements from '@/widgets/Measurements';
import Icon from '@/shared/UI/svg/Icon';
const Zra = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Sidebar />
				<section className={styles.page}>
					<h1 className={styles.page__title}>Тренажёр</h1>
					<div className={styles.page__wrapper}>
						<Scheme />
						<Measurements />
					</div>
					{/* пример иконок */}
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							gap: 5,
						}}
					>
						<Icon name="accept" size="xs" />
						<Icon name="accept" size="xs" color="disabled" />
						<Icon
							name="exclamation"
							size={{ width: 8, height: 13 }}
						/>
						<Icon
							name="question"
							size={{ width: 10, height: 14 }}
						/>
						<Icon name="search" size="xs" transform="mirror" />
						<Icon name="chevron" size="xs" />
						<Icon name="chevron" size="xs" color="disabled" />
						<Icon name="side" size="lg" />
						<Icon name="micro" size="md" />
						<Icon name="ellipseClose" />
						<Icon name="close" />
						<Icon
							name="curvedArrow"
							size={{ width: 30, height: 20 }}
						/>
						<Icon
							name="curvedArrow"
							size={{ width: 30, height: 20 }}
							color="disabled"
							transform="mirror"
						/>
						<Icon name="sharp" />
						<Icon name="sharp" color="disabled" />
						<Icon name="filter" />
						<Icon name="arrow" />
						<Icon
							name="arrow"
							transform="mirror"
							color="disabled"
						/>
						<Icon name="home" />
						<Icon name="training" />
						<Icon name="ptk" />
						<Icon name="simulator" />
						<Icon name="scheme" />
						<Icon
							name="chevron"
							size="sm"
							transform="rotateLeft90"
						/>
						<Icon name="chevron" size="sm" transform="rotate90" />
						<Icon name="attention" size="lg" />
						<Icon name="attention" size="lg" color="disabled" />
						<Icon
							name="feedback"
							size={{ width: 34, height: 28 }}
						/>
						<Icon
							name="feedback"
							color="white"
							size={{ width: 34, height: 28 }}
						/>
						<Icon name="success" size="lg" />
						<Icon name="error" size="lg" />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Zra;
