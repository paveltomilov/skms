import { render, screen } from '@testing-library/react';
import LampScheme from '../index';
import type { LampIndicatorColor } from '@/shared/types/icon';

jest.mock('@/shared/UI/LampIndicator', () => ({
	__esModule: true,
	default: ({ color }: { color: LampIndicatorColor }) => (
		<div data-testid="lamp-indicator" data-color={color} />
	),
}));

const mockUseAppSelector = jest.fn();
jest.mock('@/shared/hooks/store', () => ({
	useAppSelector: (selector: typeof mockUseAppSelector) => mockUseAppSelector(selector),
}));

const mockFindElementByID = jest.fn();
jest.mock('@/shared/utils/findElementByID/scheme', () => ({
	findElementByID: (...args: unknown[]) => mockFindElementByID(...args),
}));

const CLOSED_POINT_ID = 'p.c.3.2.2';
const OPEN_POINT_ID = 'p.c.3.1.2';
const CLOSED_ELEMENT_ID = 'c.3.1.3.3';
const OPEN_ELEMENT_ID = 'c.3.2.3.3';

const renderLampScheme = (
	points: Record<string, boolean | { state?: boolean } | undefined>,
	resistances: Record<string, number> = {},
) => {
	mockUseAppSelector.mockImplementation(selector =>
		selector({
			points,
			circuit: {},
		}),
	);

	mockFindElementByID.mockImplementation((id: string) => ({
		resistance: resistances[id] ?? 100,
	}));

	render(<LampScheme />);

	return screen.getAllByTestId('lamp-indicator').map(el => el.getAttribute('data-color'));
};

describe('LampScheme', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('выключает обе лампы без напряжения', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: false,
			[OPEN_POINT_ID]: false,
		});

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_off']);
	});

	it('поджигает только лампу "закрыто", когда питание на А19', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: false,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_off']);
	});

	it('поджигает только лампу "открыто", когда питание на А11', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: false,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_on']);
	});

	it('поджигает обе лампы при напряжении на А11 и А19', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_on']);
	});

	it('гасит лампу при высоком сопротивлении элемента', () => {
		const colors = renderLampScheme(
			{
				[CLOSED_POINT_ID]: true,
				[OPEN_POINT_ID]: true,
			},
			{
				[CLOSED_ELEMENT_ID]: 1_000_000_000,
				[OPEN_ELEMENT_ID]: 100,
			},
		);

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_on']);
	});
});
