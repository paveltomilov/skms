import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StoreProvider from '@/app/StoreProvider';
import Header from '@c/Header/Header';

describe('Home', () => {
	it('renders a header', () => {
		render(
			<StoreProvider>
				<Header />
			</StoreProvider>,
		);
		const heading = screen.getByText(/птк/i);

		expect(heading).toBeInTheDocument();
	});
});
