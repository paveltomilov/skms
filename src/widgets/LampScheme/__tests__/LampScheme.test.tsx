import React from 'react';
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
const mockDispatch = jest.fn();
jest.mock('@/shared/hooks/store', () => ({
	useAppSelector: (selector: typeof mockUseAppSelector) => mockUseAppSelector(selector),
	useAppDispatch: () => mockDispatch,
}));

jest.mock('@/shared/UI/Marker', () => ({
	__esModule: true,
	default: ({ text }: { text: string }) => <span data-marker={text} />,
}));

jest.mock('@/shared/UI/icons/Channel', () => ({
	__esModule: true,
	default: ({ className }: { className?: string }) => <div data-channel className={className} />,
}));

jest.mock('@/shared/UI/ScrewConnection', () => ({
	__esModule: true,
	default: ({ pointId }: { pointId: string }) => <div data-screw={pointId} />,
}));

jest.mock('@/shared/UI/icons/ProvodLine', () => ({
	__esModule: true,
	default: () => <div data-provod />,
}));

const mockFindElementByID = jest.fn();
jest.mock('@/shared/utils/findElementByID/scheme', () => ({
	findElementByID: (...args: unknown[]) => mockFindElementByID(...args),
}));

const CLOSED_POINT_ID = 'p.c.3.2.2';
const OPEN_POINT_ID = 'p.c.3.1.2';
const CLOSED_ELEMENT_ID = 'c.3.1.3.3';
const OPEN_ELEMENT_ID = 'c.3.2.3.3';

type PointValue = boolean | { state?: boolean } | undefined;

const renderLampScheme = (
	points: Record<string, PointValue>,
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

	return screen
		.getAllByTestId('lamp-indicator')
		.map(el => el.getAttribute('data-color'));
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

	it('включает только белую лампу при питании А19', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: false,
		});

		expect(colors).toEqual(['lamp_white_off', 'lamp_green_on']);
	});

	it('включает только зелёную лампу при питании А11', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: false,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_off']);
	});

	it('включает обе лампы при питании А11 и А19', () => {
		const colors = renderLampScheme({
			[CLOSED_POINT_ID]: true,
			[OPEN_POINT_ID]: true,
		});

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_on']);
	});

	it('гасит белую лампу при высоком сопротивлении её цепи', () => {
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

		expect(colors).toEqual(['lamp_white_on', 'lamp_green_off']);
	});
});
