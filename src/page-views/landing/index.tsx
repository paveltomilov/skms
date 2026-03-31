import About from '@/widgets/landing/About';
import Advantages from '@/widgets/landing/Advantages';
import FormSection from '@/widgets/landing/FormSection';
import ForWhom from '@/widgets/landing/ForWhom';
import Header from '@/widgets/landing/HeaderLanding';
import HeroLanding from '@/widgets/landing/HearoLanding';
import Product from '@/widgets/landing/Product';
import Survey from '@/widgets/landing/Survey';
import './styles/globals-landing.scss';
import { FC } from 'react';
import Footer from '@/widgets/landing/Footer';

const LandingPage: FC = () => {
	return (
		<div className={'landing'}>
			<Header />
			<main>
				<HeroLanding />
			</main>
			<About />
			<Product />
			<Advantages />
			<ForWhom />
			<Survey />
			<FormSection />
			<Footer />
		</div>
	);
};

export default LandingPage;
