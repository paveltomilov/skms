import styles from './styles.module.scss';
import Scheme from '@/widgets/Scheme';
import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import Header from '@/widgets/Header/Header';
import Measurements from '@/widgets/Measurements';
import Arrow from '@/shared/UI/icons/Arrow';
import Gate from '@/shared/UI/Gate';
import { GATE_STATE_TYPE } from '@/shared/types/gate';
import Triangle from '@/shared/UI/icons/Triangle';
import Tilde from '@/shared/UI/icons/Tilde';
import Circle from '@/shared/UI/icons/Circle';
import ArrowButton from '@/shared/UI/icons/ArrowButton';
import Accept from '@/shared/UI/icons/Accept';
import Exclamation from '@/shared/UI/icons/Exclamation';
import Question from '@/shared/UI/icons/Question';
import Search from '@/shared/UI/icons/Search';
import Chevron from '@/shared/UI/icons/Chevron';
import Side from '@/shared/UI/icons/Side';
import Micro from '@/shared/UI/icons/Micro';
import EllipseClose from '@/shared/UI/icons/EllipseClose';
import Close from '@/shared/UI/icons/Close';
import CurvedArrow from '@/shared/UI/icons/CurvedArrow';
import Sharp from '@/shared/UI/icons/Sharp';
import Filter from '@/shared/UI/icons/Filter';
import ArrowPage from '@/shared/UI/icons/ArrowPage';
import Home from '@/shared/UI/icons/Home';
import Training from '@/shared/UI/icons/Training';
import Ptk from '@/shared/UI/icons/Ptk';
import Simulator from '@/shared/UI/icons/Simulator';
import SchemeIcon from '@/shared/UI/icons/SchemeIcon';
import Attention from '@/shared/UI/icons/Attention';
import Feedback from '@/shared/UI/icons/Feedback';
import Success from '@/shared/UI/icons/Success';
import Error from '@/shared/UI/icons/Error';
import Power from '@/shared/UI/icons/Power';
import Status from '@/shared/UI/icons/Status';
import Rectangle from '@/shared/UI/icons/Rectangle';
import Fire from '@/shared/UI/icons/Fire';
import Pump from '@/shared/UI/icons/Pump';
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
						<Accept />
						<Accept size="sm" color="disabled" />
						<Exclamation color="white_opacity" />
						<Question size="sm" />
						<Question color="white_opacity" />
						<Search />
						<Search size="sm" color="disabled" />
						<Chevron />
						<Chevron
							size="sm"
							color="disabled"
							transform="rotate180"
						/>
						<Side transform="rotate180" />
						<Side color="disabled" />
						<Micro color="disabled" size="lg" />
						<Micro />
						<EllipseClose />
						<EllipseClose color="disabled" size="lg" />
						<Close />
						<Close strokeWidth={1} color="red" size="lg" />
						<Close
							strokeWidth={1}
							color="red"
							size={{ width: 40, height: 40 }}
						/>
						<CurvedArrow />
						<CurvedArrow color="disabled" transform="mirror" />
						<Sharp />
						<Sharp color="disabled" />
						<Filter />
						<Filter color="disabled" />
						<ArrowPage />
						<ArrowPage transform="rotate180" color="disabled" />
						<Home />
						<Home color="disabled" />
						<Training />
						<Training color="disabled" />
						<Ptk />
						<Ptk color="disabled" />
						<Simulator />
						<Simulator color="disabled" />
						<SchemeIcon />
						<SchemeIcon color="disabled" />
						<Attention />
						<Attention color="disabled" size="lg" />
						<Feedback />
						<Feedback color="white" />
						<Success />
						<Error />
						<Power />
						<Power color="magenta" transform="rotate180" />
						<Power color="magenta" transform="rotateLeft90" />

						<Arrow color="magenta" transform="rotate90" />
						<Arrow color="blue" />
						<Arrow type="outlined" color="magenta" />
						<Arrow type="outlined" color="orange" />
						<Arrow type="chevron_color" color="magenta" />
						<Arrow type="chevron_color" color="red" />
						<Triangle />
						<Gate state={GATE_STATE_TYPE.open} shadow />
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
						<Circle color="red" transform="rotate90" />
						<Circle color="electric_green" transform="rotate180" />
						<ArrowButton color="white" disable />
						<ArrowButton disable transform="rotate90" />
						<ArrowButton color="white" transform="rotate180" />
						<Status />
						<Status type="shortWave" color="magenta" />
						<Status
							type="shortWave"
							transform="rotate90"
							color="blue"
						/>
						<Status type="crash" color="electric_green" />
						<Rectangle />
						<Rectangle color="white" outlined />
						<Rectangle color="electric_green" outlined />
						<Rectangle color="disabled" outlined />
						<Fire />
						<Pump />
						<Pump index={2} />
						<Pump index={5} transform="mirror" />
						<Pump index={9} transform="mirror" />
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Zra;
