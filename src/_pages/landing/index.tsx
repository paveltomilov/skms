import About from '@/componentsLanding/About';
import Advantages from '@/componentsLanding/Advantages';
import FormSection from '@/componentsLanding/FormSection';
import ForWhom from '@/componentsLanding/ForWhom';
import Header from '@/componentsLanding/HeaderLanding';
import HeroLanding from '@/componentsLanding/HeroLanding';
import Product from '@/componentsLanding/Product';
import Reviews from '@/componentsLanding/Reviews';
import Survey from '@/componentsLanding/Survey';
import './styles/globals-landing.scss';
import { FC } from 'react';
import Footer from '@/componentsLanding/Footer';

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
			<Reviews />
			<Survey />
			<FormSection />
			<Footer />
		</div>
	);
};

export default LandingPage;
