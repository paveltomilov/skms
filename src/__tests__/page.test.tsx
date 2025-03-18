import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import StoreProvider from '@/app/StoreProvider';

//test to check if the <Home /> component successfully renders a heading

describe('Home', () => {
	it('renders a heading', () => {
		render(
			<StoreProvider>
				<Home />
			</StoreProvider>,
		);
		const heading = screen.getByText(/птк/i);

		expect(heading).toBeInTheDocument();
	});
});
