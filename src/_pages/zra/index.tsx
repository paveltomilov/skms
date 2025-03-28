import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Measurements from '@/widgets/Measurements';
import Icon from '@/shared/UI/svg/Icon';
import Arrow from '@/shared/UI/svg/Arrow';
import Gate from '@/shared/UI/Gate';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import Triangle from '@/shared/UI/svg/Triangle';
import Tilde from '@/shared/UI/svg/Tilde';
import Circle from '@/shared/UI/svg/Circle';
import ArrowButton from '@/shared/UI/svg/ArrowButton';
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
							flexWrap: 'wrap',
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
						<Icon name="close" strokeWidth={2} />
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
						<Icon
							name="power"
							size={{ width: 10, height: 10 }}
							color="magenta"
						/>

						<Arrow
							name="filled"
							color="magenta"
							transform="rotate90"
						/>
						<Arrow name="filled" color="blue" />
						<Arrow name="outlined" color="magenta" />
						<Arrow name="outlined" color="orange" />
						<Arrow name="chevron_color" color="magenta" />
						<Arrow name="chevron_color" color="red" />
						<Triangle />
						<Gate state={GATE_STATE_TYPE.open} />
						<Gate state={GATE_STATE_TYPE.open} power />
						<Gate state={GATE_STATE_TYPE.close} />
						<Gate state={GATE_STATE_TYPE.intermediate} />
						<Gate state={GATE_STATE_TYPE.intermediate} disable />
						<Gate state={GATE_STATE_TYPE.noPower} />
						<Gate state={GATE_STATE_TYPE.toClose} />
						<Gate state={GATE_STATE_TYPE.toOpen} />
						<Gate state={GATE_STATE_TYPE.magenta} />
						<Gate state={GATE_STATE_TYPE.magenta} power />
						<Gate
							state={GATE_STATE_TYPE.open}
							position="vertical"
							disable
						/>
						<Gate
							state={GATE_STATE_TYPE.intermediate}
							position="vertical"
							power
						/>
						<Gate
							state={GATE_STATE_TYPE.magenta}
							position="vertical"
							power
						/>
						<Tilde />
						<Tilde disable />
						<Tilde color="white" size="md" />
						<Tilde color="white" size="md" disable />
						<Circle />
						<Circle color="magenta" transform="rotate45" />
						<Circle color="red" transform="rotate90" />
						<Circle color="electric_green" transform="rotate180" />
						<Circle color="blue" transform="rotateLeft45" />
						<ArrowButton color="white" disable />
						<ArrowButton color="white" transform="rotate45" />
						<ArrowButton transform="rotate90" />
						<ArrowButton color="white" transform="rotate180" />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Zra;
